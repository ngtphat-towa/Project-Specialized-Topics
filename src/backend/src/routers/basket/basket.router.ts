import express from "express";
import basketController from "../../controllers/basket/basket.controller";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import validateToken from "../../middlewares/auth/auth.middleware";
import requireUser, {
  requireUserData,
} from "../../middlewares/auth/validate.middleware";

const BasketRouter = express.Router();

BasketRouter.post(
  "/items/:id",
  requireUserData,
  basketController.createBasketItem
);
BasketRouter.put(
  "/items/:id",
  requireUserData,
  basketController.updateBasketItem
);
BasketRouter.delete(
  "/items/:id",
  requireUserData,
  basketController.deleteBasketItem
);

// route("/")
BasketRouter.get("/", requireUserData, basketController.getBasketByUserId);
BasketRouter.post("/", requireUserData, basketController.createBasket);
BasketRouter.delete("/", requireUserData, basketController.deleteBasket);
BasketRouter.all("/", methodNotAllowed);

export default BasketRouter;
