import Joi from "joi";

// Define the Joi validation schema for a single BasketItem
export const basketItemSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "Item id is required. Please provide a valid id.",
  }),
  productId: Joi.string().required().messages({
    "string.empty": "Product id is required. Please provide a valid productId.",
  }),
  productName: Joi.string().required().messages({
    "string.empty":
      "Product name is required. Please provide a valid productName.",
  }),
  unitPrice: Joi.number().required().messages({
    "number.base":
      "Unit price is required and must be a number. Please provide a valid unitPrice.",
  }),
  oldUnitPrice: Joi.number().required().messages({
    "number.base":
      "Old unit price is required and must be a number. Please provide a valid oldUnitPrice.",
  }),
  quantity: Joi.number().required().messages({
    "number.base":
      "Quantity is required and must be a number. Please provide a valid quantity.",
  }),
  image: Joi.object({
    data: Joi.binary().required().messages({
      "binary.base": "Image data is required. Please provide valid image data.",
    }),
    contentType: Joi.string().required().messages({
      "string.empty":
        "Content type is required. Please provide a valid content type.",
    }),
  }).optional(),
}).options({ stripUnknown: true });
