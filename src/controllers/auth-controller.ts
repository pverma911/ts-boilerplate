import { Request, Response, NextFunction } from "express";
import { User } from "../models/auth";
import { NotFoundError } from "../errors/api-errors/NotFoundError";
import { validationResult } from "express-validator";
import { createToken } from "../utils/createToken";
import { NotAuthorizedError } from "../errors/api-errors/NotAuthorizedError";
import { createRefreshToken } from "../utils/createRefreshToken";
import { AccessForbiddenError } from "../errors/api-errors/AccessForbiddenError";
import jwt, { VerifyErrors } from "jsonwebtoken";

let refreshTokens: string[] = []; // keep track in DB

export const createUser = async (req: Request, res: Response) => {
  const { name, age, email, password } = req.body;
  // You can throw errors directly and it will be automatically passed to error handling middleware

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // handle using classes extending Error
    return res.status(400).json({ errors: errors.array() });
  }

  let user = new User({
    name,
    age,
    email,
    password,
  });

  await user.save();

  res.status(201).json({ msg: "User created", success: true });
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError(`User with email ${email} does not exist`);
  }

  const token = createToken({
    name: user.name,
    age: user.age,
    email: user.email,
    password: user.password,
    role: user.role,
  });

  const refreshToken = createRefreshToken({
    name: user.name,
    age: user.age,
    email: user.email,
    password: user.password,
    role: user.role,
  });

  // save Refresh Token to DB
  refreshTokens.push(refreshToken);

  return res
    .status(200)
    .json({ msg: "Login successful", token, refreshToken, success: true });
};

export const verifyUser = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ msg: "User verified", user: req.user, success: true });
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new NotAuthorizedError("You are not authorized");
  }
  if (!refreshTokens.includes(refreshToken)) {
    // DB operation
    throw new AccessForbiddenError("Invalid Refresh token supplied");
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_KEY!,
    (err: VerifyErrors | null, user: any) => {
      if (err) {
        throw new AccessForbiddenError("Access Forbidden");
      }
      // remove the exisiting refreshToken from the refreshTokens array

      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const newAccessToken = createToken({
        email: user.email,
        role: user.role,
      });

      const newRefreshToken = createRefreshToken({
        email: user.email,
        role: user.role,
      });

      // push new refresh token to DB
      refreshTokens.push(newRefreshToken);

      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        success: true,
      });
    }
  );
};

export const logOut = async (req: Request, res: Response) => {
  // basically remove the refreshToken
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new NotAuthorizedError("You are not authorized");
  }
  if (!refreshTokens.includes(refreshToken)) {
    // DB operation
    throw new AccessForbiddenError("Invalid Refresh token supplied");
  }
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

  return res.status(200).json({ msg: "Logged out", success: true });
};
