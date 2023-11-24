import Joi from "joi";
import { IImage } from "../../../commons/image.model";

export interface CheckoutItem {
  productId: string;
  price: number;
  productName: string;
  image?: IImage;
  quantity: number;
  discount?: number;
}

export const checkoutItemSchema = Joi.object({
  productId: Joi.string().required().messages({
    "string.empty": "Product ID cannot be empty",
    "any.required": "Product ID is a required field",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is a required field",
  }),
  productName: Joi.string().required().messages({
    "string.empty": "Product name cannot be empty",
    "any.required": "Product name is a required field",
  }),
  image: Joi.object().optional(),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is a required field",
  }),
  discount: Joi.number().optional().min(0).max(100).messages({
    "number.base": "Discount must be a number",
    "number.min": "Discount cannot be less than 0",
    "number.max": "Discount cannot be more than 100",
  }),
}).options({ stripUnknown: true });
