import { NextFunction, Request, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "../../common/err.common";
import Joi from "joi";

// Define the schema for the JWT payload
const jwtPayloadSchema = Joi.object({
  sessionId: Joi.string().required(),
  role: Joi.string().valid("user", "admin").required(),
  email: Joi.string().email().optional(),
});

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
  if (!req.user) {
    throw new ForbiddenError("Invalid session", req.url);
  }

  return next();
}

/**
 * Middleware function to check if a user is an admin.
 * @param {Request} req - The request object that contains the user.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call after the user is checked.
 * @throws {ForbiddenError} If the user is not an admin.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    throw new ForbiddenError("Invalid session", req.url);
  }

  // Validate the JWT payload
  const { error, value } = jwtPayloadSchema.validate(req.user);

  if (error || !value.role || value.role !== "admin") {
    throw new ForbiddenError("User is not an admin", req.url);
  }

  return next();
}
