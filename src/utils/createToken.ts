import { UserModel, TokenUser } from "../interfaces/interfaces";
import { NotFoundError } from "../errors/api-errors/NotFoundError";
import jwt from "jsonwebtoken";

export const createToken = (user: UserModel | TokenUser): string => {
  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_TOKEN_KEY as string,
    { expiresIn: "5m" }
  );
  return token;
};
