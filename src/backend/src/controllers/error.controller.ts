import { NextFunction, Request, Response } from "express";
import logging from "../configs/logging";

const handleError = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.error("handleError", err.message);

  return res.status(404).json({ message: err.message });
};

export default {
  handleError,
};
