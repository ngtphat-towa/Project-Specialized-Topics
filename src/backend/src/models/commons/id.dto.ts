import Joi from "joi";

export const idSchema = Joi.object({
  id: Joi.alternatives()
    .try(Joi.string().required(), Joi.number().required())
    .messages({
      "string.invalid": "ID must be a valid string or number",
      "number.invalid": "ID must be a valid string or number",
    }),
}).options({ stripUnknown: true });

export interface IIdParam {
  id: string | number;
}
