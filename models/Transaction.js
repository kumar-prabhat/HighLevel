const mongoose = require("mongoose");
const TransactionType = require("../constants/Transaction");
const transactionSchema = new mongoose.Schema(
  {
    walletId: { type: String, ref: "Wallet" },
    transactionType: { type: String, enum: Object.keys(TransactionType) },
    amount: { type: Number },
    description: { type: String },
    balance: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = Transaction = mongoose.model("transaction", transactionSchema);
