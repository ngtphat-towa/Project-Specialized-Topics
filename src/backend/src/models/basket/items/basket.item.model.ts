import mongoose, { Document, Schema } from "mongoose";
import { IImage } from "../../commons/image.model";
import { ICatalogItem } from "../../catalog/items/item.model";

// Define the BasketItem schema
export const BasketItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "CatalogItem",
    },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    oldUnitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { data: Buffer, contentType: String },
  },
  { versionKey: false }
);

// Define the BasketItem model
export interface IBasketItem extends Document {
  product?: ICatalogItem;
  productId: string;
  productName: string;
  unitPrice: number;
  oldUnitPrice: number;
  quantity: number;
  image?: IImage;
}

// Create the BasketItem model
export const BasketItem = mongoose.model<IBasketItem>(
  "BasketItem",
  BasketItemSchema
);
