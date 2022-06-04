import { Request, Response, NextFunction } from "express";
import { User } from "../models/auth";
import { NotFoundError } from "../errors/api-errors/NotFoundError";
import { validationResult } from "express-validator";
import { createToken } from "../utils/createToken";
import { decodedUserToken } from "../interfaces/interfaces";

declare global {
  namespace Express {
    interface Request {
      user?: decodedUserToken;
    }
  }
}

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

  let savedUser = await user.save();

  const token = createToken({
    name,
    age,
    email,
    password,
    role: savedUser.role,
  });

  res.status(201).json({ msg: "User created", token, success: true });
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

  return res
    .status(200)
    .json({ msg: "Login successful", token, success: true });
};

export const verifyUser = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ msg: "User verified", user: req.user, success: true });
};
