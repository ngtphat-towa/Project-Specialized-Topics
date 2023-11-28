import { NextFunction, Request, Response } from "express";
import {
  IIdParam,
  IUserId,
  idSchema,
  userIdSchema,
} from "../../models/commons/id.dto";
import {
  validateBody,
  validateHeaders,
  validateParams,
} from "../../models/commons/validate.dto";
import {
  ICreateCustomWishlist,
  ICreateWishlistItem,
  IGetWishlistByUserId,
  createCustomWishlistSchema,
  createWishlistItemSchema,
  getWishlistByUserIdSchema,
} from "../../models/basket/wishlist/wishlist.dto";
import { CustomerWishlist } from "../../models/basket/wishlist/wishlist.model";
import { ConflictError, NotFoundError } from "../../common/err.common";
import { WishlistItem } from "../../models/basket/wishlist/wishlist.item.model";

const getWishlistByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params: IIdParam = validateParams(req, idSchema);
    const getWishlistByUser: IGetWishlistByUserId = validateBody(
      req,
      getWishlistByUserIdSchema
    );

    // check if the basket exist
    const existingWishlist = await CustomerWishlist.findOne({
      $or: [{ id: params.id }, { userId: getWishlistByUser.userId }],
    });

    if (!existingWishlist) {
      throw new NotFoundError("Basket not found", req.originalUrl);
    }
    return res.status(200).json(existingWishlist);
  } catch (error) {
    next(error);
  }
};

const createWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params: IIdParam = validateParams(req, idSchema);
    const createCustomWishlist: ICreateCustomWishlist = validateBody(
      req,
      createCustomWishlistSchema
    );

    // check if the basket exist
    const existingWishlist = await CustomerWishlist.findOne({
      $or: [{ id: params.id }, { userId: createCustomWishlist.userId }],
    });

    if (existingWishlist) {
      throw new ConflictError(
        "Wishlist already exists for this user",
        req.originalUrl
      );
    }

    const newWishlist = new CustomerWishlist(createCustomWishlist);
    const result = await newWishlist.save();

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
const addWishlistItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request data
    const params: IIdParam = validateParams(req, idSchema);
    const createWishlistItem: ICreateWishlistItem = validateBody(
      req,
      createWishlistItemSchema
    );

    // Check if the wishlist exists
    let existingWishlist = await CustomerWishlist.findOne({
      $or: [{ id: params.id }, { userId: createWishlistItem.userId }],
    });

    if (!existingWishlist) {
      const newWishlist = new CustomerWishlist({
        userId: createWishlistItem.userId,
        items: [],
      });
      existingWishlist = await newWishlist.save();
    }

    // Check if the item already exists in the wishlist
    const existingItem = existingWishlist.items.find(
      (item) => item.productId === createWishlistItem.productId
    );

    if (existingItem) {
      // If the item exists, update api error
      throw new ConflictError(
        "The wishlist item already exists",
        req.originalUrl
      );
    } else {
      // If the item doesn't exist, create a new item and add it to the wishlist
      const wishlistItem = new WishlistItem(createWishlistItem);
      existingWishlist.items.push(wishlistItem);
    }

    await existingWishlist.save();

    return res.status(200).json(existingWishlist);
  } catch (error) {
    next(error);
  }
};

const deleteWishlistItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUserId = validateBody(req, userIdSchema);
    const productId = req.params.id;

    const existingWishlist = await CustomerWishlist.findOne({
      userId: user.userId,
    });

    if (!existingWishlist) {
      throw new NotFoundError("Wishlist not found", req.originalUrl);
    }

    const itemIndex = existingWishlist.items.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex === -1) {
      throw new NotFoundError("Wishlist item not found", req.originalUrl);
    }

    existingWishlist.items.splice(itemIndex, 1);
    await existingWishlist.save();

    return res.status(200).json({
      data: existingWishlist,
      message: "Wishlist item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;

    const result = await CustomerWishlist.findOneAndDelete({ userId: userId });

    if (!result) {
      throw new NotFoundError("Wishlist not found", req.originalUrl);
    }

    return res.status(200).json({
      data: result,
      message: "All wishlists for the user deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getWishlistByUserId,
  addWishlistItem,
  createWishlist,
  deleteWishlist,
  deleteWishlistItem,
};
