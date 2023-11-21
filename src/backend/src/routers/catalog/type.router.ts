import express from "express";

import typeController from "../../controllers/catalog/type.controller";
import { methodNotAllowed } from "../../middlewares/error.middleware";
import processImageMiddleware from "../../middlewares/validate/mutler.config";

const TypeRouter = express.Router();

TypeRouter.route("/")
  .get(typeController.getTypesByFilter)
  .post(processImageMiddleware, typeController.createType)
  .all(methodNotAllowed);
TypeRouter.route("/:id")
  .get(typeController.getType)
  .put(processImageMiddleware, typeController.updateType)

  .all(methodNotAllowed);

export default TypeRouter;
