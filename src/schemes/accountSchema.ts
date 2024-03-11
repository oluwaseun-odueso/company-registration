import Joi, { ObjectSchema } from "joi";

export const signUpSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string()
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
    .required()
    .messages({
      'string.base': 'Email must be of type string',
      'string.email': 'Invalid email',
      'string.empty': 'Email is a required field',
    }),
  password: Joi.string()
    .min(5)
    .max(15)
    .required()
    .messages({
      'string.base': 'Password must be of type string',
      'string.min': 'Invalid password',
      'string.max': 'Invalid password',
      'string.empty': 'Password is a required field',
    }),
  firstName: Joi.string()
    .required()
    .messages({
      'string.base': 'First name must be of type string',
      'string.empty': 'First name is a required field',
    }),
  lastName: Joi.string()
    .required()
    .messages({
      'string.base': 'Last name must be of type string',
      'string.empty': 'Last name is a required field',
    })
})

export const loginSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string()
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
    .required()
    .messages({
      'string.base': 'Email must be of type string',
      'string.email': 'Invalid email',
      'string.empty': 'Email is a required field',
    }),
  password: Joi.string()
    .required()
    .messages({
      'string.base': 'Password must be of type string',
      'string.min': 'Invalid password',
      'string.max': 'Invalid password',
      'string.empty': 'Password is a required field',
    }),
})