import express from "express";
import AuthRouter from "./user/auth.router";
import TypeRouter from "./catalog/type.router";
import BrandRouter from "./catalog/brand.router";
import CartRouter from "./basket/cart.router";
import WishlistRouter from "./basket/wishlist.router";
import OrderRouter from "./order/order.router";
import UserRouter from "./user.router";
import CheckoutRouter from "./order/checkout.router";
import ItemRouter from "./catalog/items.router";
import AccountRouter from "./user/account.router";

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
