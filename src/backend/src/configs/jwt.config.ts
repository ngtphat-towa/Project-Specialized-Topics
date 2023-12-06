import dotenv, { config } from "dotenv";

dotenv.config();
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const PUBLIC_KEY = process.env.PUBLIC_KEY || "";
const ACCESS_TOKEN_EXPIRETIME = process.env.ACCESS_TOKEN_EXPIRETIME || "";
const REFRESH_TOKEN_EXPIRETIME = process.env.REFRESH_TOKEN_EXPIRETIME || "";

export const JWT_KEY = {
  privateKey: PRIVATE_KEY,
  publicKey: PUBLIC_KEY,
  accessTokenExpireTime: ACCESS_TOKEN_EXPIRETIME,
  refreshTokenExpireTime: REFRESH_TOKEN_EXPIRETIME,
};
