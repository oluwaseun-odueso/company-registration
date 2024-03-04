import Joi, { ObjectSchema } from "joi";

const signupSchema: ObjectSchema = Joi.object().keys({
  companyName: Joi.string()
    .required(),
  numberOfUsers: Joi.number()
    .required(),
  numberOfProducts: Joi.number()
    .required(),
  Percentage: Joi.number()
    .required()
    .min(0)
    .max(100),
})