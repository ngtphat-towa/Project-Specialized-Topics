import { NextFunction, Request, Response } from "express";

const getWishlistsByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getWishlistsByFilter" });
  } catch (error) {
    next(error);
  }
};

const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "getWishlist" });
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
    return res.status(200).json({ message: "createWishlist" });
  } catch (error) {
    next(error);
  }
};

const updateWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getAll" });
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
    return res.status(200).json({ message: "deleteContact" });
  } catch (error) {
    next(error);
  }
};
const deleteAllWishlists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "deleteAllWishlist" });
  } catch (error) {
    next(error);
  }
};

export default {
  getWishlistsByFilter,
  getWishlist,
  createWishlist,
  updateWishlist,
  deleteWishlist,
  deleteAllWishlists,
};
