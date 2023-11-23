import { NextFunction, Request, Response } from "express";
import {
  ICreateUserProfile,
  IQueryUser,
  IUpdateUserProfile,
  createUserProfileSchema,
  queryUserSchema,
  updateUserProfileSchema,
} from "../../models/auth/profile/user.profile.dto";
import { validateBody, validateQuery } from "../../models/commons/validate.dto";
import { UserProfile } from "../../models/auth/profile/user.profile.model";
import {
  IPaginationRequest,
  PaginatedItems,
  PaginationRequestSchema,
} from "../../models/paginated/paginate.model";

const getAllUserProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pagination: IPaginationRequest = validateQuery(
      req,
      PaginationRequestSchema
    );
    let filter: IQueryUser = validateBody(req, queryUserSchema);

    let regexFilter: Record<string, any> = {};
     for (let key in filter) {
       if (filter[key]) {
         regexFilter[key] = { $regex: new RegExp(filter[key], "i") };
       }
     }

    const data = await UserProfile.find(filter)
      .populate("userAccount", "email username")
      .skip(pagination.pageIndex * pagination.pageSize)
      .limit(pagination.pageSize);

    const count = await UserProfile.countDocuments(filter).populate(
      "userAccount",
      "email username"
    );
    const result = new PaginatedItems(
      pagination.pageIndex,
      pagination.pageSize,
      count,
      data
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await UserProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).send();
    }
    return res.status(200).json(profile);
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
    const newUser: ICreateUserProfile = validateBody(
      req,
      createUserProfileSchema
    );
    const user = new UserProfile(newUser);
    await user.save();
    return res.status(201).send(user);
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
    const updates: IUpdateUserProfile = validateBody(
      req,
      updateUserProfileSchema
    );
    const user = await UserProfile.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    Object.keys(updates).forEach((update) => (user[update] = updates[update]));
    await user.save();
    return res.send(user);
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
    const user = await UserProfile.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    return res.status(200).send(user);
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
    await UserProfile.deleteMany({});
    return res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUserProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  deleteAllProfiles,
};
