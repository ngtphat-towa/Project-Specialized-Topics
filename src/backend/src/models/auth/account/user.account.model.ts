import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Define the UserAccount schema
const UserAccountSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { versionKey: false }
);

// Hash the password before saving the user model
UserAccountSchema.pre("save", async function (next) {
  const user = this as IUserAccount;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserAccountSchema.methods.isValidPassword = async function (password: string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

// Define the UserAccount model
export interface IUserAccount extends Document {
  username: string;
  password: string;
  email: string;
  role: string;
  isValidPassword: (password: string) => Promise<boolean>;
  [key: string]: any;
}

// Create the UserAccount model
export const UserAccount = mongoose.model<IUserAccount>(
  "UserAccount",
  UserAccountSchema
);
