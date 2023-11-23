import express from "express";
import orderController from "../../controllers/order/order.controller";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import validateToken from "../../middlewares/auth/auth.middleware";
import requireUser from "../../middlewares/auth/validate.middleware";

const OrderRouter = express.Router();

OrderRouter.route("/")
  .get(requireUser, orderController.getOrders)
  .post(requireUser, orderController.createOrder)
  .delete(requireUser, orderController.deleteAllOrders)
  .all(methodNotAllowed);

OrderRouter.route("/:id")
  .get(requireUser, orderController.getOrderItems)
  .put(requireUser, orderController.saveOrderItems)
  .delete(requireUser, orderController.deleteOrder)
  .all(methodNotAllowed);

export default OrderRouter;
