import express from "express";
import * as userController from "../controllers/auth-controller";
import { verifyToken } from "../utils/verifyToken";
import * as validate from "../validation/validators";
const routes = express.Router();

routes.post(
  "/createUser",
  validate.createUserValidator(),
  userController.createUser
);

routes.post("/loginUser", userController.userLogin);
routes.post("/verifyUser", verifyToken, userController.verifyUser);

export { routes as userRoutes };
