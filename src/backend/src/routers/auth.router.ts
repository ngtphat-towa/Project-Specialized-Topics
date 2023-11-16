import express from "express";
import controller from "../controllers/auth.controller";
import { methodNotAllowed } from "../middlewares/error.middleware";
const AuthRouter = express.Router();

AuthRouter.post("/register", controller.register)
  .post("/login", controller.login)
  .post("/logout", controller.logout);
AuthRouter.route("/").all(methodNotAllowed);

export default AuthRouter;
