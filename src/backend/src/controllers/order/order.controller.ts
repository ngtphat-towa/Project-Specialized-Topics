import { NextFunction, Request, Response } from "express";
import { Order } from "../../models/orders/order/order/order.model";
import {
  IPaginationRequest,
  PaginatedItems,
  PaginationRequestSchema,
} from "../../models/paginated/paginate.model";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../../models/commons/validate.dto";
import {
  IIdParam,
  IUserId,
  idSchema,
  userIdSchema,
} from "../../models/commons/id.dto";
import { NotFoundError } from "../../common/err.common";
import {
  IOrderStatusUpdate,
  IShippingInfoUpdate,
  OrderStatusUpdateSchema,
  ShippingInfoUpdateSchema,
} from "../../models/orders/order/order/dtos/info.dto";
import { IOrderUpdate } from "../../models/orders/order/order/order.dto";
import logging from "../../configs/logging";

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query: IPaginationRequest = validateQuery(
      req,
      PaginationRequestSchema
    );
    const orders = await Order.find()
      .skip(query.pageSize * query.pageIndex)
      .limit(query.pageSize);
    const totalItems = await Order.countDocuments();

    const result = new PaginatedItems(
      query.pageIndex,
      query.pageSize,
      totalItems,
      orders
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOrderByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUserId = validateBody(req, userIdSchema);
    const query: IPaginationRequest = validateQuery(
      req,
      PaginationRequestSchema
    );
    const orders = await Order.find({ userId: user.userId })
      .skip(query.pageSize * query.pageIndex)
      .limit(query.pageSize);

    const totalItems = await Order.find({
      userId: user.userId,
    }).countDocuments();

    const result = new PaginatedItems(
      query.pageIndex,
      query.pageSize,
      totalItems,
      orders
    );
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOrderByOrderId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params: IIdParam = validateParams(req, idSchema);
    const order = await Order.findById(params.id);

    if (!order) {
      throw new NotFoundError("Order not found", req.originalUrl);
    }

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUserId = validateBody(req, userIdSchema);
    const params: IIdParam = validateParams(req, idSchema);
    const order = await Order.findOneAndDelete({
      userId: user.userId,
      _id: params.id,
    });

    if (!order) {
      throw new NotFoundError("Order not found", req.originalUrl);
    }

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params: IIdParam = validateParams(req, idSchema);
    const validatedBody: IOrderStatusUpdate = validateBody(
      req,
      OrderStatusUpdateSchema
    );
    const order = await Order.findById(params.id);
    if (!order) {
      return res.status(404).send("Order not found");
    }

    order.orderStatus = validatedBody.orderStatus;
    await order.save();

    res.send(order);
  } catch (error) {
    next(error);
  }
};

const updateCustomerShippingInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shippingInfoUpdate: IShippingInfoUpdate = validateBody(
      req,
      ShippingInfoUpdateSchema
    );

    const order = await Order.findById(req.params.id);
    if (!order) {
      throw new NotFoundError("Order not found.", req.originalUrl);
    }

    order.shippingCity = shippingInfoUpdate.shippingCity;
    order.shippingStreet = shippingInfoUpdate.shippingStreet;
    order.shippingState = shippingInfoUpdate.shippingState;
    order.shippingCountry = shippingInfoUpdate.shippingCountry;
    order.shippingZipCode = shippingInfoUpdate.shippingZipCode;
    const result = await order.save();

    res.send(result);
  } catch (error) {
    next(error);
  }
};
const updateCustomerOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderUpdate: IOrderUpdate = validateBody(
      req,
      ShippingInfoUpdateSchema
    );

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send("Order not found");
    }

    // If the item exists, update  them
    Object.assign(order, orderUpdate);
    const result = await order.save();

    res.send(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllOrders,
  getOrderByUser,
  getOrderByOrderId,
  deleteOrder,
  updateOrderStatus,
  updateCustomerShippingInfo,
  updateCustomerOrder,
};
