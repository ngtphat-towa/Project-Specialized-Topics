import express from "express";
import cartController from "../controllers/cart.controller";
import { methodNotAllowed } from "../middlewares/common.middleware";
import validateToken from "../middlewares/auth.middleware";

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
