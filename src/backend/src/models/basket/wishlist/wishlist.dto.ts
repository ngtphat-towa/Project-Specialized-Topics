import Joi from "joi";
import { IWishlistItem } from "./wishlist.item.model";

// DTO Models
export interface ICreateWishlistItem {
  userId: string;
  productId: string;
  productName: string;
  oldUnitPrice: number;
}

export interface IGetWishlistByUserId {
  userId: string;
}

export interface IDeleteWishlist {
  userId: string;
}

export interface IDeleteWishlistItem {
  userId: string;
  productId: string;
}

// DTO Model
export interface ICreateCustomWishlist {
  userId: string;
  items?: IWishlistItem[];
}

export const createCustomWishlistSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required. Please provide a valid userId.",
  }),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required().messages({
          "string.empty":
            "Product id is required. Please provide a valid productId.",
        }),
        productName: Joi.string().required().messages({
          "string.empty":
            "Product name is required. Please provide a valid productName.",
        }),
        oldUnitPrice: Joi.number().required().messages({
          "number.base":
            "Old unit price is required and must be a number. Please provide a valid oldUnitPrice.",
        }),
        quantity: Joi.number().required().messages({
          "number.base":
            "Quantity is required and must be a number. Please provide a valid quantity.",
        }),
      })
    )
    .optional()
    .messages({
      "array.base":
        "Items are required and must be an array. Please provide a valid list of items.",
    }),
}).options({ stripUnknown: true });

export const createWishlistItemSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required. Please provide a valid userId.",
  }),
  productId: Joi.string().required().messages({
    "string.empty": "Product id is required. Please provide a valid productId.",
  }),
  productName: Joi.string().required().messages({
    "string.empty":
      "Product name is required. Please provide a valid productName.",
  }),
  oldUnitPrice: Joi.number().required().messages({
    "number.base":
      "Old unit price is required and must be a number. Please provide a valid oldUnitPrice.",
  }),
  quantity: Joi.number().required().messages({
    "number.base":
      "Quantity is required and must be a number. Please provide a valid quantity.",
  }),
}).options({ stripUnknown: true });

export const getWishlistByUserIdSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required. Please provide a valid userId.",
  }),
}).options({ stripUnknown: true });

export const deleteWishlistSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required. Please provide a valid userId.",
  }),
}).options({ stripUnknown: true });

export const deleteWishlistItemSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required. Please provide a valid userId.",
  }),
  productId: Joi.string().required().messages({
    "string.empty": "Product id is required. Please provide a valid productId.",
  }),
}).options({ stripUnknown: true });
