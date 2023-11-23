import { NextFunction, Request, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "../../common/err.common";
import Joi from "joi";
import logging from "../../configs/logging";
import { UserAccount } from "../../models/auth/account/user.account.model";

// Define the schema for the JWT payload
const jwtPayloadSchema = Joi.object({
  sessionId: Joi.string().required(),
  role: Joi.string().valid("user", "admin").required(),
  email: Joi.string().email().optional(),
}).options({ stripUnknown: true });

/**
 * Middleware function to check if a user is authenticated.
 * @param {Request} req - The request object that contains the user.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call after the user is checked.
 * @throws {ForbiddenError} If the user is not authenticated.
 */
export default async function requireUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    throw new ForbiddenError("Invalid session", req.originalUrl);
  }

  return next();
}

export async function requireUserData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    throw new ForbiddenError("Invalid session", req.originalUrl);
  }
  // @ts-ignore
  const email = req.user.email;
  const existingUser = await UserAccount.findOne({ email });

  // @ts-ignore
  req.body.userId = existingUser?.id;

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
    throw new ForbiddenError("Invalid session", req.originalUrl);
  }

  // Validate the JWT payload
  const { error, value } = jwtPayloadSchema.validate(req.user);

  logging.debug("requireAdmin", "Validate the JWT payload", { error, value });
  if ((value.role as string).localeCompare("admin") !== 0) {
    throw new ForbiddenError("User is not an admin", req.originalUrl);
  }

  return next();
}
