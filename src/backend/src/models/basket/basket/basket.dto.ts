import Joi from "joi";
import { IBasketItem } from "../items/basket.item.model";
import { basketItemSchema } from "../items/basket.item.dto";

// Define the Joi validation schema for createCustomerBasket
export const createCustomerBasketSchema = Joi.object({
  buyerId: Joi.string().required().messages({
    "string.empty": "BuyerId is required. Please provide a valid buyerId.",
  }),
  items: Joi.array().items(basketItemSchema).required().messages({
    "array.base": "Items are required. Please provide a valid array of items.",
  }),
}).options({ stripUnknown: true });

// Define the Joi validation schema for updateCustomerBasket
export const updateCustomerBasketSchema = Joi.object({
  buyerId: Joi.string().required().messages({
    "string.empty": "BuyerId is required. Please provide a valid buyerId.",
  }),
  items: Joi.array().items(basketItemSchema).required().messages({
    "array.base": "Items are required. Please provide a valid array of items.",
  }),
}).options({ stripUnknown: true });

export interface ICreateCustomerBasket {
  buyerId: string;
  items: IBasketItem[];
}

export interface IGetCustomerBasketByBuyerId {
  buyerId: string;
}

export interface IUpdateCustomerBasket {
  buyerId: string;
  items: IBasketItem[];
}

export interface IDeleteCustomerBasket {
  buyerId: string;
}
