import { NextFunction, Request, Response } from "express";

const getProfilesByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "getProfilesByFilter" });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(200).json({ message: "getProfile" });
  } catch (error) {
    next(error);
  }
};

const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "createProfile" });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "updateProfile" });
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (
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
const deleteAllProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "deleteAllProfile" });
  } catch (error) {
    next(error);
  }
};

export default {
  getProfilesByFilter,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  deleteAllProfiles,
};
