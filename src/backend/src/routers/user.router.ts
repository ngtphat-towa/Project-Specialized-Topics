import express from "express";
import userController from "../controllers/user/user.controller";
import { methodNotAllowed } from "../middlewares/utils/error.middleware";
import validateToken from "../middlewares/auth/auth.middleware";

const UserRouter = express.Router();

UserRouter.route("/")
  .get(userController.getUsersByFilter)
  .post(userController.createUser)
  .delete(userController.deleteAllUsers)
  .all(methodNotAllowed);
UserRouter.route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)
  .all(methodNotAllowed);

export default UserRouter;
