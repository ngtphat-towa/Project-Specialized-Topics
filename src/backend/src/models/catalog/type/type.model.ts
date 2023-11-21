import mongoose, { Document, Schema } from "mongoose";
import { IImage } from "../../commons/image.model";

// Define the Type schema
const TypeSchema = new Schema(
  {
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
  },
  { versionKey: false }
);



// Define the Type model
export interface IType extends Document {
  name: string;
  description?: string;
  image?: IImage;
}

// Create the Type model
export const Type = mongoose.model<IType>("Type", TypeSchema);
