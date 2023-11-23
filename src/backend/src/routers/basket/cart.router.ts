import express from "express";
import cartController from "../../controllers/basket/cart.controller";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import validateToken from "../../middlewares/auth/auth.middleware";
import requireUser from "../../middlewares/auth/validate.middleware";

const CartRouter = express.Router();

CartRouter.route("/")
  .get(requireUser, cartController.getCartsByFilter)
  .post(requireUser, cartController.createCart)
  .delete(requireUser, cartController.deleteAllCarts)
  .all(methodNotAllowed);

CartRouter.route("/:id")
  .get(requireUser, cartController.getCart)
  .put(requireUser, cartController.updateCart)
  .delete(requireUser, cartController.deleteCart)
  .all(methodNotAllowed);

export default CartRouter;
