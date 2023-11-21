import Joi from "joi";
import { IImage } from "../commons/image.model";

export const createBrandSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  country: Joi.string().required().messages({
    "string.empty": "Country is required",
  }),
  image: Joi.array()
    .items(
      Joi.binary().encoding("base64").max(5242880).messages({
        "binary.max": "Each image should be less than 5MB",
      })
    )
    .optional(),
}).options({ stripUnknown: true });

export const updateBrandSchema = Joi.object({
  name: Joi.string().optional(),
  country: Joi.string().optional(),
  image: Joi.array()
    .items(
      Joi.binary().encoding("base64").max(5242880).messages({
        "binary.max": "Each image should be less than 5MB",
      })
    )
    .optional(),
}).options({ stripUnknown: true });

export const findBrandsSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).optional().messages({
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have a minimum length of 2",
    "string.max": "Name should have a maximum length of 50",
  }),
  country: Joi.string().trim().max(200).optional().messages({
    "string.empty": "Country cannot be empty",
    "string.max": "Country should have a maximum length of 200",
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

export interface ICreateBrand {
  name: string;
  country: string;
  image?: IImage;
}

export interface IUpdateBrand {
  name?: string;
  country?: string;
  image?: IImage;
}

export interface IFindBrands {
  name?: string;
  country?: string;
  _id?: string;
}
