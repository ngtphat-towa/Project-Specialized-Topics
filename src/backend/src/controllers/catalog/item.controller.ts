import { NextFunction, Request, Response } from "express";

const getAllItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "getAllItems" });
  } catch (error) {
    next(error);
  }
};
const getItemsByBrandAndTypeId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getItemsByBrandAndTypeId" });
  } catch (error) {
    next(error);
  }
};
const getCatlogTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getCatlogTypes" });
  } catch (error) {
    next(error);
  }
};
const getCatlogBrands = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getCatlogBrands" });
  } catch (error) {
    next(error);
  }
};
const getItemsByBrandId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getItemsByBrandId" });
  } catch (error) {
    next(error);
  }
};
const getItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "getItemById" });
  } catch (error) {
    next(error);
  }
};
const getItemByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getItemByName" });
  } catch (error) {
    next(error);
  }
};

const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "createItem" });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "updateItem" });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "deleteItem" });
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
  getAllItems,
  getItemById,
  getItemByName,
  getItemsByBrandAndTypeId,
  getItemsByBrandId,
  createItem,
  updateItem,
  deleteItem,
  deleteAllItems,
  getCatlogTypes,
  getCatlogBrands,
};
