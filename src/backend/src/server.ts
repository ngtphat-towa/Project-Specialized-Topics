import express from "express";
import cors from "cors";
import http from "http";
import config from "./configs/config";
import samples from "./controllers/samples";
import errorController from "./controllers/error.controller";
import loggerMiddleware from "./middlewares/logger.middleware";
import logging from "./configs/logging";
import mongoose from "mongoose";
import routers from "./routers/routers";
import { resourceNotFound } from "./middlewares/common.middleware";

// Declare  server
const server = express();
const PORT = config.server.port;
const NAMESPACE = "SERVER";
// Set config middlewares
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info(NAMESPACE, "Mongo Connected");
    StartServer();
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error);
  });

// Define function to start server
const StartServer = () => {
  server.get("/ping", samples.serverHealthCheck);

  // This will logger the request
  server.use(loggerMiddleware.apiRequestLogger);

  server.use("/api", routers);

  /// Handle errors
  // Apply the "Resource Not Found" middleware
  server.use(resourceNotFound);

  // Apply the error handling middleware
  server.use(errorController.handleError);

  // Server listenning
  http
    .createServer(server)
    .listen(PORT, () =>
      logging.info(NAMESPACE, `running at http://localhost:${PORT}/ping`)
    );
};
// StartServer();
