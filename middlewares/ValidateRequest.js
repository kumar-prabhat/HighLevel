const { validate } = require("express-validation");

const validateRequest = (schema) => {
  return validate(schema, {}, { allowUnknown: true });
};

module.exports = validateRequest;
