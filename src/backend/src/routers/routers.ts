import express from "express";
import AuthRouter from "./auth.router";
import errorController from "../controllers/error.controller";

const routers = express.Router();

routers.use("/auth", AuthRouter);

routers.use(errorController.methodNotAllowed);
export default routers;
