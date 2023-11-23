import { NextFunction, Request, Response } from "express";
import {
  ICreateUserAccount,
  IUpdateUserAccount,
  createUserAccountSchema,
  updateUserAccountSchema,
} from "../../models/auth/account/user.account.dto";
import { validateBody } from "../../models/commons/validate.dto";
import { UserAccount } from "../../models/auth/account/user.account.model";

const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser: ICreateUserAccount = validateBody(
      req,
      createUserAccountSchema
    );

    const user = new UserAccount(newUser);
    await user.save();

    return res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

const updateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updates: IUpdateUserAccount = validateBody(
      req,
      updateUserAccountSchema
    );

    const user = await UserAccount.findById(req.params.id);
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

export default {
  createAccount,
  updateAccount,
};
