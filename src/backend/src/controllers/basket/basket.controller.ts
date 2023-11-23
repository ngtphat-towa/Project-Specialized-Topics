import { NextFunction, Request, Response } from "express";

const getBasketByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getBasketByUserId" });
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
const createBasket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    return res.status(200).json({ message: "createBasket", userId: userId });
  } catch (error) {
    next(error);
  }
};

const createBasketItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    


  } catch (error) {
    next(error);
  }
};

const updateBasketItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "updateBasketItem" });
  } catch (error) {
    next(error);
  }
};

const deleteBasket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "deleteBasket" });
  } catch (error) {
    next(error);
  }
};
const deleteBasketItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "deleteBasketItem" });
  } catch (error) {
    next(error);
  }
};

export default {
  getBasketByUserId,
  getCart,
  createBasket,
  createBasketItem,
  updateBasketItem,
  deleteBasket,
  deleteBasketItem,
};
