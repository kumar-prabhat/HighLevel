const Wallet = require("../models/Wallet");

class WalletDao {
  session = null;
  constructor(_session = null) {
    this.session = _session ?? null;
  }

  setSession(_session = null) {
    this.session = _session ?? null;
  }
  async initialize(data) {
    return new Promise((resolve, reject) => {
      new Wallet(data)
        .save({ session: this.session })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  async update(id, data) {
    return new Promise((resolve, reject) => {
      let options = { new: true, session: this.session };
      Wallet.findByIdAndUpdate(id, data, options)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  async getById(id) {
    return new Promise((resolve, reject) => {
      Wallet.findById(id)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
}

module.exports = WalletDao;
