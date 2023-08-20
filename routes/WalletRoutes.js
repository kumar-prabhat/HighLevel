const express = require("express");
const validateRequest = require("../middlewares/ValidateRequest");
const WalletValidation = require("../validations/WalletValidation");
const exceptionHandler = require("../middlewares/ExceptionHandler");
const WalletController = require("../controller/WalletController");
const walletRoutes = express.Router();
const walletController = new WalletController();

walletRoutes.post(
  "/setup",
  validateRequest(WalletValidation.setup),
  exceptionHandler(walletController.initializeWallet)
);
walletRoutes.get(
  "/wallet/:walletId",
  validateRequest(WalletValidation.get),
  exceptionHandler(walletController.getWalletDetails)
);

module.exports = walletRoutes;
