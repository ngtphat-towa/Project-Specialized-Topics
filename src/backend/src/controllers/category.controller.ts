import { NextFunction, Request, Response } from "express";

const getCategoriesByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getCategoriesByFilter" });
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "getCategory" });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "createCategory" });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (
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

export default {
  getCategoriesByFilter,
  getCategory,
  createCategory,
  updateCategory,
};
