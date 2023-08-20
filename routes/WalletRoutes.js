const express = require("express");
const WalletController = require("../controller/WalletController");
const walletRoutes = express.Router();
const walletController = new WalletController();

walletRoutes.post("/setup", walletController.initializeWallet);
walletRoutes.get("/wallet/:walletId", walletController.getWalletDetails);

module.exports = walletRoutes;
