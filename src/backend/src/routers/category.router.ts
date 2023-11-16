import express from "express";
import categoryController from "../controllers/category.controller";
import { methodNotAllowed } from "../middlewares/error.middleware";

const CategoryRouter = express.Router();

CategoryRouter.route("/")
  .get(categoryController.getCategoriesByFilter)
  .post(categoryController.createCategory)

  .all(methodNotAllowed);
CategoryRouter.route("/:id")
  .get(categoryController.getCategory)
  .put(categoryController.updateCategory)
  //   .delete(categoryController.deleteCategory)
  .all(methodNotAllowed);

export default CategoryRouter;
