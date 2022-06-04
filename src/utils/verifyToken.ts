import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AccessForbiddenError } from "../errors/api-errors/AccessForbiddenError";
import { NotAuthorizedError } from "../errors/api-errors/NotAuthorizedError";
import { decodedUserToken } from "../interfaces/interfaces";

declare global {
  namespace Express {
    interface Request {
      user?: decodedUserToken;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenHeader: string = req.headers["authorization"]!;

  if (!tokenHeader) {
    throw new NotAuthorizedError("Token header is missing");
  }
  const token = tokenHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_TOKEN_KEY!, (err, user) => {
    if (err) {
      throw new AccessForbiddenError("Access Forbidden");
    }
    const { email, role } = user as decodedUserToken;
    req.user = { email, role };
    next();
  });
};
