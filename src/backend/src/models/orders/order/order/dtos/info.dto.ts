import Joi from "joi";
import { OrderStatus } from "../../order.status";

export const ShippingInfoUpdateSchema = Joi.object({
  shippingCity: Joi.string().required(),
  shippingStreet: Joi.string().required(),
  shippingState: Joi.string().required(),
  shippingCountry: Joi.string().required(),
  shippingZipCode: Joi.string().required(),
}).options({ stripUnknown: true });

export const OrderStatusUpdateSchema = Joi.object({
  orderStatus: Joi.string()
    .valid(
      "Submitted",
      "AwaitingValidation",
      "StockConfirmed",
      "Paid",
      "Shipped",
      "Cancelled"
    )
    .required()
    .messages({
      "string.base": `"orderStatus" should be a type of 'text'`,
      "string.empty": `"orderStatus" cannot be an empty field`,
      "any.only": `"orderStatus" should be one of ['Submitted', 'AwaitingValidation', 'StockConfirmed', 'Paid', 'Shipped', 'Cancelled']`,
      "any.required": `"orderStatus" is a required field`,
    }),
}).options({ stripUnknown: true });

export interface IShippingInfoUpdate {
  shippingCity: string;
  shippingStreet: string;
  shippingState: string;
  shippingCountry: string;
  shippingZipCode: string;
}
export interface IOrderStatusUpdate {
  orderStatus: string;
}
