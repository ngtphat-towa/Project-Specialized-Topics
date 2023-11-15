import express from "express";
import controller from "../controllers/auth.controller";
const AuthRouter = express.Router();

AuthRouter.route("/register").post(controller.register);

AuthRouter.route("/login").post(controller.login);

AuthRouter.route("/logout").post(controller.logout);

export default AuthRouter;
