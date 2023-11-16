import express from "express";
import orderController from "../controllers/order.controller";
import { methodNotAllowed } from "../middlewares/error.middleware";
import validateToken from "../middlewares/auth.middleware";

const OrderRouter = express.Router();

OrderRouter.route("/")
  .get(orderController.getOrders)
  .post(orderController.createOrder)
  .delete(orderController.deleteAllOrders)
  .all(methodNotAllowed);

OrderRouter.route("/:id")
  .get(orderController.getOrderItems)
  .put(orderController.saveOrderItems)
  .delete(orderController.deleteOrder)
  .all(methodNotAllowed);

export default OrderRouter;
