import { NextFunction, Request, Response } from "express";
import { func } from "joi";
import {
  CustomerBasket,
  ICustomerBasket,
} from "../../models/basket/basket/basket.model";
import ApiError, { NotFoundError } from "../../common/err.common";
import { IUserId, userIdSchema } from "../../models/commons/id.dto";
import { validateBody } from "../../models/commons/validate.dto";
import { Document, Types } from "mongoose";

const createCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate current basket
    const currentBasket = await getCurrentBasket(req);

    const items = currentBasket.items;
    // Create payment session

    // Sent data back to user
    return res.status(200).json({ message: "createCheckoutSession" });
  } catch (error) {
    next(error);
  }
};

const placeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate user id from cookies
    // Validate payment session in cookies
    // Take current cart items to poupulate the items
    // Save order
    // remove current cart
    return res.status(200).json({ message: "placeOrder" });
  } catch (error) {
    next(error);
  }
};

async function getCurrentBasket(req: Request): Promise<
  Document<unknown, {}, ICustomerBasket> &
    ICustomerBasket & {
      _id: Types.ObjectId;
    }
> {
  const user: IUserId = validateBody(req, userIdSchema);
  // Find current basket
  const existingBasket = await CustomerBasket.findOne({ userId: user.userId });
  // Check the existing
  if (!existingBasket) {
    throw new NotFoundError(
      "Basket list was empty. Please add items before processing checkout!",
      req.originalUrl
    );
  }

  return existingBasket;
}

export default {
  createCheckoutSession,
  placeOrder,
};
