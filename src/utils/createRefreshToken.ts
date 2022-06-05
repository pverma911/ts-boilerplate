import { UserModel, TokenUser } from "../interfaces/interfaces";
import jwt from "jsonwebtoken";

export const createRefreshToken = (user: UserModel | TokenUser): string => {
  const token = jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_REFRESH_TOKEN_KEY as string
  );
  return token;
};
