const express = require("express");
const TransactionController = require("../controller/TransactionController");
const transactionRoutes = express.Router();
const transactionController = new TransactionController();

transactionRoutes.post(
  "/transact/:walletId",
  transactionController.createTransaction
);
transactionRoutes.get(
  "/transactions/:walletId",
  transactionController.getTransactionsByWalletId
);
transactionRoutes.get(
  "/transaction/:transactionId",
  transactionController.getTransactionDetails
);

module.exports = transactionRoutes;
