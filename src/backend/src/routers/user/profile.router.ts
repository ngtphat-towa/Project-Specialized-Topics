import express from "express";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import profileController from "../../controllers/user/profile.controller";

const ProfileRouter = express.Router();

ProfileRouter.post("/", profileController.createProfile);
ProfileRouter.get("/", profileController.getProfilesByFilter);
ProfileRouter.get("/:id", profileController.getProfile);
ProfileRouter.put("/:id", profileController.updateProfile);
ProfileRouter.delete("/:id", profileController.deleteProfile);
ProfileRouter.all("/", methodNotAllowed);

export default ProfileRouter;
