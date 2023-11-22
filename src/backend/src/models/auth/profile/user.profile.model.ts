import mongoose, { Schema } from "mongoose";
import { IUserAccount } from "../account/user.account.model";

// User Profile Schema
export interface IUserProfile extends Document {
  userAccount: IUserAccount["_id"];
  cardNumber: string;
  securityNumber: string;
  expiration: string;
  cardHolderName: string;
  cardType: number;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  name: string;
  lastName: string;
}

const UserProfileSchema: Schema = new Schema({
  userAccount: { type: Schema.Types.ObjectId, ref: "UserAccount" },
  cardNumber: { type: String, required: true, minlength: 16, maxlength: 16 },
  securityNumber: { type: String, required: true, minlength: 3, maxlength: 4 },
  expiration: {
    type: String,
    required: true,
    match: /(0[1-9]|1[0-2])\/[0-9]{2}/,
  },
  cardHolderName: { type: String, required: true },
  cardType: { type: Number, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
});

export const UserProfile = mongoose.model<IUserProfile>(
  "UserProfile",
  UserProfileSchema
);
