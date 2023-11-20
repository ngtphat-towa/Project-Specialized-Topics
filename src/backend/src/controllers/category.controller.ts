import { NextFunction, Request, Response } from "express";
import { Category, ICategory } from "../models/category/category.model";
import path from "path";
import fs from "fs";
import logging from "../configs/logging";
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
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }
    var img = fs.readFileSync(path.join(__dirname, "..", "..", req.file.path));
    var encode_img = img.toString("base64");
    var image = {
      contentType: req.file.mimetype,
      data: Buffer.from(encode_img, "base64"),
    };

    const category: ICategory = new Category({
      name: req.body.name,
      description: req.body.description,
      image,
    });
    const result = await category.save();

    fs.unlink(req.file.path, (err) => {
      if (err) {
        logging.error("IMAGE FILE",`Failed to delete file: ${err}`);
      } else {
        logging.debug("IMAGE FILE", `Deleted file: ${req?.file?.path}`);
      }
    });
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
