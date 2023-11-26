import { NextFunction, Request, Response } from "express";
import {
  IPaginationRequest,
  PaginatedItems,
  PaginationRequestSchema,
} from "../../models/paginated/paginate.model";
import {
  CatalogItem,
  ICatalogItem,
} from "../../models/catalog/items/item.model";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../../models/commons/validate.dto";
import { NotFoundError } from "../../common/err.common";
import { IIdParam, idSchema } from "../../models/commons/id.dto";
import { Type } from "../../models/catalog/type/type.model";
import { Brand } from "../../models/catalog/brand/brand.model";
import { validateAndReturnImage } from "../image.controller";
import {
  ICreateCatalogItem,
  IUpdateCatalogItem,
  createCatalogItemSchema,
  updateCatalogItemSchema,
} from "../../models/catalog/items/item.dto";

const getAllItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query: IPaginationRequest = validateQuery(
      req,
      PaginationRequestSchema
    );
    const items = await CatalogItem.find()
      .populate("catalogType", "name") // only return the 'name' field
      .populate("catalogBrand", "name") // only return the 'name' field
      .skip(query.pageSize * query.pageIndex)
      .limit(query.pageSize);
    const totalItems = await CatalogItem.countDocuments();
    const result = new PaginatedItems(
      query.pageIndex,
      query.pageSize,
      totalItems,
      items
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getItemsByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.query.name;
    const item = await CatalogItem.find({
      name: { $regex: ".*" + name + ".*", $options: "i" },
    })
      .populate("catalogType", "name")
      .populate("catalogBrand", "name")
      .limit(5);
    if (!item) {
      throw new NotFoundError("Item not found!", req.originalUrl);
    }
    return res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

const getItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: IIdParam = validateParams(req, idSchema);
    const item = await CatalogItem.findById(params.id)
      .populate("catalogType", "name")
      .populate("catalogBrand", "name");
    if (!item) {
      throw new NotFoundError("Item not found!", req.originalUrl);
    }
    return res.status(200).json(item);
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
    const typeId = req.params.typeId;
    const brandId = req.params.brandId;
    const items = await CatalogItem.find({
      catalogType: typeId,
      catalogBrand: brandId,
    })
      .populate("catalogType", "name")
      .populate("catalogBrand", "name");
    return res.status(200).json(items);
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
    const brandId = req.params.brandId;
    const items = await CatalogItem.find({ catalogBrand: brandId })
      .populate("catalogType", "name")
      .populate("catalogBrand", "name");
    return res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

const getCatalogTypes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const types = await Type.find().select("_id name");
    return res.status(200).json(types);
  } catch (error) {
    next(error);
  }
};

const getCatalogBrands = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const brands = await Brand.find().select("_id name");
    return res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    var image = (await validateAndReturnImage(req, false))!;
    const body: ICreateCatalogItem = validateBody(req, createCatalogItemSchema);
    const item: ICatalogItem = new CatalogItem({ ...body, image });
    const result = await item.save();
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    var image = await validateAndReturnImage(req, false);
    const params: IIdParam = validateParams(req, idSchema);
    const updateItemData: IUpdateCatalogItem = validateBody(
      req,
      updateCatalogItemSchema
    );
    if (image !== null) {
      updateItemData.image = image;
    }
    const item = await CatalogItem.findByIdAndUpdate(
      params.id,
      updateItemData,
      { new: true }
    )
      .populate("catalogType", "name")
      .populate("catalogBrand", "name");
    if (!item) {
      throw new NotFoundError("Item not found!", req.originalUrl);
    }
    return res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: IIdParam = validateParams(req, idSchema);
    const item = await CatalogItem.findByIdAndDelete(params.id);
    if (!item) {
      throw new NotFoundError("Item not found!", req.originalUrl);
    }
    return res.status(200).json({ message: "Item deleted successfully" });
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
    await CatalogItem.deleteMany({});
    return res.status(200).json({ message: "All items deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllItems,
  getItemsByName,
  getItemById,
  getItemsByBrandAndTypeId,
  getItemsByBrandId,
  getCatalogTypes,
  getCatalogBrands,
  createItem,
  updateItem,
  deleteItem,
  deleteAllItems,
};
