import { NextFunction, Request, Response } from "express";
import ApiError from "../../common/err.common";
import logging from "../../configs/logging";

function handleError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(error);
  }
  logging.error("handleError", error.name, error);
  if (error instanceof ApiError) {
    return res
      .status(error.status || 500)
      .set(error.headers || {})
      .json(error);
  }
  return res.status(500).json({
    type: error.name,
    message: error.message.replace(/\\"/g, '"') || "Internal Server Error",
  });
}
export default {
  handleError,
};
