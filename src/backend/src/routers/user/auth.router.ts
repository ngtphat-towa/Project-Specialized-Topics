import express from "express";
import controller from "../../controllers/user/auth.controller";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import requireUser from "../../middlewares/auth/validate.middleware";

const AuthRouter = express.Router();
// Session
AuthRouter.post("/login", controller.createSessionHandler);
AuthRouter.get("/session", requireUser, controller.getSessionHandler);
AuthRouter.delete("/logout", requireUser, controller.deleteSessionHandler);
AuthRouter.route("/").all(methodNotAllowed);

export default AuthRouter;
