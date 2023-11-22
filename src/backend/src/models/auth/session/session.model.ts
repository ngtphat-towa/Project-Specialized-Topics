import mongoose, { Document, Schema } from "mongoose";

export interface ISession extends Document {
  email: string;
  valid: boolean;
  username: string;
  invalidateSession: () => Promise<ISession>;
}

const SessionSchema = new Schema(
  {
    email: { type: String },
    valid: { type: Boolean, default: true },
    username: { type: String },
    expireAt: { type: Date, expires: "1h", default: Date.now },
  }
  // { timestamps: true }
);

SessionSchema.methods.invalidateSession = async function () {
  this.valid = false;
  return this.save();
};

// Pre-save middleware
SessionSchema.pre("save", function (next) {
  if (!this.expireAt) {
    this.expireAt = new Date();
  }
  next();
});

export const Session = mongoose.model<ISession>("Session", SessionSchema);
