const joi = require("joi");
const OBJECTID_REGEX = /^[a-f\d]{24}$/i;
const commonValidations = {
  stringRequired: joi.string().required(),
  stringOptional: joi.string().allow("", null).empty("").optional(),
  numberRequired: joi.number().required(),
  numberOptional: joi.number().allow(null).optional(),
  objectIdRequired: joi.string().regex(OBJECTID_REGEX).required(),
  objectIdOptional: joi.string().regex(OBJECTID_REGEX).allow(null).optional(),
  forbidden: joi.any().forbidden(),
};

module.exports = commonValidations;
