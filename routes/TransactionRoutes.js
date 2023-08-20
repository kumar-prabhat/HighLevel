const express = require("express");
const validateRequest = require("../middlewares/ValidateRequest");
const TransactionValidation = require("../validations/TransactionValidation");
const exceptionHandler = require("../middlewares/ExceptionHandler");
const TransactionController = require("../controller/TransactionController");
const transactionRoutes = express.Router();
const transactionController = new TransactionController();

transactionRoutes.post(
  "/transact/:walletId",
  validateRequest(TransactionValidation.create),
  exceptionHandler(transactionController.createTransaction)
);

transactionRoutes.get(
  "/transactions/:walletId",
  validateRequest(TransactionValidation.get),

  exceptionHandler(transactionController.getTransactionsByWalletId)
);

transactionRoutes.get(
  "/transaction/download/:walletId",
  validateRequest(TransactionValidation.download),
  exceptionHandler(transactionController.downloadTransactions)
);

module.exports = transactionRoutes;
