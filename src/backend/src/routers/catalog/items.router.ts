import express from "express";
import { methodNotAllowed } from "../../middlewares/error.middleware";
import validateToken from "../../middlewares/auth.middleware";
import itemController from "../../controllers/catalog/item.controller";
import processImageMiddleware from "../../middlewares/validate/mutler.config";

const ItemRouter = express.Router();

// Routes for querying catalog items.
ItemRouter.get("/", itemController.getAllItems);
ItemRouter.get("/by", itemController.getItemsByName);
ItemRouter.get("/:id", itemController.getItemById);

// Routes for resolving catalog items by type and brand
ItemRouter.get(
  "/type/{typeId}/brand/{brandId?}",
  itemController.getItemsByBrandAndTypeId
);
ItemRouter.get(
  "/type/all/brand/:brandId",
  itemController.getItemsByBrandId
);
ItemRouter.get("/catalogtypes", itemController.getCatlogTypes);
ItemRouter.get("/catalogbrands", itemController.getCatlogBrands);

// Routes for modifying catalog items.
ItemRouter.post("/", processImageMiddleware, itemController.createItem);
ItemRouter.put("/:id", processImageMiddleware, itemController.updateItem);
ItemRouter.delete("/:id", itemController.deleteItem);
ItemRouter.delete("/", itemController.deleteAllItems);

ItemRouter.route("/").all(methodNotAllowed);

export default ItemRouter;
