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
routes.post(
  // For creating new access token
  "/createNewAccessToken",
  userController.refreshToken
);
routes.post("/logOut", verifyToken, userController.logOut);

export { routes as userRoutes };
