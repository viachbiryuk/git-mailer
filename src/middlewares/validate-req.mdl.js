const Joi = require('joi');

module.exports = (schemaName) => {

  const schema = require(`../validation-schemas/${ schemaName }.schema.js`);
  return (req, res, next) => {
    const { error, value } = Joi.validate(req.body, schema);
    if (error !== null) {
      return res.status(422).json({
        message: error
      })
    }
    next();
  }
};
