import { NextFunction, Request, Response } from "express";
import { Brand, IBrand } from "../models/brand/brand.model";
import {
  ICreateBrand,
  IFindBrands,
  IUpdateBrand,
  createBrandSchema,
  findBrandsSchema,
  updateBrandSchema,
} from "../models/brand/brand.dto";
import { IIdParam, idSchema } from "../models/commons/id.dto";
import { validateBody, validateParams } from "../models/commons/validate.dto";
import { validateAndReturnImage } from "./image.controller";
import { NotFoundError } from "../common/err.common";

const getBrandsByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query: IFindBrands = validateBody(req, findBrandsSchema);
    const brands = await Brand.find(query);
    return res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

const getBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: IIdParam = validateParams(req, idSchema);
    const brand = await Brand.findById(params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    return res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};

const createBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    var image = validateAndReturnImage(req);
    const body: ICreateBrand = validateBody(req, createBrandSchema);
    const brand: IBrand = new Brand({
      ...body,
      image,
    });
    const result = await brand.save();

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    var image = validateAndReturnImage(req);
    const params: IIdParam = validateParams(req, idSchema);
    const body: IUpdateBrand = validateBody(req, updateBrandSchema);

    const updateBrandData: IUpdateBrand = { ...body, image };

    const brand = await Brand.findByIdAndUpdate(params.id, updateBrandData, {
      new: true,
    });
    if (!brand) {
      throw new NotFoundError("Brand not found!", req.path);
    }
    return res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};

const deleteBrand = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: IIdParam = validateParams(req, idSchema);
    const brand = await Brand.findByIdAndDelete(params.id);
    if (!brand) {
      throw new NotFoundError("Brand not found!", req.path);
    }
    return res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  getBrandsByFilter,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
