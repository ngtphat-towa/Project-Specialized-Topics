import express from "express";
import wishlistController from "../../controllers/basket/wishlist.controller";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import { requireUserData } from "../../middlewares/auth/validate.middleware";

const WishlistRouter = express.Router();

WishlistRouter.post(
  "/items",
  requireUserData,
  wishlistController.addWishlistItem
);

WishlistRouter.delete(
  "/:id",
  requireUserData,
  wishlistController.deleteWishlistItem
);
WishlistRouter.get(
  "/",
  requireUserData,
  wishlistController.getWishlistByUserId
);
WishlistRouter.post("/", requireUserData, wishlistController.createWishlist);
WishlistRouter.delete("/", requireUserData, wishlistController.deleteWishlist);
WishlistRouter.all("/", methodNotAllowed);

export default WishlistRouter;
