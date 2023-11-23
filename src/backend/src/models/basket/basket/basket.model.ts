import mongoose, { Schema } from "mongoose";
import { IUserAccount } from "../../auth/account/user.account.model";
import { BasketItemSchema, IBasketItem } from "../items/basket.item.model";

// Define the CustomerBasket schema
const CustomerBasketSchema = new Schema(
  {
    buyerId: {
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
  buyerId: string;
  items?: IBasketItem[];
}

// Create the CustomerBasket model
export const CustomerBasket = mongoose.model<ICustomerBasket>(
  "CustomerBasket",
  CustomerBasketSchema
);
