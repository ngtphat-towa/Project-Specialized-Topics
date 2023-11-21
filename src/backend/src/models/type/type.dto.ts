import Joi from "joi";
import { IImage } from "../commons/image.model";

export const createTypeSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  description: Joi.string().optional(),
  image: Joi.array()
    .items(
      Joi.binary().encoding("base64").max(5242880).messages({
        "binary.max": "Each image should be less than 5MB",
      })
    )
    .optional(),
}).options({ stripUnknown: true });

export const updateTypeSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  image: Joi.array()
    .items(
      Joi.binary().encoding("base64").max(5242880).messages({
        "binary.max": "Each image should be less than 5MB",
      })
    )
    .optional(),
}).options({ stripUnknown: true });

export const findTypesSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).optional().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have a minimum length of 2",
    "string.max": "Name should have a maximum length of 50",
  }),
  description: Joi.string().trim().max(200).optional().messages({
    "string.empty": "Description cannot be empty",
    "string.max": "Description should have a maximum length of 200",
  }),
  _id: Joi.string().optional().messages({
    "string.empty": "_id cannot be empty",
  }),
  image: Joi.array()
    .items(
      Joi.binary().encoding("base64").max(5242880).messages({
        "binary.max": "Each image should be less than 5MB",
      })
    )
    .optional(),
}).options({ stripUnknown: true });
export interface ICreateType {
  name: string;
  description?: string;
  image?: IImage;
}

export interface IUpdateType {
  name?: string;
  description?: string;
  image?: IImage;
}

export interface IFindTypes {
  name?: string;
  description?: string;
  _id?: string;
}
