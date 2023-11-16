import { NextFunction, Request, Response } from "express";

const getProductsByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getProductsByFilter" });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "getProduct" });
  } catch (error) {
    next(error);
  }
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "createProduct" });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (
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

const deleteProduct = async (
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
const deleteAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "deleteAllProduct" });
  } catch (error) {
    next(error);
  }
};

export default {
  getProductsByFilter,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};
