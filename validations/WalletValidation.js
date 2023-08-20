const commonValidations = require("../validations/CommonValidation");
const joi = require("joi");

const WalletValidation = {
  get: {
    params: joi.object({
      walletId: commonValidations.objectIdRequired,
    }),
  },
  setup: {
    body: joi.object({
      name: commonValidations.stringRequired,
      balance: commonValidations.numberRequired,
    }),
  },
};

module.exports = WalletValidation;
