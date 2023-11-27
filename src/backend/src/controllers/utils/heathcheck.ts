import { NextFunction, Request, Response } from "express";

const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "pong",
  });
};
const checkPostDataForm = (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Form data logged!");
};
export default { serverHealthCheck, checkPostDataForm };
