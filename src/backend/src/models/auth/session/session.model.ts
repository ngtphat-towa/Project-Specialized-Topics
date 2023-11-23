import mongoose, { Document, Schema } from "mongoose";

/**
 * @interface ISession
 * @extends {Document}
 */
export interface ISession extends Document {
  email: string;
  valid: boolean;
  username: string;
  role: string;
  invalidateSession: () => Promise<ISession>;
}

/**
 * @type {Schema}
 */
const SessionSchema = new Schema(
  {
    email: { type: String },
    valid: { type: Boolean, default: true },
    username: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    expireAt: { type: Date, expires: "1h", default: Date.now },
  }
  // { timestamps: true }
);

/**
 * @method invalidateSession
 * @returns {Promise<ISession>}
 */
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
