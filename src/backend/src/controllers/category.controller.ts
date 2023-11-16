import { NextFunction, Request, Response } from "express";
import { Category, ICategory } from "../models/category.model";

const getCategoriesByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find(req.query);
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(category);
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
    const category: ICategory = new Category(req.body);
    const result = await category.save();
    return res.status(201).json(result);
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
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json(category);
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
