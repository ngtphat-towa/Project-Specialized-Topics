import { NextFunction, Request, Response } from "express";
import {
  MethodNotAllowedError,
  ApiResourceNotFoundError,
} from "../common/err.common";

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
      new MethodNotAllowedError("", req.path, {
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
  return next(new ApiResourceNotFoundError(req.path));
}

export default {
  methodNotAllowed,
  resourceNotFound,
};
