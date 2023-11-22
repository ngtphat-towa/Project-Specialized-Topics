import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../../common/err.common";

/**
 * Middleware function to check if a user is authenticated.
 * @param {Request} req - The request object that contains the user.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call after the user is checked.
 * @throws {ForbiddenError} If the user is not authenticated.
 */
export default function requireUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // @ts-ignore
  if (!req.user) {
    throw new ForbiddenError("Invalid session", req.url);
  }

  return next();
}
