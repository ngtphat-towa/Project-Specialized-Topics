// middleware/validate.middleware.js
import { NextFunction, Request, Response } from "express";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../../../models/category/category.dto";
import { BadRequestError } from "../../../common/err.common";

export const validateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema =
    req.method === "POST" ? createCategorySchema : updateCategorySchema;
  const { error } = schema.validate(req.body);
  if (error) {
    const errApi = new BadRequestError(error.details[0].message, req.path);
    throw errApi;
  }
  next();
};
