import express from "express";
import AuthRouter from "./auth.router";
// import CatalogRouter from "./catalog.router";
import TypeRouter from "./type.router";
import CartRouter from "./cart.router";
import WishlistRouter from "./wishlist.router";
import OrderRouter from "./order.router";
import UserRouter from "./user.router";
import CheckoutRouter from "./checkout.router";

const routers = express.Router();

routers.use("/auth", AuthRouter);
// routers.use("/catalog", CatalogRouter);
routers.use("/type", TypeRouter);
routers.use("/cart", CartRouter);

routers.use("/checkout", CheckoutRouter);
routers.use("/wishlist", WishlistRouter);
routers.use("/order", OrderRouter);
routers.use("/user", UserRouter);

export default routers;
