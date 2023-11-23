import express from "express";
import {
  ICreateUserAccount,
  IUpdateUserAccount,
  createUserAccountSchema,
  updateUserAccountSchema,
} from "../../models/auth/account/user.account.dto";
import { validateBody } from "../../models/commons/validate.dto";
import { UserAccount } from "../../models/auth/account/user.account.model";

const AccountRouter = express.Router();

// Create account route
AccountRouter.post("/", async (req, res, next) => {
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
});

// Update account route
AccountRouter.put("/:id", async (req, res, next) => {
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
});

export default AccountRouter;
