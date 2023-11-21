import express from "express";
import { methodNotAllowed } from "../../middlewares/error.middleware";
import validateToken from "../../middlewares/auth.middleware";
import itemController from "../../controllers/catalog/item.controller";

const ItemRouter = express.Router();

ItemRouter.route("/")
  .get(itemController.getItemsByFilter)
  .post(itemController.createItem)
  .delete(itemController.deleteAllItems)
  .all(methodNotAllowed);
ItemRouter.route("/:id")
  .get(itemController.getItem)
  .put(itemController.updateItem)
  .delete(itemController.deleteItem)
  .all(methodNotAllowed);

export default ItemRouter;
