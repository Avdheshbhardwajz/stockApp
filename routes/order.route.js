const express = require("express");
const router = express.Router();
const {
  postBuyOrder,
  postSellOrder,
  getOrderById,
  getOrderBook,
  getAllOrders,
  cancelOrder,
} = require("../controllers/order.controller");
const { protect, admin } = require("../middlewares/auth.middleware");

router.post("/buy", protect, postBuyOrder);

router.post("/sell", protect, postSellOrder);

router.get("/:id", protect, getOrderById);

router.get("/book/:stockId", protect, getOrderBook);

router.get("/", protect, admin, getAllOrders);

router.delete("/:id", protect, cancelOrder);

module.exports = router;
