import express from "express";

import typeController from "../../controllers/catalog/type.controller";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import processImageMiddleware from "../../middlewares/files/mutler.middleware";
import { requireAdmin } from "../../middlewares/auth/validate.middleware";

const TypeRouter = express.Router();

TypeRouter.route("/")
  .get(typeController.getTypesByFilter)
  .post(processImageMiddleware, typeController.createType)
  // .post(requireAdmin, processImageMiddleware, typeController.createType)
  .all(methodNotAllowed);
TypeRouter.route("/:id")
  .get(typeController.getType)
  .put(requireAdmin, processImageMiddleware, typeController.updateType)
  .all(methodNotAllowed);

export default TypeRouter;
