// validate token
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../configs/config";
// Extend the Request interface with an optional user property

function validateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const user = jwt.verify(token, config.server.token.secret);
      req.body.user = user;
      next();
    } catch (err) {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
}

export default validateToken;
