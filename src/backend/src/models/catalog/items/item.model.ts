import mongoose, { Document, Schema } from "mongoose";
import { IImage } from "../../commons/image.model";

// Define the CatalogItem schema
const CatalogItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    image: { data: Buffer, contentType: String },
    catalogType: { type: Schema.Types.ObjectId, ref: "Type", required: true },
    catalogBrand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    availableStock: { type: Number, required: true },
  },
  { versionKey: false }
);


// Define the CatalogItem model
export interface ICatalogItem extends Document {
  name: string;
  description?: string;
  price: number;
  image?: IImage;
  catalogType: string; // assuming the catalogType will be passed as an id
  catalogBrand: string; // assuming the catalogBrand will be passed as an id
  availableStock: number;
}

// Create the CatalogItem model
export const CatalogItem = mongoose.model<ICatalogItem>(
  "CatalogItem",
  CatalogItemSchema
);
