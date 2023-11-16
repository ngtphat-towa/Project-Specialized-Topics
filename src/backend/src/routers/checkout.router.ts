import express from "express";
import checkoutController from "../controllers/checkout.controller";
import { methodNotAllowed } from "../middlewares/error.middleware";
import validateToken from "../middlewares/auth.middleware";

const CheckoutRouter = express.Router();

CheckoutRouter.route("/create-checkout-session")
  .post(checkoutController.createCheckoutSession)
  .all(methodNotAllowed);

export default CheckoutRouter;
