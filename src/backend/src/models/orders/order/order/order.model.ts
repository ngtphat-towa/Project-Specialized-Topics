import mongoose, { Schema } from "mongoose";
import { IOrderItem, OrderItemSchema } from "../items/order.item.model";
import { string } from "joi";

export interface IOrder extends Document {
  userId: string;
  sequenceNumber: number;
  orderDate: Date;
  paymentStatus: string;
  orderStatus: string;
  shippingCity: string;
  shippingStreet: string;
  shippingState: string;
  shippingCountry: string;
  shippingZipCode: string;
  total: number;
  orderNumber: string;
  phone: string;
  orderItems: IOrderItem[];
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  sequenceNumber: { type: Number, default: 1 },
  orderDate: { type: Date, required: true },
  paymentStatus: { type: String, required: true },
  shippingCity: { type: String, required: true, default: "" },
  shippingStreet: { type: String, required: true, default: "" },
  shippingState: { type: String, required: true, default: "" },
  shippingCountry: { type: String, required: true, default: "US" },
  shippingZipCode: { type: String, required: true, default: "" },
  total: { type: Number, required: true },
  orderNumber: { type: String, required: true },
  phone: { type: String },
  orderStatus: { type: String, required: true, default: "paid" },
  orderItems: { type: [OrderItemSchema], required: true },
});

// Create the Order model
export const Order = mongoose.model<IOrder>("Order", OrderSchema);
