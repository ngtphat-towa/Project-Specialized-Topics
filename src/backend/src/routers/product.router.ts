import express from "express";
import catalogController from "../controllers/catalog/catalog.controller";
import { methodNotAllowed } from "../middlewares/error.middleware";
import validateToken from "../middlewares/auth.middleware";

const CatalogRouter = express.Router();

CatalogRouter.route("/")
  .get(catalogController.getCatalogsByFilter)
  .post(catalogController.createCatalog)
  .delete(catalogController.deleteAllCatalogs)
  .all(methodNotAllowed);
CatalogRouter.route("/:id")
  .get(catalogController.getCatalog)
  .put(catalogController.updateCatalog)
  .delete(catalogController.deleteCatalog)
  .all(methodNotAllowed);

export default CatalogRouter;
