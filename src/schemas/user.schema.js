import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi
    .string()
    .trim(true)
    .min(1)
    .required(),
  email: Joi
    .string()
    .email()
    .required(),
  password: Joi
    .string()
    .alphanum()
    .min(3)
    .required(),
});

export default userSchema;
