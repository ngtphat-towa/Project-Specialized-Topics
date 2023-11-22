import dotenv, { config } from "dotenv";

dotenv.config();
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const PUBLIC_KEY = process.env.PUBLIC_KEY || "";

export const JWT_KEY = {
  privateKey: PRIVATE_KEY,
  publicKey: PUBLIC_KEY,
};
