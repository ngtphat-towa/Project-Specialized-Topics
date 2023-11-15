import express from "express";
import cors from "cors";
import http from "http";
import config from "./configs/config";
import samples from "./controllers/samples";
import errorController from "./controllers/error.controller";

// Declare  server
const server = express();
const PORT = config.server.port;
// Set config middlewares
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Define function to start server
const StartServer = () => {
  server.get("/ping", samples.serverHealthCheck);

  // Handle error
  server.use(errorController.handleError);

  // Server listenning
  http
    .createServer(server)
    .listen(PORT, () =>
      console.info(`Server is running at http://localhost:${PORT}/ping`)
    );
};

StartServer();
