import dotenv from "dotenv";

dotenv.config();

const MONGO_OPTIONS = {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  // useNewUrlParser: true,
};

// const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
// const MONGO_PASSWORD = process.env.MONGO_USERNAME || "";
const MONGO_HOST = process.env.MONGO_URL || `localhost`;
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "elFoture";

export const MONGO_DB = {
  host: MONGO_HOST,
  port: MONGO_PORT,
  options: MONGO_OPTIONS,
  url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`,
  // password: MONGO_PASSWORD,
  // username: MONGO_USERNAME,
  // url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/:`,
};
