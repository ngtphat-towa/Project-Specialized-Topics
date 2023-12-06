// create item session

import Decimal from "decimal.js";
import { CheckoutItem } from "../../models/orders/checkout/items/checkout.item";
import Stripe from "stripe";
import config from "../../configs/config";
import { IOrder, Order } from "../../models/orders/order/order/order.model";
import {
  IOrderItem,
  OrderItem,
} from "../../models/orders/order/items/order.item.model";
import logging from "../../configs/logging";

const stripe = new Stripe(config.payment.secret, {
  apiVersion: "2023-10-16",
});

// supply success and failure url for stripe
const successURL =
  config.client.baseUrl + "/payment/success?session_id={CHECKOUT_SESSION_ID}";
const failedURL = config.client.baseUrl + "/payment/failed";

// recevice the data from order
export default async function createCheckouStripetSession(
  checkoutListItem: CheckoutItem[]
) {
  const lineItems = checkoutListItem.map((item) => createSessionLineItem(item));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    line_items: lineItems,
    mode: "payment",
    success_url: `${successURL}`,
    cancel_url: `${failedURL}`,
  });

  return session;
}

/// function to to create line item
export function createSessionLineItem(checkoutItem: CheckoutItem) {
  return {
    price_data: createPriceData(checkoutItem),
    quantity: checkoutItem.quantity,
  };
}
// function to create  create price data
function createPriceData(checkoutItem: CheckoutItem) {
  return {
    currency: "usd",
    product_data: {
      name: checkoutItem.productName,
    },
    unit_amount: new Decimal(checkoutItem.price).mul(100).toNumber(),
  };
}

export async function saveCustomerOrder(
  userId: string,
  sessionId: string
): Promise<IOrder | null> {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return null;
  }

  const customerDetails = session.customer_details!;
  const address = session.shipping_details?.address!;
  const lineItems = (await stripe.checkout.sessions.listLineItems(sessionId))
    .data;

  logging.debug("saveCustomerOrder", "customerDetails", customerDetails);
  logging.debug(
    "saveCustomerOrder",
    "shipping_details",
    session.shipping_details
  );
  logging.debug("saveCustomerOrder", "lineItems", lineItems);

  const orderItems = lineItems.map((item) => {
    const price = item.price!;
    return new OrderItem({
      productId: price.product,
      price: price.unit_amount! / 100,
      productName: item.description,
      quantity: item.quantity,
      discount: 0,
    });
  });

  const order = new Order({
    userId: userId,
    orderDate: new Date(session.created * 1000),
    paymentStatus: session.payment_status,
    shippingCity: address.city,
    shippingStreet: address.line1,
    shippingState: address.state,
    shippingCountry: address.country,
    shippingZipCode: address.postal_code,
    total: session.amount_total! / 100,
    orderNumber: session.id,
    phone: customerDetails.phone,
    orderItems: orderItems,
  });

  await order.save();

  return order;
}
