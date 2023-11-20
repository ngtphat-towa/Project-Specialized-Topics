import Joi from "joi";

export const createCategoryDto = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  image: Joi.binary().encoding("base64").max(5242880), // 5MB
});

export const updateCategoryDto = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  image: Joi.binary().encoding("base64").max(5242880), // 5MB
});
