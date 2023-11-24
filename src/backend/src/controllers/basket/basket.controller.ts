import { NextFunction, Request, Response } from "express";
import {
  IIdParam,
  IUserId,
  idSchema,
  userIdSchema,
} from "../../models/commons/id.dto";
import {
  validateBody,
  validateParams,
} from "../../models/commons/validate.dto";
import { CustomerBasket } from "../../models/basket/basket/basket.model";
import {
  ICreateCustomerBasket,
  IDeleteCustomerBasket,
  createCustomerBasketSchema,
} from "../../models/basket/basket/basket.dto";
import { NotFoundError } from "../../common/err.common";
import {
  ICreateBasketItem,
  IRemoveBasketItem,
  IUpdateBasketItem,
  createBasketItemSchema,
  removeBasketItemSchema,
  updateBasketItemSchema,
} from "../../models/basket/items/option.item.dto";
import { BasketItem } from "../../models/basket/items/basket.item.model";

const getBasketByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request data
    const params: IIdParam = validateParams(req, idSchema);
    const createCustomerBasket: ICreateCustomerBasket = validateBody(
      req,
      createCustomerBasketSchema
    );
    // check if the basket exist
    const existingBasket = await CustomerBasket.findOne({
      $or: [{ id: params.id }, { userId: createCustomerBasket.userId }],
    });

    if (!existingBasket) {
      throw new NotFoundError("Basket not found", req.originalUrl);
    }

    return res.status(200).json(existingBasket);
  } catch (error) {
    next(error);
  }
};

const createBasket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createCustomerBasket: ICreateCustomerBasket = validateBody(
      req,
      createCustomerBasketSchema
    );
    // crate new basket
    const basket = new CustomerBasket(createCustomerBasket);

    const result = await basket.save();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteBasket = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request data
    const deleteCustomerBasket: IDeleteCustomerBasket = validateBody(
      req,
      createCustomerBasketSchema
    );
    // check if the basket exist
    const existingBasket = await CustomerBasket.findOneAndDelete({
      $or: [{ userId: deleteCustomerBasket.userId }],
    });

    // if existingBasket is null
    if (!existingBasket) {
      throw new NotFoundError("Basket not found", req.originalUrl);
    }

    return res.status(200).json(existingBasket);
  } catch (error) {
    next(error);
  }
};

const createBasketItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request data
    const params: IIdParam = validateParams(req, idSchema);
    const createBasketItem: ICreateBasketItem = validateBody(
      req,
      createBasketItemSchema
    );
    // check if the basket exist
    const existingBasket = await CustomerBasket.findOne({
      $or: [{ id: params.id }, { userId: createBasketItem.userId }],
    });

    if (!existingBasket) {
      throw new NotFoundError("Basket not found", req.originalUrl);
    }
    // Check if the item already exists in the basket
    const existingItem = existingBasket.items.find(
      (item) => item.productId === createBasketItem.productId
    );

    if (existingItem) {
      // If the item exists, update the quantity
      existingItem.quantity += createBasketItem.quantity;
    } else {
      // If the item doesn't exist, create a new item and add it to the basket
      const basketItem = new BasketItem(createBasketItem);
      existingBasket.items.push(basketItem);
    }

    await existingBasket.save();

    return res.status(200).json(existingBasket);
  } catch (error) {
    next(error);
  }
};

const updateBasketItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request data
    const params: IIdParam = validateParams(req, idSchema);
    const updateBasketItem: IUpdateBasketItem = validateBody(
      req,
      updateBasketItemSchema
    );
    // check if the basket exist
    const existingBasket = await CustomerBasket.findOne({
      $or: [{ id: params.id }, { userId: updateBasketItem.userId }],
    });

    if (!existingBasket) {
      throw new NotFoundError("Basket not found", req.originalUrl);
    }
    // Check if the item already exists in the basket
    const existingItem = existingBasket.items.find(
      (item) => item.productId === updateBasketItem.productId
    );

    if (!existingItem) {
      throw new NotFoundError("Basket item not found", req.originalUrl);
    }
    // If the item exists, update  them
    Object.assign(existingItem, updateBasketItem);

    await existingBasket.save();

    return res.status(200).json(existingBasket);
  } catch (error) {
    next(error);
  }
};

// This function deletes an item from a specific user's basket
const deleteBasketItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request data
    const removeBasketItem: IRemoveBasketItem = validateBody(
      req,
      removeBasketItemSchema
    );

    // Check if the basket exists
    const existingBasket = await CustomerBasket.findOne({
      userId: removeBasketItem.userId,
    });
    if (!existingBasket) {
      throw new NotFoundError("Basket not found", req.originalUrl);
    }

    // Check if the item exists in the basket
    const existingItemIndex = existingBasket.items.findIndex(
      (item) => item.productId === removeBasketItem.productId
    );

    if (existingItemIndex === -1) {
      throw new NotFoundError("Basket item not found", req.originalUrl);
    }

    // Remove the item from the basket
    existingBasket.items.splice(existingItemIndex, 1);

    await existingBasket.save();

    return res.status(200).json(existingBasket);
  } catch (error) {
    next(error);
  }
};

export default {
  getBasketByUserId,
  createBasket,
  createBasketItem,
  updateBasketItem,
  deleteBasket,
  deleteBasketItem,
};
