import express from "express";
import AuthRouter from "./auth.router";

const routers = express.Router();

routers.use("/auth", AuthRouter);

export default routers;
