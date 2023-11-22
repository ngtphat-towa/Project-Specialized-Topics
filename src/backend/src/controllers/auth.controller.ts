import { NextFunction, Request, Response } from "express";
import { signJWT } from "../handlers/jwt.handler";
import {
  ILoginUserAccount,
  loginUserSchema,
} from "../models/auth/account/user.account.dto";
import { validateBody } from "../models/commons/validate.dto";
import { UserAccount } from "../models/auth/account/user.account.model";
import { UnauthorizedError } from "../common/err.common";
import { Session } from "../models/auth/session/session.model";

/**
 * This module exports handlers for creating, getting, and deleting sessions.
 */
export default {
  createSessionHandler,
  getSessionHandler,
  deleteSessionHandler,
};

/**
 * Handler for creating a new session.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} The response object with the new session.
 * @throws {Error} If an error occurs during the process.
 */
async function createSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const loginCredential: ILoginUserAccount = validateBody(
      req,
      loginUserSchema
    );
    const user = await validateUser(
      loginCredential.email,
      loginCredential.password,
      req.url
    );

    const session = await createNewSession(
      loginCredential.email,
      user.username
    );

    const { accessToken, refreshToken } = createTokens(
      session.id,
      user.email,
      user.username
    );

    // set access token in cookie
    setCookies(res, accessToken, refreshToken, true);

    // send user back
    return res.send(session);
  } catch (error) {
    next(error);
  }
}

/**
 * Handler for getting a session.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} The response object with the session.
 * @throws {Error} If an error occurs during the process.
 */
async function getSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // @ts-ignore
    const session = await Session.findById(req.user?.sessionId);
    return res.send(session);
  } catch (error) {
    next(error);
  }
}

/**
 * Handler for deleting a session.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} The response object with the deleted session.
 * @throws {Error} If an error occurs during the process.
 */
async function deleteSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    setCookies(res);

    // TODO: validate the session id
    // @ts-ignore
    const session = await Session.findById(req.user.sessionId);
    if (session) {
      await session.invalidateSession();
    }
    return res.send(session);
  } catch (error) {
    next(error);
  }
}

/**
 * Sets cookies for the response.
 * @param {Response} res - The response object.
 * @param {string} accessToken - The access token.
 * @param {string} refreshToken - The refresh token.
 * @param {boolean} httpOnly - Whether the cookie should be HTTP only.
 */
function setCookies(
  res: Response,
  accessToken: string = "",
  refreshToken: string = "",
  httpOnly: boolean = false
) {
  res.cookie("accessToken", accessToken, {
    maxAge: 300000, // TODO: set config
    httpOnly: httpOnly,
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10,
    httpOnly: httpOnly,
  });
}

/**
 * Creates access and refresh tokens.
 * @param {string} sessionId - The session ID.
 * @param {string} email - The user's email.
 * @param {string} username - The user's username.
 * @returns {Object} The access and refresh tokens.
 */
function createTokens(sessionId: string, email: string, username: string) {
  const accessToken = signJWT({ email, username, sessionId }, "5m");
  const refreshToken = signJWT({ sessionId }, "1y");
  return { accessToken, refreshToken };
}

/**
 * Creates a new session.
 * @param {string} email - The user's email.
 * @param {string} username - The user's username.
 * @returns {Promise<Session>} The new session.
 */
async function createNewSession(email: string, username: string) {
  const session = new Session({ email, username });
  await session.save();
  return session;
}

/**
 * Validates a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} path - The request path.
 * @returns {Promise<UserAccount>} The validated user.
 * @throws {UnauthorizedError} If the email or password is invalid.
 */
async function validateUser(email: string, password: string, path: string) {
  const user = await UserAccount.findOne({ email });
  if (!user || !(await user.isValidPassword(password))) {
    throw new UnauthorizedError("Invalid email or password", path);
  }
  return user;
}
