import express from "express";
import wishlistController from "../controllers/wishlist.controller";
import { methodNotAllowed } from "../middlewares/error.middleware";
import validateToken from "../middlewares/auth.middleware";

const WishlistRouter = express.Router();

WishlistRouter.route("/")
  .get(wishlistController.getWishlistsByFilter)
  .post(wishlistController.createWishlist)
  .delete(wishlistController.deleteAllWishlists)
  .all(methodNotAllowed);
WishlistRouter.route("/:id")
  .get(wishlistController.getWishlist)
  .put(wishlistController.updateWishlist)
  .delete(wishlistController.deleteWishlist)
  .all(methodNotAllowed);

export default WishlistRouter;