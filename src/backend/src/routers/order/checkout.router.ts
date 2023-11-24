import express from "express";
import checkoutController from "../../controllers/order/checkout.controller";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import { requireUserData } from "../../middlewares/auth/validate.middleware";

const CheckoutRouter = express.Router();

CheckoutRouter.post(
  "/create-checkout-session",
  requireUserData,
  checkoutController.createCheckoutSession
);

CheckoutRouter.post(
  "/place-order",
  requireUserData,
  checkoutController.placeOrder
);
CheckoutRouter.all("/", methodNotAllowed);

export default CheckoutRouter;
