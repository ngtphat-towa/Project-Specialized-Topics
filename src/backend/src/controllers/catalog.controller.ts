import { NextFunction, Request, Response } from "express";

const getCatalogsByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getCatalogsByFilter" });
  } catch (error) {
    next(error);
  }
};

const getCatalog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "getCatalog" });
  } catch (error) {
    next(error);
  }
};

const createCatalog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "createCatalog" });
  } catch (error) {
    next(error);
  }
};

const updateCatalog = async (
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

const deleteCatalog = async (
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
const deleteAllCatalogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "deleteAllCatalog" });
  } catch (error) {
    next(error);
  }
};

export default {
  getCatalogsByFilter,
  getCatalog,
  createCatalog,
  updateCatalog,
  deleteCatalog,
  deleteAllCatalogs,
};
