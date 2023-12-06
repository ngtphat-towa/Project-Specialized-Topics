import express from "express";
import orderController from "../../controllers/order/order.controller";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import requireUser, {
  requireAdmin,
  requireUserData,
} from "../../middlewares/auth/validate.middleware";

const OrderRouter = express.Router();

// GET routes
OrderRouter.get("/", requireUserData, orderController.getOrderByUser);
OrderRouter.get("/admin/all", requireAdmin, orderController.getAllOrders);
OrderRouter.get(
  "/item/:id",
  requireUserData,
  orderController.getOrderByOrderId
);

// PUT routes
OrderRouter.put(
  "/update/:id",
  requireUserData,
  orderController.updateCustomerShippingInfo
);
OrderRouter.put(
  "/admin/update/:id",
  requireAdmin,
  orderController.updateCustomerOrder
);
OrderRouter.put(
  "/admin/update/status/:id",
  requireAdmin,
  orderController.updateOrderStatus
);

// DELETE routes
OrderRouter.delete("/:id", requireUser, orderController.deleteOrder);

// Method not allowed routes
OrderRouter.all("/:id", methodNotAllowed);
OrderRouter.all("/", methodNotAllowed);

export default OrderRouter;
