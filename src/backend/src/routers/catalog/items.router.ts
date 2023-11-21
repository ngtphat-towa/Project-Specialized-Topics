import express from "express";
import { methodNotAllowed } from "../../middlewares/error.middleware";
import validateToken from "../../middlewares/auth.middleware";
import itemController from "../../controllers/catalog/item.controller";

const ItemRouter = express.Router();

// Routes for querying catalog items.
ItemRouter.get("/", itemController.getAllItems);
ItemRouter.get("/by", itemController.getItemByName);
ItemRouter.get("/:id", itemController.getItemById);

// Routes for resolving catalog items by type and brand
ItemRouter.get(
  "/type/{typeId}/brand/{brandId?}",
  itemController.getItemsByBrandAndTypeId
);
ItemRouter.get(
  "/type/all/brand/{brandId:int?}",
  itemController.getItemsByBrandId
);
ItemRouter.get("/catalogtypes", itemController.getCatlogTypes);
ItemRouter.get("/catalogbrands", itemController.getCatlogBrands);

// Routes for modifying catalog items.
ItemRouter.post("/", itemController.createItem);
ItemRouter.put("/", itemController.updateItem);
ItemRouter.delete("/:id", itemController.deleteItem);
ItemRouter.delete("/", itemController.deleteAllItems);

ItemRouter.route("/").all(methodNotAllowed);

export default ItemRouter;
