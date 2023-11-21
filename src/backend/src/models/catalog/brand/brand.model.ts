import mongoose, { Document, Schema } from "mongoose";
import { IImage } from "../../commons/image.model";

// Define the Brand schema
const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    image: { data: Buffer, contentType: String },
  },
  { versionKey: false }
);


// Define the Brand model
export interface IBrand extends Document {
  name: string;
  country: string;
  image?: IImage;
}

// Create the Brand model
export const Brand = mongoose.model<IBrand>("Brand", BrandSchema);
