import express from "express";
import { methodNotAllowed } from "../../middlewares/utils/error.middleware";
import validateToken from "../../middlewares/auth/auth.middleware";
import itemController from "../../controllers/catalog/item.controller";
import processImageMiddleware from "../../middlewares/files/mutler.middleware";
import { requireAdmin } from "../../middlewares/auth/validate.middleware";

const ItemRouter = express.Router();

// Routes for resolving catalog items by type and brand
ItemRouter.get(
  "/type/{typeId}/brand/{brandId?}",
  itemController.getItemsByBrandAndTypeId
);
ItemRouter.get("/type/all/brand/:brandId", itemController.getItemsByBrandId);
ItemRouter.get("/catalogtypes", itemController.getCatlogTypes);
ItemRouter.get("/catalogbrands", itemController.getCatlogBrands);

// Routes for querying catalog items.
ItemRouter.get("/", itemController.getAllItems);
ItemRouter.get("/by", itemController.getItemsByName);
ItemRouter.get("/:id", itemController.getItemById);

// Routes for modifying catalog items.
ItemRouter.post(
  "/",
  // requireAdmin,
  processImageMiddleware,
  itemController.createItem
);
ItemRouter.put(
  "/:id",
  // requireAdmin,
  processImageMiddleware,
  itemController.updateItem
);
ItemRouter.delete("/:id", requireAdmin, itemController.deleteItem);
ItemRouter.delete("/", requireAdmin, itemController.deleteAllItems);

ItemRouter.route("/").all(methodNotAllowed);

export default ItemRouter;
