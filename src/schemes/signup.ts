import Joi, { ObjectSchema } from "joi";

export const accountSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string()
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
    .required(),
  password: Joi.string()
    // .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    .required(),
  firstName: Joi.string()
    .required(),
  lastName: Joi.string()
    .required()
})