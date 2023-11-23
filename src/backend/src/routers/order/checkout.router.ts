import express from "express";
import checkoutController from "../../controllers/order/checkout.controller";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import validateToken from "../../middlewares/auth/auth.middleware";

const CheckoutRouter = express.Router();

CheckoutRouter.route("/create-checkout-session")
  .post(checkoutController.createCheckoutSession)
  .all(methodNotAllowed);

export default CheckoutRouter;
