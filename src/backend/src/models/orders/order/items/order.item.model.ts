import mongoose, { Schema } from "mongoose";
import { IImage } from "../../../commons/image.model";

export interface IOrderItem extends Document {
  productId: string;
  price: number;
  productName: string;
  image?: IImage;
  quantity: number;
  discount: number;
}

export const OrderItemSchema: Schema = new Schema({
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  productName: { type: String, required: true },
  image: { data: Buffer, contentType: String },
  quantity: { type: Number, required: true },
  discount: { type: Number, required: true },
});
// Create the OrderItem model
export const OrderItem = mongoose.model<IOrderItem>(
  "OrderItem",
  OrderItemSchema
);
