import mongoose, { Schema } from "mongoose";
import { BasketItemSchema, IBasketItem } from "../items/basket.item.model";

// Define the CustomerBasket schema
const CustomerBasketSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserAccount",
      required: true,
    },
    items: [BasketItemSchema],
  },
  { versionKey: false }
);

// Define the CustomerBasket model
export interface ICustomerBasket extends Document {
  userId: string;
  items: IBasketItem[];
}

// Create the CustomerBasket model
export const CustomerBasket = mongoose.model<ICustomerBasket>(
  "CustomerBasket",
  CustomerBasketSchema
);
