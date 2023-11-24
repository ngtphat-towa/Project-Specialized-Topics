import mongoose, { Schema } from "mongoose";
import { IWishlistItem, WishlistItemSchema } from "./wishlist.item.model";

// Define the CustomerWishlist schema
const CustomerWishlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserAccount",
      required: true,
    },
    items: [WishlistItemSchema],
  },
  { versionKey: false }
);

// Define the CustomerWishlist model
export interface ICustomerWishlist extends Document {
  userId: string;
  items: IWishlistItem[];
}

// Create the CustomerWishlist model
export const CustomerWishlist = mongoose.model<ICustomerWishlist>(
  "CustomerWishlist",
  CustomerWishlistSchema
);
