const asyncHandler = require("express-async-handler");
const Stock = require("../models/stock.model");
const Order = require("../models/order.model");

// Get market data for a specific stock
const getMarketData = asyncHandler(async (req, res) => {
  const stockId = req.params.stockId;
  const stock = await Stock.findById(stockId);

  if (!stock) {
    res.status(404);
    throw new Error("Stock not found");
  }

  // Get the latest price for the stock
  const latestOrders = await Order.find({ stock: stockId })
    .sort({ createdAt: -1 })
    .limit(1);
  const lastTradedPrice =
    latestOrders.length > 0 ? latestOrders[0].price : stock.price;

  // Calculate highest bid and lowest ask
  const highestBid = await Order.find({ stock: stockId, type: "buy" })
    .sort({ price: -1 })
    .limit(1);
  const lowestAsk = await Order.find({ stock: stockId, type: "sell" })
    .sort({ price: 1 })
    .limit(1);

  res.json({
    stock: stock.name,
    symbol: stock.symbol,
    lastTradedPrice,
    highestBid: highestBid.length > 0 ? highestBid[0].price : null,
    lowestAsk: lowestAsk.length > 0 ? lowestAsk[0].price : null,
  });
});

// Get market summary report
const getMarketSummary = asyncHandler(async (req, res) => {
  // Get the most actively traded stocks
  const stocks = await Stock.find({});
  let summary = [];

  for (const stock of stocks) {
    const tradeCount = await Order.countDocuments({ stock: stock._id });
    summary.push({
      stock: stock.name,
      symbol: stock.symbol,
      tradeCount,
    });
  }

  // Sort by the most actively traded stock
  summary = summary.sort((a, b) => b.tradeCount - a.tradeCount);

  res.json({
    mostActivelyTradedStock: summary.length > 0 ? summary[0] : null,
    overallMarketTrend:
      summary.length > 0
        ? summary.map((stock) => ({
            stock: stock.stock,
            symbol: stock.symbol,
            tradeCount: stock.tradeCount,
          }))
        : [],
  });
});

module.exports = {
  getMarketData,
  getMarketSummary,
};
