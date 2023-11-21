import Joi from "joi";

import { Request } from "express";
import { BadRequestError } from "../../common/err.common";
import logging from "../../configs/logging";

function validateRequest<T>(
  req: Request,
  schema: Joi.ObjectSchema,
  source: string = "body"
): T {
  const keys = source.split(".");
  let data: any = req;

  for (const key of keys) {
    data = data[key];
    if (!data) {
      throw new BadRequestError(`Missing required parameter: ${key}`, req.url);
    }
  }

  const { error, value } = schema.validate(data);

  if (error) {
    throw new BadRequestError(error.message, req.url);
  }

  return value as T;
}

export function validateBody<T>(req: Request, schema: Joi.ObjectSchema): T {
  return validateRequest(req, schema, "body");
}

export function validateParams<T>(req: Request, schema: Joi.ObjectSchema): T {
  return validateRequest(req, schema, "params");
}
export function validateQuery<T>(req: Request, schema: Joi.ObjectSchema): T {
  return validateRequest(req, schema, "query");
}

export function validateHeaders<T>(req: Request, schema: Joi.ObjectSchema): T {
  return validateRequest(req, schema, "headers");
}

export function validateBodyList<T>(
  req: Request,
  schema: Joi.ObjectSchema
): T[] {
  if (!Array.isArray(req.body)) {
    throw new BadRequestError("Request body must be an array", req.url);
  }

  return req.body.map((item) => {
    const reqClone = Object.assign({}, req, { body: item });
    return validateRequest(reqClone, schema);
  });
}
