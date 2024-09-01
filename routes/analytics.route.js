const express = require("express");
const router = express.Router();
const {
  getMarketSummary,
  getMarketDataByStock,
} = require("../controllers/market.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/summary", protect, getMarketSummary);

router.get("/stock/:id/data", protect, getMarketDataByStock);

module.exports = router;
