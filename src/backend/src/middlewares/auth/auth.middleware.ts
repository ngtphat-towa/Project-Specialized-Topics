import { NextFunction, Request, Response } from "express";
import { signJWT, verifyJWT } from "../../handlers/jwt.handler";
import { Session } from "../../models/auth/session/session.model";
import { JwtPayload } from "jsonwebtoken";

/**
 * @param {string} token - The JWT token to verify.
 * @returns {object|null} The payload of the token if it's not expired, otherwise null.
 */
async function getPayloadFromToken(token: string) {
  if (!token) {
    return null;
  }

  const { payload, expired } = verifyJWT(token);
  return expired ? null : payload;
}

/**
 * @param {string} refreshToken - The refresh token to verify.
 * @param {Response} res - The response object to set the new access token in cookies.
 * @returns {object|null} The payload of the new access token if the refresh token is valid and the session exists, otherwise null.
 */
async function refreshAccessToken(refreshToken: string, res: Response) {
  const { payload: refresh } = refreshToken
    ? verifyJWT(refreshToken)
    : { payload: null };

  if (!refresh) {
    return null;
  }

  const session = await Session.findById((refresh as JwtPayload).id);

  if (!session) {
    return null;
  }

  const newAccessToken = signJWT(session, "5s");

  res.cookie("accessToken", newAccessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  });

  return verifyJWT(newAccessToken).payload;
}

/**
 * @param {Request} req - The request object that contains the access and refresh tokens in cookies.
 * @param {Response} res - The response object to set the new access token in cookies if the old one is expired.
 * @param {NextFunction} next - The next function to call after the user is deserialized.
 */
async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { accessToken, refreshToken } = req.cookies;

    let payload = await getPayloadFromToken(accessToken);

    if (!payload) {
      payload = await refreshAccessToken(refreshToken, res);
    }
    //@ts-ignore
    req.user = payload;

    return next();
  } catch (error) {
    return next(error);
  }
}

export default deserializeUser;
