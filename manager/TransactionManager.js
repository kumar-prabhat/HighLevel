const SuperManager = require("./SuperManager");
const Message = require("../constants/Message");
const TransactionDao = require("../dao/TransactionDao");
const WalletDao = require("../dao/WalletDao");
const DBService = require("../services/DBService");
const TransactionType = require("../constants/Transaction");
const ExcelJS = require("exceljs");
const moment = require("moment");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");

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
      if (this.params?.walletId) {
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
        throw NotFoundError(Message.WALLET_NOT_FOUND);
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
            ? Number(walletData?.balance) + Number(data?.amount)
            : Number(walletData?.balance) - Number(data?.amount);
        if (remainingBalance >= 0) {
          data.balance = remainingBalance;
          const res = await transactionDao.create(data);
          await walletDao.update(data?.walletId, { balance: remainingBalance });
          if (this.session) await this.session.commitTransaction();
          return res;
        } else {
          throw BadRequestError(Message.INSUFFICIENT_BALANCE);
        }
      } else {
        throw NotFoundError(Message.WALLET_NOT_FOUND);
      }
    } catch (err) {
      if (this.session) await this.session.abortTransaction();
      throw err;
    } finally {
      if (this.session) this.session.endSession();
    }
  }

  async downloadTransactions() {
    try {
      const walletId = this.params?.walletId;
      if (!walletId) throw NotFoundError(Message.WALLET_NOT_FOUND);
      const transactionWorkbook = new ExcelJS.Workbook();
      const transactionSheet = transactionWorkbook.addWorksheet("Transactions");

      const transactions = await transactionDao.getByWalletId(walletId);

      transactionSheet.getRow(1).getCell(1).value = "Description";
      transactionSheet.getRow(1).getCell(1).font = { bold: true };
      transactionSheet.getRow(1).getCell(2).value = "Amount";
      transactionSheet.getRow(1).getCell(2).font = { bold: true };
      transactionSheet.getRow(1).getCell(3).value = "Balance";
      transactionSheet.getRow(1).getCell(3).font = { bold: true };
      transactionSheet.getRow(1).getCell(4).value = "Transaction Type";
      transactionSheet.getRow(1).getCell(4).font = { bold: true };
      transactionSheet.getRow(1).getCell(5).value = "Date";
      transactionSheet.getRow(1).getCell(5).font = { bold: true };

      for (let [index, transaction] of transactions?.entries()) {
        transactionSheet.getRow(index + 2).getCell(1).value =
          transaction?.description;
        transactionSheet.getRow(index + 2).getCell(2).value =
          transaction?.amount;
        transactionSheet.getRow(index + 2).getCell(3).value =
          transaction?.balance;
        transactionSheet.getRow(index + 2).getCell(4).value =
          transaction?.transactionType;
        transactionSheet.getRow(index + 2).getCell(5).value = moment(
          transaction?.date
        ).format("DD/MM/YYYY");
      }

      const workbook = await transactionWorkbook.xlsx.writeBuffer();
      return {
        attachment: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${workbook.toString(
          "base64"
        )}`,
        name: "transactions.csv",
      };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = TransactionManager;
