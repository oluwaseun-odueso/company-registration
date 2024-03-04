import Joi, { ObjectSchema } from "joi";

export const registrationSchema: ObjectSchema = Joi.object().keys({
  companyName: Joi.string()
    .required(),
  numberOfUsers: Joi.number()
    .required(),
  numberOfProducts: Joi.number()
    .required()
})