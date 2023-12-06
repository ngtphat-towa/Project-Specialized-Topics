import { OrderItemJoiSchema } from "../../items/order.item.dto";
import { IOrderItem } from "../../items/order.item.model";
import { OrderStatus } from "../../order.status";

export interface IOrderQuery {
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
import Joi from "joi";

export const OrderQuerySchema = Joi.object({
  userId: Joi.string().optional().messages({
    "string.base": `"userId" should be a type of 'text'`,
    "string.empty": `"userId" cannot be an empty field`,
  }),
  sequenceNumber: Joi.number().optional().messages({
    "number.base": `"sequenceNumber" should be a type of 'number'`,
    "number.empty": `"sequenceNumber" cannot be an empty field`,
  }),
  orderDate: Joi.date().optional().messages({
    "date.base": `"orderDate" should be a type of 'date'`,
    "date.empty": `"orderDate" cannot be an empty field`,
  }),
  paymentStatus: Joi.string().optional().messages({
    "string.base": `"paymentStatus" should be a type of 'text'`,
    "string.empty": `"paymentStatus" cannot be an empty field`,
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
    .optional()
    .messages({
      "string.base": `"orderStatus" should be a type of 'text'`,
      "string.empty": `"orderStatus" cannot be an empty field`,
      "any.only": `"orderStatus" should be one of ['Submitted', 'AwaitingValidation', 'StockConfirmed', 'Paid', 'Shipped', 'Cancelled']`,
    }),
  shippingCity: Joi.string().optional().messages({
    "string.base": `"shippingCity" should be a type of 'text'`,
    "string.empty": `"shippingCity" cannot be an empty field`,
  }),
  shippingStreet: Joi.string().optional().messages({
    "string.base": `"shippingStreet" should be a type of 'text'`,
    "string.empty": `"shippingStreet" cannot be an empty field`,
  }),
  shippingState: Joi.string().optional().messages({
    "string.base": `"shippingState" should be a type of 'text'`,
    "string.empty": `"shippingState" cannot be an empty field`,
  }),
  shippingCountry: Joi.string().optional().messages({
    "string.base": `"shippingCountry" should be a type of 'text'`,
    "string.empty": `"shippingCountry" cannot be an empty field`,
  }),
  shippingZipCode: Joi.string().optional().messages({
    "string.base": `"shippingZipCode" should be a type of 'text'`,
    "string.empty": `"shippingZipCode" cannot be an empty field`,
  }),
  total: Joi.number().optional().messages({
    "number.base": `"total" should be a type of 'number'`,
    "number.empty": `"total" cannot be an empty field`,
  }),
  orderNumber: Joi.string().optional().messages({
    "string.base": `"orderNumber" should be a type of 'text'`,
    "string.empty": `"orderNumber" cannot be an empty field`,
  }),
  phone: Joi.string().optional().messages({
    "string.base": `"phone" should be a type of 'text'`,
    "string.empty": `"phone" cannot be an empty field`,
  }),
  orderItems: Joi.array().items(OrderItemJoiSchema).optional().messages({
    "array.base": `"orderItems" should be a type of 'array'`,
    "array.empty": `"orderItems" cannot be an empty field`,
  }),
}).options({ stripUnknown: true });
