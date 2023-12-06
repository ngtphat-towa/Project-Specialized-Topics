import Joi from "joi";

// Define the Joi validation schema
export const createUserProfileSchema = Joi.object({
  userAccount: Joi.string()
    .required()
    .messages({ "string.empty": "User Account is required" }),
  cardNumber: Joi.string().length(16).optional(),
  securityNumber: Joi.string().min(3).max(4).optional(),
  expiration: Joi.string()
    .pattern(new RegExp("(0[1-9]|1[0-2])/[0-9]{2}"))
    .optional(),
  cardHolderName: Joi.string().optional(),
  cardType: Joi.number().optional(),
  street: Joi.string()
    .required()
    .messages({ "string.empty": "Street is a required field" }),
  city: Joi.string()
    .required()
    .messages({ "string.empty": "City is a required field" }),
  state: Joi.string()
    .required()
    .messages({ "string.empty": "State is a required field" }),
  country: Joi.string()
    .required()
    .messages({ "string.empty": "Country is a required field" }),
  zipCode: Joi.string().optional().messages({
    "string.empty": "Zip Code is a required field",
  }),
  firstName: Joi.string()
    .required()
    .messages({ "string.empty": "First Name is a required field" }),
  lastName: Joi.string()
    .required()
    .messages({ "string.empty": "Last Name is a required field" }),
  email: Joi.string()
    .required()
    .messages({ "string.empty": "Gmail is a required field" }),
  phoneNumber: Joi.string()
    .optional()
    .messages({ "string.empty": "Phone Number should not be empty" }),
}).options({ stripUnknown: true });

export const updateUserProfileSchema = Joi.object({
  userAccount: Joi.string().optional(),
  cardNumber: Joi.string().length(16).optional(),
  securityNumber: Joi.string().min(3).max(4).optional(),
  expiration: Joi.string()
    .pattern(new RegExp("(0[1-9]|1[0-2])/[0-9]{2}"))
    .optional(),
  cardHolderName: Joi.string().optional(),
  cardType: Joi.number().optional(),
  street: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional(),
  zipCode: Joi.string().optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string()
    .optional()
    .messages({ "string.empty": "Gmail should not be empty" }),
  phoneNumber: Joi.string()
    .optional()
    .messages({ "string.empty": "Phone Number should not be empty" }),
}).options({ stripUnknown: true });

// Define the Joi validation schema
export const queryUserSchema = Joi.object({
  userAccount: Joi.string().optional(),
  username: Joi.string().optional(),
  email: Joi.string().optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  city: Joi.string().optional(),
  country: Joi.string().optional(),
  phone: Joi.string().optional(),
}).options({ stripUnknown: true });

export interface IQueryUser {
  [key: string]: any;
  userAccount: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  role: string;
}
export interface ICreateUserProfile {
  userAccount: string;
  cardNumber?: string;
  securityNumber?: string;
  expiration?: string;
  cardHolderName?: string;
  cardType?: number;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

export interface IUpdateUserProfile {
  userAccount?: string;
  cardNumber?: string;
  securityNumber?: string;
  expiration?: string;
  cardHolderName?: string;
  cardType?: number;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  [key: string]: any;
}
