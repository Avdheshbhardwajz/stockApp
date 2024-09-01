const express = require("express");
const router = express.Router();
const {
  addStock,
  updateStock,
  removeStock,
  getAllStocks,
  getStockById,
} = require("../controllers/stock.controller");
const { protect, admin } = require("../middlewares/auth.middleware");

router.post("/", protect, admin, addStock);

router.put("/:id", protect, admin, updateStock);

router.delete("/:id", protect, admin, removeStock);

router.get("/", getAllStocks);

router.get("/:id", getStockById);

module.exports = router;
