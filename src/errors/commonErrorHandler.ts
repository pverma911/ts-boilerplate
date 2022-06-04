import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("Error from common mware ==>", err);
  res.status(err.statusCode).json({ msg: err.message, success: false });
};

export { errorHandler };
