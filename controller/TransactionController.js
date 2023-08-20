const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const TransactionManager = require("../manager/TransactionManager");
const formatResponse = require("../middlewares/FormatResponse");

class TransactionController {
  constructor() {}

  async getTransactionsByWalletId(req, res) {
    const result = await new TransactionManager(
      req
    ).getTransactionsByWalletId();
    return res
      .status(StatusCodes.OK)
      .json(
        formatResponse(StatusCodes.OK, false, "", ReasonPhrases.OK, result)
      );
  }

  async getTransactionDetails(req, res) {
    const result = await new TransactionManager(req).getTransactionDetails();
    return res
      .status(StatusCodes.OK)
      .json(
        formatResponse(StatusCodes.OK, false, "", ReasonPhrases.OK, result)
      );
  }

  async createTransaction(req, res) {
    const result = await new TransactionManager(req).createTransaction();
    return res
      .status(StatusCodes.OK)
      .json(
        formatResponse(StatusCodes.OK, false, "", ReasonPhrases.OK, result)
      );
  }

  async downloadTransactions(req, res) {
    const result = await new TransactionManager(req).downloadTransactions();
    return res
      .status(StatusCodes.OK)
      .json(
        formatResponse(StatusCodes.OK, false, "", ReasonPhrases.OK, result)
      );
  }
}

module.exports = TransactionController;
