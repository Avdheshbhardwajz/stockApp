const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getUserTransactions,
  getUserOrders,
} = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/profile", protect, getUserProfile);

router.put("/profile", protect, updateUserProfile);

router.get("/:id/transactions", protect, getUserTransactions);

router.get("/:id/orders", protect, getUserOrders);

module.exports = router;
