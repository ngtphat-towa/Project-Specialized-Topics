import Joi from "joi";
import { IImage } from "../../commons/image.model";

// Define the DTO for adding a single BasketItem
export interface IAddBasketItem {
  productId: string;
  productName: string;
  unitPrice: number;
  oldUnitPrice: number;
  quantity: number;
  image?: IImage;
}

// Define the DTO for updating a single BasketItem
export interface IUpdateBasketItem {
  productId: string;
  productName?: string;
  unitPrice?: number;
  oldUnitPrice?: number;
  quantity?: number;
}

// Define the DTO for removing a single BasketItem
export interface IRemoveBasketItem {
  productId: string;
}

// Define the Joi validation schema for adding a single BasketItem
export const addBasketItemSchema = Joi.object({
  productId: Joi.string().required().messages({
    "string.empty": "Product id is required. Please provide a valid productId.",
  }),
  productName: Joi.string().required().messages({
    "string.empty":
      "Product name is required. Please provide a valid productName.",
  }),
  unitPrice: Joi.number().required().messages({
    "number.base":
      "Unit price is required and must be a number. Please provide a valid unitPrice.",
  }),
  oldUnitPrice: Joi.number().required().messages({
    "number.base":
      "Old unit price is required and must be a number. Please provide a valid oldUnitPrice.",
  }),
  quantity: Joi.number().required().messages({
    "number.base":
      "Quantity is required and must be a number. Please provide a valid quantity.",
  }),
  image: Joi.object({
    data: Joi.binary().required().messages({
      "binary.base": "Image data is required. Please provide valid image data.",
    }),
    contentType: Joi.string().required().messages({
      "string.empty":
        "Image contentType is required. Please provide a valid contentType.",
    }),
  }).optional(),
}).options({ stripUnknown: true });

// Define the Joi validation schema for removing a single BasketItem
export const removeBasketItemSchema = Joi.object({
  productId: Joi.string().required().messages({
    "string.empty": "Product id is required. Please provide a valid productId.",
  }),
}).options({ stripUnknown: true });

// Define the Joi validation schema for updating a single BasketItem
export const updateBasketItemSchema = Joi.object({
  productId: Joi.string().required().messages({
    "string.empty": "Product id is required. Please provide a valid productId.",
  }),
  productName: Joi.string().optional(),
  unitPrice: Joi.number()
    .optional()
    .messages({ "number.base": "Unit price must be a number." }),
  oldUnitPrice: Joi.number()
    .optional()
    .messages({ "number.base": "Old unit price must be a number." }),
  quantity: Joi.number()
    .optional()
    .messages({ "number.base": "Quantity must be a number." }),
  image: Joi.object({
    data: Joi.binary()
      .optional()
      .messages({ "binary.base": "Image data must be binary." }),
    contentType: Joi.string()
      .optional()
      .messages({ "string.empty": "Image contentType must be a string." }),
  }).optional(),
}).options({ stripUnknown: true });
