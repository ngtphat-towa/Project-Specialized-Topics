import { NextFunction, Request, Response } from "express";
import { Category, ICategory } from "../models/category/category.model";
import path from "path";
import fs from "fs";
import logging from "../configs/logging";

import {
  ICreateCategory,
  IFindCategories,
  IUpdateCategory,
  createCategorySchema,
  findCategoriesSchema,
  updateCategorySchema,
} from "../models/category/category.dto";
import { BadRequestError, NotFoundError } from "../common/err.common";
import { IIdParam, idSchema } from "../models/commons/id.dto";
import { validateBody, validateParams } from "../models/commons/validate.dto";
const getCategoriesByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query: IFindCategories = validateBody(req, findCategoriesSchema);
    const categories = await Category.find(query);
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: IIdParam = validateParams(req, idSchema);
    const category = await Category.findById(params.id);
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
    var image = validateAndReturnImage(req);
    const body: ICreateCategory = validateBody(req, createCategorySchema);
    const category: ICategory = new Category({
      ...body,
      image,
    });
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
    var image = validateAndReturnImage(req);
    const params: IIdParam = validateParams(req, idSchema);
    const body: IUpdateCategory = validateBody(req, updateCategorySchema);

    const updateCategoryData: IUpdateCategory = { ...body, image };

    const category = await Category.findByIdAndUpdate(
      params.id,
      updateCategoryData,
      {
        new: true,
      }
    );
    if (!category) {
      throw new NotFoundError("Category not found!", req.path);
    }
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params: IIdParam = validateParams(req, idSchema);
    const category = await Category.findByIdAndDelete(params.id);
    if (!category) {
      throw new NotFoundError("Category not found!", req.path);
    }
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

function validateAndReturnImage(req: Request): {
  data: Buffer;
  contentType: String;
} {
  if (!req.file) {
    throw new BadRequestError("No file provided", req.url);
  }

  const img = fs.readFileSync(path.join(__dirname, "..", "..", req.file.path));
  const encode_img = img.toString("base64");
  const data = Buffer.from(encode_img, "base64");

  var image = {
    data: data,
    contentType: req.file.mimetype,
  };

  fs.unlink(req.file.path, (err) => {
    if (err) {
      logging.error("IMAGE FILE", `Failed to delete file: ${err}`);
    } else {
      logging.debug("IMAGE FILE", `Deleted file: ${req?.file?.path}`);
    }
  });
  return image;
}

function deleteImage(filePath: string): void {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Failed to delete file: ${err}`);
    } else {
      console.log(`Deleted file: ${filePath}`);
    }
  });
}

export default {
  getCategoriesByFilter,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
