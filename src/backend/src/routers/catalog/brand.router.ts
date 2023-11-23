import express from "express";
import brandController from "../../controllers/catalog/brand.controller";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import processImageMiddleware from "../../middlewares/files/mutler.middleware";
import { requireAdmin } from "../../middlewares/auth/validate.middleware";

const BrandRouter = express.Router();

BrandRouter.route("/")
  .get(brandController.getBrandsByFilter)
  .post(requireAdmin, processImageMiddleware, brandController.createBrand)
  .all(methodNotAllowed);
BrandRouter.route("/:id")
  .get(brandController.getBrand)
  .put(requireAdmin, processImageMiddleware, brandController.updateBrand)
  .all(methodNotAllowed);

export default BrandRouter;
