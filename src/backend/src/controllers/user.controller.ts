import { NextFunction, Request, Response } from "express";

const getUsersByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getUsersByFilter" });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "getUser" });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "createUser" });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "updateUser" });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "deleteContact" });
  } catch (error) {
    next(error);
  }
};
const deleteAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "deleteAllUser" });
  } catch (error) {
    next(error);
  }
};

export default {
  getUsersByFilter,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
};
