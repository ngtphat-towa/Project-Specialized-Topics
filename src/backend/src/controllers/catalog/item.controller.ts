import { NextFunction, Request, Response } from "express";

const getItemsByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getItemsByFilter" });
  } catch (error) {
    next(error);
  }
};

const getItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "getItem" });
  } catch (error) {
    next(error);
  }
};

const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "createItem" });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (
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

const deleteItem = async (
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
const deleteAllItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "deleteAllItem" });
  } catch (error) {
    next(error);
  }
};

export default {
  getItemsByFilter,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  deleteAllItems,
};
