const asyncHandler = require("express-async-handler");
const Stock = require("../models/stock.model");

// Add a new stock (Admin only)
const addStock = asyncHandler(async (req, res) => {
  const { name, symbol, initialPrice } = req.body;

  const stock = new Stock({
    name,
    symbol,
    currentPrice: initialPrice,
  });

  const createdStock = await stock.save();
  res.status(201).json(createdStock);
});

// Update stock details (Admin only)
const updateStock = asyncHandler(async (req, res) => {
  const { name, symbol, currentPrice } = req.body;

  const stock = await Stock.findById(req.params.id);

  if (stock) {
    stock.name = name || stock.name;
    stock.symbol = symbol || stock.symbol;
    stock.currentPrice = currentPrice || stock.currentPrice;

    const updatedStock = await stock.save();
    res.json(updatedStock);
  } else {
    res.status(404);
    throw new Error("Stock not found");
  }
});

// Remove a stock from the platform (Admin only)
const removeStock = asyncHandler(async (req, res) => {
  const stock = await Stock.findById(req.params.id);

  if (stock) {
    await stock.remove();
    res.json({ message: "Stock removed" });
  } else {
    res.status(404);
    throw new Error("Stock not found");
  }
});

// Get a list of all stocks
const getAllStocks = asyncHandler(async (req, res) => {
  const stocks = await Stock.find({});
  res.json(stocks);
});

// Get details of a specific stock
const getStockById = asyncHandler(async (req, res) => {
  const stock = await Stock.findById(req.params.id);

  if (stock) {
    res.json(stock);
  } else {
    res.status(404);
    throw new Error("Stock not found");
  }
});

module.exports = {
  addStock,
  updateStock,
  removeStock,
  getAllStocks,
  getStockById,
};
