import { NextFunction, Request, Response } from "express";
import { Type, IType } from "../../models/catalog/type/type.model";

import {
  ICreateType,
  IFindTypes,
  IUpdateType,
  createTypeSchema,
  findTypesSchema,
  updateTypeSchema,
} from "../../models/catalog/type/type.dto";
import { BadRequestError, NotFoundError } from "../../common/err.common";
import { IIdParam, idSchema } from "../../models/commons/id.dto";
import {
  validateBody,
  validateParams,
} from "../../models/commons/validate.dto";
import { validateAndReturnImage } from "../image.controller";
const getTypesByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query: IFindTypes = validateBody(req, findTypesSchema);
    const categories = await Type.find(query);
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const getType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: IIdParam = validateParams(req, idSchema);
    const type = await Type.findById(params.id);
    if (!type) {
      return res.status(404).json({ message: "Type not found" });
    }
    return res.status(200).json(type);
  } catch (error) {
    next(error);
  }
};

const createType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    var image =await validateAndReturnImage(req);
    const body: ICreateType = validateBody(req, createTypeSchema);
    const type: IType = new Type({
      ...body,
      image,
    });
    const result = await type.save();

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    var image = await validateAndReturnImage(req, false);
    const params: IIdParam = validateParams(req, idSchema);
    const updateTypeData: IUpdateType = validateBody(req, updateTypeSchema);

    if (image !== null) {
      updateTypeData.image = image;
    }

    const type = await Type.findByIdAndUpdate(params.id, updateTypeData, {
      new: true,
    });
    if (!type) {
      throw new NotFoundError("Type not found!", req.path);
    }
    return res.status(200).json(type);
  } catch (error) {
    next(error);
  }
};
const deleteType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: IIdParam = validateParams(req, idSchema);
    const type = await Type.findByIdAndDelete(params.id);
    if (!type) {
      throw new NotFoundError("Type not found!", req.path);
    }
    return res.status(200).json({ message: "Type deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  getTypesByFilter,
  getType,
  createType,
  updateType,
  deleteType,
};
