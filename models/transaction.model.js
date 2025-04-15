const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: 0,
    },

    date: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      default: "Leisure",
      enum: ["Leisure", "Entertainment", "Medical", "Personal Care", "Study"],
    },

    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
