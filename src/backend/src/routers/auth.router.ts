import express from "express";
import controller from "../controllers/auth.controller";
import errorController from "../controllers/error.controller";
const AuthRouter = express.Router();

AuthRouter.post("/register", controller.register)
  .post("/login", controller.login)
  .post("/logout", controller.logout);
AuthRouter.route("/").all(errorController.methodNotAllowed);

export default AuthRouter;
