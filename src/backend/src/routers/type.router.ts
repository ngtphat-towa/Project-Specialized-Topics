import express from "express";
import multer from "multer";
import typeController from "../controllers/catalog/type.controller";
import { methodNotAllowed } from "../middlewares/error.middleware";

const TypeRouter = express.Router();
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

TypeRouter.route("/")
  .get(typeController.getTypesByFilter)
  .post(upload.single("image"), typeController.createType)
  .all(methodNotAllowed);
TypeRouter.route("/:id")
  .get(typeController.getType)
  .put(upload.single("image"), typeController.updateType)

  .all(methodNotAllowed);

export default TypeRouter;
