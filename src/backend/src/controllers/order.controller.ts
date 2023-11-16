import { NextFunction, Request, Response } from "express";

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "getOrders" });
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "getOrders" });
  } catch (error) {
    next(error);
  }
};

const getOrderItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getOrderItems" });
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "createOrder" });
  } catch (error) {
    next(error);
  }
};

const saveOrderItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "saveOrderItems" });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "deleteContact" });
  } catch (error) {
    next(error);
  }
};
const deleteAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "deleteAllOrder" });
  } catch (error) {
    next(error);
  }
};

export default {
  getOrders,
  getOrderItems,
  createOrder,
  saveOrderItems,
  deleteOrder,
  deleteAllOrders,
};
