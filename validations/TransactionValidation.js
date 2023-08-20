const commonValidations = require("../validations/CommonValidation");
const joi = require("joi");

const TransactionValidation = {
  get: {
    params: joi.object({
      walletId: commonValidations.objectIdRequired,
    }),
  },
  download: {
    params: joi.object({
      walletId: commonValidations.objectIdRequired,
    }),
  },
  create: {
    body: joi.object({
      description: commonValidations.stringRequired,
      amount: commonValidations.numberRequired,
      transactionType: commonValidations.stringRequired,
    }),
  },
};

module.exports = TransactionValidation;
