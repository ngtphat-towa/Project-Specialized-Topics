import mongoose, { Document, Schema } from "mongoose";

// Define the Category schema
const CategorySchema = new Schema({
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
CategorySchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});

// Define the Category model
export interface ICategory extends Document {
  name: string;
  description?: string;
  image?: { data: Buffer; contentType: String };
  createdAt: Date;
  updatedAt?: Date;
}

// Create the Category model
export const Category = mongoose.model<ICategory>("Category", CategorySchema);
