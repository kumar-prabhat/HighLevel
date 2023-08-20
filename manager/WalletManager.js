const SuperManager = require("./SuperManager");
const Message = require("../constants/Message");
const WalletDao = require("../dao/WalletDao");
const NotFoundError = require("../errors/NotFoundError");

const walletDao = new WalletDao();

class WalletManager extends SuperManager {
  constructor(req) {
    super(req);
  }

  async getWalletDetails() {
    try {
      if (this.params?.walletId) {
        const walletData = await walletDao.getById(this.params.walletId);
        return walletData;
      } else {
        throw NotFoundError(Message.WALLET_NOT_FOUND);
      }
    } catch (err) {
      throw err;
    }
  }

  async initializeWallet() {
    try {
      let data = this.body;
      const res = await walletDao.initialize(data);
      return res;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = WalletManager;
