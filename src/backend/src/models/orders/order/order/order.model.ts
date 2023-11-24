import mongoose, { Schema } from "mongoose";
import { IOrderItem, OrderItemSchema } from "../items/order.item.model";

export interface IOrder extends Document {
  buyerId: string;
  sequenceNumber: number;
  orderDate: Date;
  orderStatus: string;
  shippingCity: string;
  shippingStreet: string;
  shippingState: string;
  shippingCountry: string;
  shippingZipCode: string;
  total: number;
  orderNumber: number;
  orderItems: IOrderItem[];
}

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  sequenceNumber: { type: Number, default: 1 },
  orderDate: { type: Date, required: true },
  orderStatus: { type: String, required: true },
  shippingCity: { type: String, required: true },
  shippingStreet: { type: String, required: true },
  shippingState: { type: String, required: true },
  shippingCountry: { type: String, required: true },
  shippingZipCode: { type: String, required: true },
  total: { type: Number, required: true },
  orderNumber: { type: Number, required: true },
  orderItems: { type: [OrderItemSchema], required: true },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
