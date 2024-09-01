const asyncHandler = require("express-async-handler");
const Order = require("../models/order.model");
const Stock = require("../models/stock.model");
const User = require("../models/user.model");

// Post a buy order
const postBuyOrder = asyncHandler(async (req, res) => {
  const { stockId, quantity, price } = req.body;
  const user = req.user._id;

  const newOrder = new Order({
    user,
    stock: stockId,
    quantity,
    price,
    type: "buy",
  });

  const savedOrder = await newOrder.save();
  res.status(201).json(savedOrder);
});

// Post a sell order
const postSellOrder = asyncHandler(async (req, res) => {
  const { stockId, quantity, price } = req.body;
  const user = req.user._id;

  const newOrder = new Order({
    user,
    stock: stockId,
    quantity,
    price,
    type: "sell",
  });

  const savedOrder = await newOrder.save();
  res.status(201).json(savedOrder);
});

// Get an order by ID
const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId)
    .populate("stock")
    .populate("user");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json(order);
});

// Get the order book for a stock
const getOrderBook = asyncHandler(async (req, res) => {
  const stockId = req.params.stockId;

  // Get all buy orders
  const buyOrders = await Order.find({ stock: stockId, type: "buy" }).sort({
    price: -1,
  });

  // Get all sell orders
  const sellOrders = await Order.find({ stock: stockId, type: "sell" }).sort({
    price: 1,
  });

  res.json({ buyOrders, sellOrders });
});

// Get all orders for a user
const getAllOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orders = await Order.find({ user: userId }).populate("stock");

  res.json(orders);
});

// Cancel an order by ID
const cancelOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to cancel this order");
  }

  await Order.findByIdAndDelete(orderId);
  res.json({ message: "Order canceled successfully" });
});

module.exports = {
  postBuyOrder,
  postSellOrder,
  getOrderById,
  getOrderBook,
  getAllOrders,
  cancelOrder,
};
