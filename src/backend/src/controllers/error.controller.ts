import { NextFunction, Request, Response } from "express";
import logging from "../configs/logging";

const handleError = (req: Request, res: Response, next: NextFunction) => {
  const err = new Error("not found");

  logging.error("handleError", "Not found");

  return res.status(404).json({ message: err.message });
};

export default {
  handleError,
};
