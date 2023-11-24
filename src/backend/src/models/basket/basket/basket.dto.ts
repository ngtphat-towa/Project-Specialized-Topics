import Joi from "joi";
import { basketItemSchema } from "../items/basket.item.dto";
import { IBasketItem } from "../items/basket.item.model";

// Define the Joi validation schema for createCustomerBasket
export const createCustomerBasketSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required. Please provide a valid userId.",
  }),
  items: Joi.array().items(basketItemSchema).optional().messages({
    "array.base": "Items are required. Please provide a valid array of items.",
  }),
}).options({ stripUnknown: true });

// Define the Joi validation schema for updateCustomerBasket
export const updateCustomerBasketSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "userId is required. Please provide a valid userId.",
  }),
  items: Joi.array().items(basketItemSchema).required().messages({
    "array.base": "Items are required. Please provide a valid array of items.",
  }),
}).options({ stripUnknown: true });

export interface ICreateCustomerBasket {
  userId: string;
  items?: IBasketItem[];
}

export interface IGetCustomerBasketByuserId {
  userId: string;
}

export interface IUpdateCustomerBasket {
  userId: string;
  items: IBasketItem[];
}

export interface IDeleteCustomerBasket {
  userId: string;
}
