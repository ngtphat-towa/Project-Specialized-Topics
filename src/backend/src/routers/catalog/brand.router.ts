import express from "express";
import multer from "multer";
import brandController from "../../controllers/catalog/brand.controller";
import { methodNotAllowed } from "../../middlewares/error.middleware";

const BrandRouter = express.Router();
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

BrandRouter.route("/")
  .get(brandController.getBrandsByFilter)
  .post(upload.single("image"), brandController.createBrand)
  .all(methodNotAllowed);
BrandRouter.route("/:id")
  .get(brandController.getBrand)
  .put(upload.single("image"), brandController.updateBrand)

  .all(methodNotAllowed);

export default BrandRouter;
