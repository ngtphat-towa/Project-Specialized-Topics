import express from "express";
import AuthRouter from "./auth.router";
import TypeRouter from "./catalog/type.router";
import BrandRouter from "./catalog/brand.router";
import CartRouter from "./cart.router";
import WishlistRouter from "./wishlist.router";
import OrderRouter from "./order.router";
import UserRouter from "./user.router";
import CheckoutRouter from "./checkout.router";
import ItemRouter from "./catalog/items.router";

const routers = express.Router();

routers.use("/auth", AuthRouter);
routers.use("/item", ItemRouter);
routers.use("/type", TypeRouter);
routers.use("/brand", BrandRouter);
routers.use("/cart", CartRouter);

routers.use("/checkout", CheckoutRouter);
routers.use("/wishlist", WishlistRouter);
routers.use("/order", OrderRouter);
routers.use("/user", UserRouter);

export default routers;
