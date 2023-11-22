import express from "express";
import cors from "cors";
import http from "http";
import config from "./configs/config";
import samples from "./controllers/samples";
import errorController from "./controllers/error.controller";
import loggerMiddleware from "./middlewares/utils/logger.middleware";
import logging from "./configs/logging";
import mongoose from "mongoose";
import routers from "./routers/routers";
import { resourceNotFound } from "./middlewares/utils/error.middleware";
import path from "path";
import { requireUser } from "./middlewares/session/user.require.middleware";
import {
  createSessionHandler,
  deleteSessionHandler,
  getSessionHandler,
} from "./controllers/session.controller";
import cookieParser from "cookie-parser";
import deserializeUser from "./middlewares/session/deserialize.user.middleware";

// Declare  server
const server = express();
const PORT = config.server.port;
const NAMESPACE = "SERVER";
// Set config middlewares
server.use(cookieParser());
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
  // login

  server.get("/ping", samples.serverHealthCheck);

  // This will logger the request
  server.use(loggerMiddleware.apiRequestLogger);

  server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  server.use("/api", routers);

  server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  server.post("/api/session", createSessionHandler);
  // get the current session
  server.use(deserializeUser);
  server.get("/api/session", requireUser, getSessionHandler);
  // logout
  server.delete("/api/session", requireUser, deleteSessionHandler);

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
