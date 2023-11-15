import { NextFunction, Request, Response } from "express";
import ApiError from "../common/err.common";
import logging from "../configs/logging";

function methodNotAllowed(req: Request, res: Response, next: NextFunction) {
  if (req.route) {
    const httpMethods = Object.keys(req.route.methods)
      .filter((method) => method !== "_all")
      .map((method) => method.toUpperCase());
    return next(
      new ApiError(405, "Method Not Allowed", {
        Allow: httpMethods.join(", "),
      })
    );
  }
  return next();
}
function resourceNotFound(req: Request, res: Response, next: NextFunction) {
  return next(new ApiError(404, `API Resource ${req.url} not found`));
}
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
      .status(error.statusCode || 500)
      .set(error.headers || {})
      .json({
        message: error.message,
        type: error.name,
      });
  }
  return res.status(500).json({
    type: error.name,
    message: error.message || "Internal Server Error",
  });
}
export default {
  methodNotAllowed,
  resourceNotFound,
  handleError,
};
