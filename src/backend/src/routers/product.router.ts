import express from "express";
import productController from "../controllers/product.controller";
import { methodNotAllowed } from "../middlewares/error.middleware";
import validateToken from "../middlewares/auth.middleware";

const ProductRouter = express.Router();

ProductRouter.route("/")
  .get(productController.getProductsByFilter)
  .post(productController.createProduct)
  .delete(productController.deleteAllProducts)
  .all(methodNotAllowed);
ProductRouter.route("/:id")
  .get(productController.getProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct)
  .all(methodNotAllowed);

export default ProductRouter;
