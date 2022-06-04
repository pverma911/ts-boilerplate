import { body } from "express-validator";
import { Request } from "express";
import { NotFoundError } from "../errors/api-errors/NotFoundError";

export const createUserValidator = () => {
  return [
    body("name").not().isEmpty().trim().withMessage("name is required"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .custom((value, { req: Request }) => {
        if (value === "test@mail.com") {
          throw new Error("email already in use");
        }
        return true;
      }),
  ];
};
