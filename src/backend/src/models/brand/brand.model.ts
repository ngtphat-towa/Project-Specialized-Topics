import mongoose, { Document, Schema } from "mongoose";
import { IImage } from "../commons/image.model";

// Define the Brand schema
const BrandSchema = new Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Add a pre-save middleware to handle updatedAt
BrandSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});

// Define the Brand model
export interface IBrand extends Document {
  name: string;
  country: string;
  image?: IImage;
  createdAt: Date;
  updatedAt?: Date;
}

// Create the Brand model
export const Brand = mongoose.model<IBrand>("Brand", BrandSchema);
