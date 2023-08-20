const SuperManager = require("./SuperManager");
const Message = require("../constants/Message");
const TransactionDao = require("../dao/TransactionDao");
const WalletDao = require("../dao/WalletDao");
const DBService = require("../services/DBService");
const TransactionType = require("../constants/Transaction");

const transactionDao = new TransactionDao();
const walletDao = new WalletDao();

class TransactionManager extends SuperManager {
  constructor(req) {
    super(req);
  }

  getSortFilter(sortOption) {
    switch (sortOption) {
      case "createdAt":
        return { createdAt: -1 };
      case "amount":
        return { amount: -1 };
    }
  }

  async getTransactionsByWalletId() {
    try {
      if (this.params.walletId) {
        let filter = {};
        if (this?.query?.filter) {
          filter = JSON?.parse(this?.query?.filter);
        }
        const transactionsCount = await transactionDao.getCountByWalletId(
          this.params.walletId
        );
        const transactions = await transactionDao.getByWalletId(
          this.params.walletId,
          this.getSortFilter(filter?.sort),
          filter?.limit,
          filter?.skip
        );
        return { transactions, transactionsCount };
      } else {
        throw new Error(Message.WALLET_NOT_FOUND);
      }
    } catch (err) {
      throw err;
    }
  }

  async createTransaction() {
    try {
      let db = await DBService.getConnection();
      this.session = await db.startSession();
      this.session.startTransaction();
      let data = this.body;
      data.walletId = this.params?.walletId;
      if (data?.walletId) {
        const walletData = await walletDao.getById(data?.walletId);
        const remainingBalance =
          data?.transactionType === TransactionType.CREDIT
            ? parseInt(walletData?.balance) + parseInt(data?.amount)
            : parseInt(walletData?.balance) - parseInt(data?.amount);
        if (remainingBalance >= 0) {
          data.balance = remainingBalance;
          const res = await transactionDao.create(data);
          await walletDao.update(data?.walletId, { balance: remainingBalance });
          if (this.session) await this.session.commitTransaction();
          return res;
        } else {
          throw new Error(Message.INSUFFICIENT_BALANCE);
        }
      } else {
        throw new Error(Message.WALLET_NOT_FOUND);
      }
    } catch (err) {
      if (this.session) await this.session.abortTransaction();
      throw err;
    } finally {
      if (this.session) this.session.endSession();
    }
  }
}

module.exports = TransactionManager;
