import { NextFunction, Request, Response } from "express";
import ApiError from "../common/err.common";

export function methodNotAllowed(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
export function resourceNotFound(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return next(new ApiError(404, `API Resource ${req.url} not found`));
}

export default {
  methodNotAllowed,
  resourceNotFound,
};
