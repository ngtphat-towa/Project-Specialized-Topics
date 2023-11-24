import mongoose, { Document, Schema } from "mongoose";
import { IImage } from "../../commons/image.model";
import { ICatalogItem } from "../../catalog/items/item.model";

// Define the WishlistItem schema
export const WishlistItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "CatalogItem",
    },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    oldUnitPrice: { type: Number, required: true },
    image: { data: Buffer, contentType: String },
  },
  { versionKey: false }
);

// Define the WishlistItem model
export interface IWishlistItem extends Document {
  product?: ICatalogItem;
  productId: string;
  productName: string;
  oldUnitPrice: number;
  image?: IImage;
}

// Create the WishlistItem model
export const WishlistItem = mongoose.model<IWishlistItem>(
  "WishlistItem",
  WishlistItemSchema
);
