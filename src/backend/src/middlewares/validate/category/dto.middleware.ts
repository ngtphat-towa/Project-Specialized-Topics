// middleware/validate.middleware.js
import { NextFunction, Request, Response } from "express";
import {
  createTypeSchema,
  updateTypeSchema,
} from "../../../models/catalog/type/type.dto";
import { BadRequestError } from "../../../common/err.common";

export const validateType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = req.method === "POST" ? createTypeSchema : updateTypeSchema;
  const { error } = schema.validate(req.body);
  if (error) {
    const errApi = new BadRequestError(error.details[0].message, req.path);
    throw errApi;
  }
  next();
};
