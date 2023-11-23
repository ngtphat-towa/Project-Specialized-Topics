import { NextFunction, Request, Response } from "express";

const getCartsByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getCartsByFilter" });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "getCart" });
  } catch (error) {
    next(error);
  }
};

const createCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "createCart" });
  } catch (error) {
    next(error);
  }
};

const updateCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "updateCart" });
  } catch (error) {
    next(error);
  }
};

const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "deleteContact" });
  } catch (error) {
    next(error);
  }
};
const deleteAllCarts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "deleteAllCart" });
  } catch (error) {
    next(error);
  }
};

export default {
  getCartsByFilter,
  getCart,
  createCart,
  updateCart,
  deleteCart,
  deleteAllCarts,
};
