import { NextFunction, Response, Request } from "express";
import logging from "../configs/logging";

const NAMESPACE = "Server";

const apiRequestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Log the method and body
  logging.info(
    NAMESPACE,
    `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  if (req.headers["Authorization"]) {
    logging.debug(NAMESPACE, `HEADERS: ]`, req.headers["Authorization"]);
  }
  if (req.params && Object.keys(req.params).length > 0) {
    logging.debug(NAMESPACE, `HEADERS:`, req.params);
  }

  if (req.body && Object.keys(req.body).length > 0) {
    logging.debug(NAMESPACE, `BODY:`, req.body);
  }

  // after done then log the result
  res.on("finish", () => {
    /** Log the res */
    logging.info(
      NAMESPACE,
      `Result - METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
};

export default {
  apiRequestLogger,
};
