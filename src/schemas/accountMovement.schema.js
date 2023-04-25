import Joi from 'joi';

const accountMovement = Joi.object({
  opValue: Joi
    .number()
    .min(1)
    .required(),
  type: Joi
    .string()
    .min(3)
    .valid('positive', 'negative')
    .required(),
  desc: Joi
    .string()
    .min(3)
    .required(),
  data: Joi
    .string()
    .pattern(/^\d{2}\/\d{2}\/\d{4},\s\d{2}:\d{2}:\d{2}$/)
    .required(),
});

export default accountMovement;
