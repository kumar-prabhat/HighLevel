const mongoose = require("mongoose");
const walletSchema = new mongoose.Schema(
  {
    name: { type: String },
    balance: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = Wallet = mongoose.model("wallet", walletSchema);
