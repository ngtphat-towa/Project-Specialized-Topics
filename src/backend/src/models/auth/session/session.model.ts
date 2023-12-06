import mongoose, { Document, Schema } from "mongoose";
import config from "../../../configs/config";

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
    const time = parseInt(config.jwt.accessTokenExpireTime); // parse the number from the string
    const unit = config.jwt.accessTokenExpireTime.replace(
      time.toLocaleString(),
      ""
    ); // get the unit from the string
    let multiplier;

    switch (unit) {
      case "s": // seconds
        multiplier = 1000;
        break;
      case "m": // minutes
        multiplier = 60 * 1000;
        break;
      case "h": // hours
        multiplier = 60 * 60 * 1000;
        break;
      case "d": // days
        multiplier = 24 * 60 * 60 * 1000;
        break;
      default:
        throw new Error(`Invalid time unit: ${unit}`);
    }
    this.expireAt = new Date(Date.now() + time * multiplier); // convert to milliseconds

    console.log(this.expireAt.toUTCString());
  }
  next();
});

export const Session = mongoose.model<ISession>("Session", SessionSchema);
