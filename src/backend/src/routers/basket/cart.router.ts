import express from "express";
import cartController from "../../controllers/basket/cart.controller";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import validateToken from "../../middlewares/auth/auth.middleware";

const CartRouter = express.Router();

CartRouter.route("/")
  .get(cartController.getCartsByFilter)
  .post(cartController.createCart)
  .delete(cartController.deleteAllCarts)
  .all(methodNotAllowed);
CartRouter.route("/:id")
  .get(cartController.getCart)
  .put(cartController.updateCart)
  .delete(cartController.deleteCart)
  .all(methodNotAllowed);

export default CartRouter;
