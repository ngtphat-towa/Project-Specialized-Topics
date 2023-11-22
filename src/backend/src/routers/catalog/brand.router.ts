import express from "express";
import brandController from "../../controllers/catalog/brand.controller";
import { methodNotAllowed } from "../../middlewares/error.middleware";
import processImageMiddleware from "../../middlewares/validate/mutler.middleware";

const BrandRouter = express.Router();

BrandRouter.route("/")
  .get(brandController.getBrandsByFilter)
  .post(processImageMiddleware, brandController.createBrand)
  .all(methodNotAllowed);
BrandRouter.route("/:id")
  .get(brandController.getBrand)
  .put(processImageMiddleware, brandController.updateBrand)
  .all(methodNotAllowed);

export default BrandRouter;
