const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const WalletManager = require("../manager/WalletManager");
const formatResponse = require("../middlewares/FormatResponse");

class WalletController {
  constructor() {}

  async getWalletDetails(req, res) {
    const result = await new WalletManager(req).getWalletDetails();
    return res
      .status(StatusCodes.OK)
      .json(
        formatResponse(StatusCodes.OK, false, "", ReasonPhrases.OK, result)
      );
  }

  async initializeWallet(req, res) {
    const result = await new WalletManager(req).initializeWallet();
    return res
      .status(StatusCodes.OK)
      .json(
        formatResponse(StatusCodes.OK, false, "", ReasonPhrases.OK, result)
      );
  }
}

module.exports = WalletController;
