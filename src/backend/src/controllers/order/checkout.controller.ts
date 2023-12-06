import { NextFunction, Request, Response } from "express";

import {
  CustomerBasket,
  ICustomerBasket,
} from "../../models/basket/basket/basket.model";
import { NotFoundError } from "../../common/err.common";
import {
  ISessionID,
  IUserId,
  sessionIdSchema,
  userIdSchema,
} from "../../models/commons/id.dto";
import { validateBody } from "../../models/commons/validate.dto";
import { Document, Types } from "mongoose";
import { IBasketItem } from "../../models/basket/items/basket.item.model";
import { CheckoutItem } from "../../models/orders/checkout/items/checkout.item";
import createCheckouStripetSession, {
  saveCustomerOrder,
} from "../../handlers/stripes/stripe.function";

import {
  IDeleteCustomerBasket,
  deleteCustomerBasketSchema,
} from "../../models/basket/basket/basket.dto";

const createCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate current basket
    const currentBasket = await getCurrentBasket(req);

    // Create checkout list item
    const checkoutItems = mapBasketItemsToCheckoutItems(currentBasket.items);

    // create sesstion
    const sessionId = await createCheckouStripetSession(checkoutItems);

    // Sent data back to user
    return res.status(200).json({ sessionId });
  } catch (error) {
    next(error);
  }
};
const placeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate user id from cookies
    const user: IUserId = validateBody(req, userIdSchema);

    // Validate payment session in cookies
    const session: ISessionID = validateBody(req, sessionIdSchema);

    // Take current cart items/item to poupulate the items
    // Save order
    const order = await saveCustomerOrder(user.userId, session.sessionId);

    // remove current basket
    await deleteCurrentBasket(req);

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

function mapBasketItemsToCheckoutItems(
  basketItems: IBasketItem[]
): CheckoutItem[] {
  return basketItems.map((item) => ({
    productId: item.productId,
    price: item.unitPrice,
    productName: item.productName,
    image: item.image,
    quantity: item.quantity,
    discount: item.oldUnitPrice ? item.oldUnitPrice - item.unitPrice : 0,
  }));
}

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
  if (
    !existingBasket ||
    !existingBasket.items ||
    existingBasket.items.length === 0
  ) {
    throw new NotFoundError(
      "Basket list was empty. Please add items before processing checkout!",
      req.originalUrl
    );
  }

  return existingBasket;
}
async function deleteCurrentBasket(req: Request): Promise<
  | (Document<unknown, {}, ICustomerBasket> &
      ICustomerBasket & {
        _id: Types.ObjectId;
      })
  | void
  | null
> {
  const deleteCustomerBasket: IDeleteCustomerBasket = validateBody(
    req,
    deleteCustomerBasketSchema
  );
  // check if the basket exist
  const existingBasket = await CustomerBasket.findOneAndDelete({
    $or: [{ userId: deleteCustomerBasket.userId }],
  });
  return existingBasket;
}

export default {
  createCheckoutSession,
  placeOrder,
};
