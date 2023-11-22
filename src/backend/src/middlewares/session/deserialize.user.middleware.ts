import { NextFunction, Request, Response } from "express";
import { signJWT, verifyJWT } from "../../handlers/jwt.handler";
import logging from "../../configs/logging";
import { getSession } from "../../models/auth/user.model";

function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const { accessToken, refreshToken } = req.cookies;
  logging.debug("deserializeUser", "cokkies", req.cookies);

  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyJWT(accessToken);
  logging.debug("deserializeUser", "payload", payload);

  // For a valid access token
  if (payload) {
    // @ts-ignore
    req.user = payload;
    return next();
  }

  // expired but valid access token

  const { payload: refresh } =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };

  if (!refresh) {
    return next();
  }

  // @ts-ignore
  const session = getSession(refresh.sessionId);

  if (!session) {
    return next();
  }

  const newAccessToken = signJWT(session, "5s");

  res.cookie("accessToken", newAccessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  });

  // @ts-ignore
  req.user = verifyJWT(newAccessToken).payload;

  return next();
}

export default deserializeUser;
