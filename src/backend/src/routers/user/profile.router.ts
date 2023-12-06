import express from "express";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import profileController from "../../controllers/user/profile.controller";
import requireUser, {
  requireAdmin,
} from "../../middlewares/auth/validate.middleware";

const ProfileRouter = express.Router();

ProfileRouter.post("/", requireUser, profileController.createProfile);
ProfileRouter.get("/", requireAdmin, profileController.getAllUserProfiles);
ProfileRouter.get("/:id", requireUser, profileController.getProfile);
ProfileRouter.put("/:id", requireUser, profileController.updateProfile);
ProfileRouter.delete("/:id", requireUser, profileController.deleteProfile);
ProfileRouter.all("/", methodNotAllowed);

export default ProfileRouter;
