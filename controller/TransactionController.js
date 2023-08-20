const { StatusCodes } = require("http-status-codes");
const TransactionManager = require("../manager/TransactionManager");

class TransactionController {
  constructor() {}

  async getTransactionsByWalletId(req, res) {
    const result = await new TransactionManager(
      req
    ).getTransactionsByWalletId();
    return res.status(StatusCodes.OK).json({ status: StatusCodes.OK, result });
  }

  async getTransactionDetails(req, res) {
    const result = await new TransactionManager(req).getTransactionDetails();
    return res.status(StatusCodes.OK).json({ status: StatusCodes.OK, result });
  }

  async createTransaction(req, res) {
    const result = await new TransactionManager(req).createTransaction();
    return res.status(StatusCodes.OK).json({ status: StatusCodes.OK, result });
  }
}

module.exports = TransactionController;
