import express, { json, urlencoded } from "express";
import "express-async-errors";
import morgan from "morgan";
import { errorHandler } from "./errors/commonErrorHandler";
import { decodedUserToken } from "./interfaces/interfaces";
import { userRoutes } from "./routes/auth-route";

const app = express();

declare global {
  namespace Express {
    interface Request {
      user?: decodedUserToken;
    }
  }
}

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/user", userRoutes);

app.use(errorHandler);

export { app };
