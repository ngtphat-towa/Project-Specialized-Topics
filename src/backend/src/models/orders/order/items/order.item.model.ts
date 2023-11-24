import { Schema } from "mongoose";

export interface IOrderItem extends Document {
  productId: string;
  unitPrice: number;
  productName: string;
  pictureUrl: string;
  quantity: number;
  discount: number;
}

export const OrderItemSchema: Schema = new Schema({
  productId: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  productName: { type: String, required: true },
  pictureUrl: { type: String, required: true },
  quantity: { type: Number, required: true },
  discount: { type: Number, required: true },
});
