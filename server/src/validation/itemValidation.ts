import Joi from 'joi';

export const createItemSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10),
  status: Joi.string().valid('active', 'inactive'),
  tags: Joi.array().items(Joi.string()),
});

export const updateItemSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(10),
  status: Joi.string().valid('active', 'inactive'),
  tags: Joi.array().items(Joi.string()),
}).min(1); 