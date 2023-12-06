import { SERVER, CLIENT } from "./server.config";
import { MONGO_DB } from "./mongo.config";
import dotenv from "dotenv";
import { JWT_KEY } from "./jwt.config";

dotenv.config();
const STRIPE = {
  public: process.env.STRIPE_PUBLIC_KEY || "",
  secret: process.env.STRIPE_SECRET_KEY || "",
};

const config = {
  mongo: MONGO_DB,
  server: SERVER,
  payment: STRIPE,
  client: CLIENT,
  jwt: JWT_KEY,
};

export default config;
