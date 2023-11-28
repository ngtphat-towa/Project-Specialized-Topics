import Joi from "joi";
import { IImage } from "../../commons/image.model";

export const searchAndSortSchema = Joi.object({
  searchTerm: Joi.string().optional(),
  searchField: Joi.string()
    .valid("name", "catalogType", "catalogBrand", "price", "availableStock", "")
    .optional(),
  sortField: Joi.string()
    .valid("name", "catalogType", "catalogBrand", "price", "availableStock", "")
    .optional(),
  sortMode: Joi.string().valid("asc", "desc").optional(),
  pageSize: Joi.number().integer().min(1).optional(),
  pageIndex: Joi.number().integer().min(0).optional(),
}).options({ stripUnknown: true });

// Define the Joi validation schema
export const createCatalogItemSchema = Joi.object({
  name: Joi.string().optional().messages({ "string.empty": "Name is empty" }),
  description: Joi.string().optional(),
  price: Joi.number().required(),
  catalogType: Joi.string().required(), // assuming the catalogType will be passed as an id
  catalogBrand: Joi.string().required(), // assuming the catalogBrand will be passed as an id
  availableStock: Joi.number().required(),
  image: Joi.array()
    .items(
      Joi.binary()
        .encoding("base64")
        .max(5242880)
        .messages({ "binary.max": "Each image should be less than 5MB" })
    )
    .optional(),
}).options({ stripUnknown: true });

export const updateCatalogItemSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  catalogType: Joi.string().optional(),
  catalogBrand: Joi.string().optional(),
  availableStock: Joi.number().optional(),
  image: Joi.array()
    .items(
      Joi.binary()
        .encoding("base64")
        .max(5242880)
        .messages({ "binary.max": "Each image should be less than 5MB" })
    )
    .optional(),
}).options({ stripUnknown: true });

export interface ICreateCatalogItem {
  name: string;
  description?: string;
  price: number;
  catalogType: string; // assuming the catalogType will be passed as an id
  catalogBrand: string; // assuming the catalogBrand will be passed as an id
  availableStock: number;
  image?: IImage;
}

export interface IUpdateCatalogItem {
  name?: string;
  description?: string;
  price?: number;
  catalogType?: string;
  catalogBrand?: string;
  availableStock?: number;
  image?: IImage;
}
export interface SearchAndSortDto {
  searchTerm?: string;
  searchField?:
    | "name"
    | "catalogType"
    | "catalogBrand"
    | "price"
    | "availableStock"
    | "";
  sortField?:
    | "name"
    | "catalogType"
    | "catalogBrand"
    | "price"
    | "availableStock"
    | "";
  sortMode?: "asc" | "desc";
  pageSize?: number;
  pageIndex?: number;
  [key: string]: any;
}
