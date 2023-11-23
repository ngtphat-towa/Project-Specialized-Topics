import express from "express";
import wishlistController from "../../controllers/basket/wishlist.controller";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import validateToken from "../../middlewares/auth/auth.middleware";
import requireUser from "../../middlewares/auth/validate.middleware";

const WishlistRouter = express.Router();

WishlistRouter.route("/")
  .get(requireUser, wishlistController.getWishlistsByFilter)
  .post(requireUser, wishlistController.createWishlist)
  .delete(requireUser, wishlistController.deleteAllWishlists)
  .all(methodNotAllowed);
WishlistRouter.route("/:id")
  .get(requireUser, wishlistController.getWishlist)
  .put(requireUser, wishlistController.updateWishlist)
  .delete(requireUser, wishlistController.deleteWishlist)
  .all(methodNotAllowed);

export default WishlistRouter;
