import { NextFunction, Request, Response } from "express";

const createCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "createCheckoutSession" });
  } catch (error) {
    next(error);
  }
};

export default {
  createCheckoutSession,
};
