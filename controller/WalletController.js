const { StatusCodes } = require("http-status-codes");
const WalletManager = require("../manager/WalletManager");

class WalletController {
  constructor() {}

  async getWalletDetails(req, res) {
    const result = await new WalletManager(req).getWalletDetails();
    return res.status(StatusCodes.OK).json({ status: StatusCodes.OK, result });
  }

  async initializeWallet(req, res) {
    const result = await new WalletManager(req).initializeWallet();
    return res.status(StatusCodes.OK).json({ status: StatusCodes.OK, result });
  }

  async updateWallet(req, res) {
    const result = await new WalletManager(req).updateWallet();
    return res.status(StatusCodes.OK).json({ status: StatusCodes.OK, result });
  }
}

module.exports = WalletController;
