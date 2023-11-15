// TODO : login, resigter, logout, validate token

import { NextFunction, Request, Response } from "express";

const register = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "register" });
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "login" });
};
const logout = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "logout" });
};

export default {
  register,
  login,
  logout,
};
