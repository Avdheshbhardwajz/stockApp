const asyncHandler = require("express-async-handler");
const Transaction = require("../models/transaction.model");

// Get all transactions
const getAllTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find()
    .populate("user")
    .populate("stock");
  res.json(transactions);
});

// Get a transaction by ID
const getTransactionById = asyncHandler(async (req, res) => {
  const transactionId = req.params.id;
  const transaction = await Transaction.findById(transactionId)
    .populate("user")
    .populate("stock");

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  res.json(transaction);
});

module.exports = {
  getAllTransactions,
  getTransactionById,
};
