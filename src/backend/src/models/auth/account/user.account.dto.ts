import Joi from "joi";

// Define the Joi validation schema
export const createUserAccountSchema = Joi.object({
  username: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({ "string.empty": "Username is required" }),
  password: Joi.string()
    .required()
    .messages({ "string.empty": "Password is required" }),
  email: Joi.string()
    .email()
    .required()
    .messages({ "string.empty": "Email is required" }),
}).options({ stripUnknown: true });

export const updateUserAccountSchema = Joi.object({
  username: Joi.string().min(2).max(50).optional(),
  password: Joi.string().optional(),
  email: Joi.string().email().optional(),
}).options({ stripUnknown: true });

export const loginUserSchema = Joi.object({
  username: Joi.string()
    .min(2)
    .max(50)
    .messages({ "string.empty": "Username is required" }),
  email: Joi.string()
    .email()
    .min(5)
    .max(255)
    .messages({ "string.empty": "Email is required" }),
  password: Joi.string()
    .required()
    .min(8)
    .max(1024)
    .messages({ "string.empty": "Password is required" }),
})
  .or("username", "email")
  .options({ stripUnknown: true });

export interface ILoginUserAccount {
  username?: string;
  email: string;
  password: string;
}
export interface ICreateUserAccount {
  username: string;
  password: string;
  email: string;
}

export interface IUpdateUserAccount {
  username?: string;
  password?: string;
  email?: string;
  [key: string]: any;
}
