import dotenv from "dotenv";

dotenv.config();
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 3000;

export const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT ?? 3000,
};

export const CLIENT = {
  baseUrl: process.env.BASE_URL || "",
};
