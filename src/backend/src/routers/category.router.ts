import express from "express";
import multer from "multer";
import categoryController from "../controllers/category.controller";
import { methodNotAllowed } from "../middlewares/error.middleware";

const CategoryRouter = express.Router();
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

CategoryRouter.route("/")
  .get(categoryController.getCategoriesByFilter)
  .post(upload.single("image"), categoryController.createCategory)
  .all(methodNotAllowed);
CategoryRouter.route("/:id")
  .get(categoryController.getCategory)
  .put(upload.single("image"), categoryController.updateCategory)

  .all(methodNotAllowed);

export default CategoryRouter;
