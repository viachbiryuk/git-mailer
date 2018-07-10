const Joi = require('joi');

const schema = Joi.object().keys({
  users: Joi.array().items(Joi.string()),
  message: Joi.string().min(2),
});

module.exports = schema;
