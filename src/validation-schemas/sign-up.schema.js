const Joi = require('joi');

const schema = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string().min(5).required()
});

module.exports = schema;
