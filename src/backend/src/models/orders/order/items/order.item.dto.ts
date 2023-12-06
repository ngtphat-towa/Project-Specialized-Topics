import Joi from "joi";

export const OrderItemJoiSchema = Joi.object({
  productId: Joi.string().required().messages({
    "string.base": `"productId" should be a type of 'text'`,
    "string.empty": `"productId" cannot be an empty field`,
    "any.required": `"productId" is a required field`,
  }),
  price: Joi.number().required().messages({
    "number.base": `"price" should be a type of 'number'`,
    "number.empty": `"price" cannot be an empty field`,
    "any.required": `"price" is a required field`,
  }),
  productName: Joi.string().required().messages({
    "string.base": `"productName" should be a type of 'text'`,
    "string.empty": `"productName" cannot be an empty field`,
    "any.required": `"productName" is a required field`,
  }),
  image: Joi.object({
    data: Joi.binary(),
    contentType: Joi.string(),
  }),
  quantity: Joi.number().required().messages({
    "number.base": `"quantity" should be a type of 'number'`,
    "number.empty": `"quantity" cannot be an empty field`,
    "any.required": `"quantity" is a required field`,
  }),
  discount: Joi.number().required().messages({
    "number.base": `"discount" should be a type of 'number'`,
    "number.empty": `"discount" cannot be an empty field`,
    "any.required": `"discount" is a required field`,
  }),
}).options({ stripUnknown: true });
