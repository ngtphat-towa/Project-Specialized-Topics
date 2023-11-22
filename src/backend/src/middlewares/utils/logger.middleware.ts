import { NextFunction, Response, Request } from "express";
import logging from "../../configs/logging";

const SERVER = "SERVER";
const CLIENT = "CLIENT";
const REQUEST = "REQUEST";

const apiRequestLogger = (req: Request, res: Response, next: NextFunction) => {
  // Log the method and body
  logging.info(
    CLIENT,
    `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  if (req.headers.authorization) {
    logging.debug(REQUEST, `AUTHORIZATION: ]`, req.headers.authorization);
  }
  if (req.query && Object.keys(req.query).length > 0) {
    logging.debug(REQUEST, `QUERY:`, req.query);
  }
  if (req.params && Object.keys(req.params).length > 0) {
    logging.debug(REQUEST, `PARAMS:`, req.params);
  }

  if (req.body && Object.keys(req.body).length > 0) {
    logging.debug(REQUEST, `BODY:`, req.body);
  }

  // after done then log the result
  res.on("finish", () => {
    /** Log the res */
    logging.info(
      SERVER,
      `Result - METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
};

export default {
  apiRequestLogger,
};
