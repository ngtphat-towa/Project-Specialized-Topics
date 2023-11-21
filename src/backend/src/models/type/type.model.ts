import mongoose, { Document, Schema } from "mongoose";
import { IImage } from "../commons/image.model";

// Define the Type schema
const TypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200,
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
TypeSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});

// Define the Type model
export interface IType extends Document {
  name: string;
  description?: string;
  image?: IImage;
  createdAt: Date;
  updatedAt?: Date;
}

// Create the Type model
export const Type = mongoose.model<IType>("Type", TypeSchema);
