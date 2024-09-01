const express = require("express");
const router = express.Router();
const {
  getAllTransactions,
  getTransactionById,
} = require("../controllers/transaction.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/", protect, getAllTransactions);

router.get("/:id", protect, getTransactionById);

module.exports = router;
