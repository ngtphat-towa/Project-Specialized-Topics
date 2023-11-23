import express from "express";

import accountController from "../../controllers/user/account.controller";
import requireUser from "../../middlewares/auth/validate.middleware";

const AccountRouter = express.Router();

// Create account route
AccountRouter.post("/", accountController.createAccount);

// Update account route
AccountRouter.put("/:id", requireUser, accountController.updateAccount);

export default AccountRouter;
