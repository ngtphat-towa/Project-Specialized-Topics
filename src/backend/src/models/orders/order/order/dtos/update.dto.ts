import Joi from "joi";
import { OrderItemJoiSchema } from "../../items/order.item.dto";
import { OrderStatus } from "../../order.status";
import { IOrderItem } from "../../items/order.item.model";

export const UpdateOrderSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.base": `"userId" should be a type of 'text'`,
    "string.empty": `"userId" cannot be an empty field`,
    "any.required": `"userId" is a required field`,
  }),
  sequenceNumber: Joi.number().required().messages({
    "number.base": `"sequenceNumber" should be a type of 'number'`,
    "number.empty": `"sequenceNumber" cannot be an empty field`,
    "any.required": `"sequenceNumber" is a required field`,
  }),
  orderDate: Joi.date().required().messages({
    "date.base": `"orderDate" should be a type of 'date'`,
    "date.empty": `"orderDate" cannot be an empty field`,
    "any.required": `"orderDate" is a required field`,
  }),
  paymentStatus: Joi.string().required().messages({
    "string.base": `"paymentStatus" should be a type of 'text'`,
    "string.empty": `"paymentStatus" cannot be an empty field`,
    "any.required": `"paymentStatus" is a required field`,
  }),
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
  shippingCity: Joi.string().required().messages({
    "string.base": `"shippingCity" should be a type of 'text'`,
    "string.empty": `"shippingCity" cannot be an empty field`,
    "any.required": `"shippingCity" is a required field`,
  }),
  shippingStreet: Joi.string().required().messages({
    "string.base": `"shippingStreet" should be a type of 'text'`,
    "string.empty": `"shippingStreet" cannot be an empty field`,
    "any.required": `"shippingStreet" is a required field`,
  }),
  shippingState: Joi.string().required().messages({
    "string.base": `"shippingState" should be a type of 'text'`,
    "string.empty": `"shippingState" cannot be an empty field`,
    "any.required": `"shippingState" is a required field`,
  }),
  shippingCountry: Joi.string().required().messages({
    "string.base": `"shippingCountry" should be a type of 'text'`,
    "string.empty": `"shippingCountry" cannot be an empty field`,
    "any.required": `"shippingCountry" is a required field`,
  }),
  shippingZipCode: Joi.string().required().messages({
    "string.base": `"shippingZipCode" should be a type of 'text'`,
    "string.empty": `"shippingZipCode" cannot be an empty field`,
    "any.required": `"shippingZipCode" is a required field`,
  }),
  total: Joi.number().required().messages({
    "number.base": `"total" should be a type of 'number'`,
    "number.empty": `"total" cannot be an empty field`,
    "any.required": `"total" is a required field`,
  }),
  orderNumber: Joi.string().required().messages({
    "string.base": `"orderNumber" should be a type of 'text'`,
    "string.empty": `"orderNumber" cannot be an empty field`,
    "any.required": `"orderNumber" is a required field`,
  }),
  phone: Joi.string().required().messages({
    "string.base": `"phone" should be a type of 'text'`,
    "string.empty": `"phone" cannot be an empty field`,
    "any.required": `"phone" is a required field`,
  }),
  orderItems: Joi.array().items(OrderItemJoiSchema).messages({
    "array.base": `"orderItems" should be a type of 'array'`,
    "array.empty": `"orderItems" cannot be an empty field`,
    "any.required": `"orderItems" is a required field`,
  }),
}).options({ stripUnknown: true });
export interface IOrderUpdate {
  userId?: string;
  sequenceNumber?: number;
  orderDate?: Date;
  paymentStatus?: string;
  orderStatus?: OrderStatus;
  shippingCity?: string;
  shippingStreet?: string;
  shippingState?: string;
  shippingCountry?: string;
  shippingZipCode?: string;
  total?: number;
  orderNumber?: string;
  phone?: string;
  orderItems?: IOrderItem[];
}
