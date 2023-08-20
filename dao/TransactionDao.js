const Transaction = require("../models/Transaction");

class TransactionDao {
  constructor(_session = null) {
    this.session = _session ?? null;
  }

  setSession(_session = null) {
    this.session = _session ?? null;
  }

  async getByWalletId(walletId, sort = {}, limit = 10, skip = 0) {
    return new Promise((resolve, reject) => {
      Transaction.find({ walletId })
        .sort({ ...sort })
        .limit(limit)
        .skip(skip)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  async getCountByWalletId(walletId) {
    return new Promise((resolve, reject) => {
      Transaction.find({ walletId })
        .countDocuments()
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  async create(data) {
    return new Promise((resolve, reject) => {
      new Transaction(data)
        .save({ session: this.session })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}

module.exports = TransactionDao;
