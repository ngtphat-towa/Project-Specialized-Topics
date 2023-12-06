import express from "express";
import AuthRouter from "./user/auth.router";
import TypeRouter from "./catalog/type.router";
import BrandRouter from "./catalog/brand.router";
import BasketRouter from "./basket/basket.router";
import WishlistRouter from "./basket/wishlist.router";
import OrderRouter from "./order/order.router";
import UserRouter from "./user/profile.router";
import CheckoutRouter from "./order/checkout.router";
import ItemRouter from "./catalog/items.router";
import AccountRouter from "./user/account.router";

const routers = express.Router();

// Authentication
routers.use("/auth", AuthRouter);

// Catalog
routers.use("/item", ItemRouter);
routers.use("/type", TypeRouter);
routers.use("/brand", BrandRouter);

// Basket
routers.use("/basket", BasketRouter);
routers.use("/wishlist", WishlistRouter);

// Order
routers.use("/checkout", CheckoutRouter);
routers.use("/order", OrderRouter);

// Account
routers.use("/account", AccountRouter);
routers.use("/profile", UserRouter);

export default routers;
