import Joi from "joi";
import { OrderItemJoiSchema } from "../items/order.item.dto";
import { OrderStatus } from "../order.status";
import { IOrderItem } from "../items/order.item.model";

export const UpdateOrderSchema = Joi.object({
  userId: Joi.string().messages({
    "string.base": `"userId" should be a type of 'text'`,
    "string.empty": `"userId" cannot be an empty field`,
  }),
  sequenceNumber: Joi.number().messages({
    "number.base": `"sequenceNumber" should be a type of 'number'`,
    "number.empty": `"sequenceNumber" cannot be an empty field`,
  }),
  orderDate: Joi.date().messages({
    "date.base": `"orderDate" should be a type of 'date'`,
    "date.empty": `"orderDate" cannot be an empty field`,
  }),
  paymentStatus: Joi.string().messages({
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
    .messages({
      "string.base": `"orderStatus" should be a type of 'text'`,
      "string.empty": `"orderStatus" cannot be an empty field`,
      "any.only": `"orderStatus" should be one of ['Submitted', 'AwaitingValidation', 'StockConfirmed', 'Paid', 'Shipped', 'Cancelled']`,
    }),
  shippingCity: Joi.string().messages({
    "string.base": `"shippingCity" should be a type of 'text'`,
    "string.empty": `"shippingCity" cannot be an empty field`,
  }),
  shippingStreet: Joi.string().messages({
    "string.base": `"shippingStreet" should be a type of 'text'`,
    "string.empty": `"shippingStreet" cannot be an empty field`,
  }),
  shippingState: Joi.string().messages({
    "string.base": `"shippingState" should be a type of 'text'`,
    "string.empty": `"shippingState" cannot be an empty field`,
  }),
  shippingCountry: Joi.string().messages({
    "string.base": `"shippingCountry" should be a type of 'text'`,
    "string.empty": `"shippingCountry" cannot be an empty field`,
  }),
  shippingZipCode: Joi.string().messages({
    "string.base": `"shippingZipCode" should be a type of 'text'`,
    "string.empty": `"shippingZipCode" cannot be an empty field`,
  }),
  total: Joi.number().messages({
    "number.base": `"total" should be a type of 'number'`,
    "number.empty": `"total" cannot be an empty field`,
  }),
  orderNumber: Joi.string().messages({
    "string.base": `"orderNumber" should be a type of 'text'`,
    "string.empty": `"orderNumber" cannot be an empty field`,
  }),
  phone: Joi.string().messages({
    "string.base": `"phone" should be a type of 'text'`,
    "string.empty": `"phone" cannot be an empty field`,
  }),
  orderItems: Joi.array()
    .items(OrderItemJoiSchema)
    .messages({
      "array.base": `"orderItems" should be a type of 'array'`,
      "array.empty": `"orderItems" cannot be an empty field`,
    })
    .optional(),
}).options({ stripUnknown: true });
// Query DTO
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

// Update DTO
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

// DTO for updating orderStatus
export interface IOrderStatusUpdateDto {
  orderStatus: OrderStatus;
}

// Joi Schema for validating IOrderStatusUpdateDto
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
});

// DTO for updating shipping information
export interface IShippingInfoUpdate {
  shippingCity: string;
  shippingStreet: string;
  shippingState: string;
  shippingCountry: string;
  shippingZipCode: string;
}

// Joi Schema for validating IShippingInfoUpdateDto
export const ShippingInfoUpdateSchema = Joi.object({
  shippingCity: Joi.string().required(),
  shippingStreet: Joi.string().required(),
  shippingState: Joi.string().required(),
  shippingCountry: Joi.string().required(),
  shippingZipCode: Joi.string().required(),
});
