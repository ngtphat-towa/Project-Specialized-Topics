import express from "express";

import accountController from "../../controllers/user/account.controller";

const AccountRouter = express.Router();

// Create account route
AccountRouter.post("/", accountController.createAccount);

// Update account route
AccountRouter.put("/:id", accountController.updateAccount);

export default AccountRouter;
