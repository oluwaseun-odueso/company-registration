import Joi, { ObjectSchema } from "joi";

export const registrationSchema: ObjectSchema = Joi.object().keys({
  companyName: Joi.string()
    .required()
    .messages({
      'string.base': 'Company name must be of type string',
      'string.empty': 'Company name is a required field',
    }),
  numberOfUsers: Joi.number()
    .min(1)
    .required(),
  numberOfProducts: Joi.number()
    .min(1)
    .required()
})