const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter a stock name"],
      unique: true,
    },
    symbol: {
      type: String,
      required: [true, "please enter a stock symbol"],
      unique: true,
    },
    initialPrice: {
      type: Number,
      required: [true, "please enter a stock price"],
    },
    lastTradedPrice: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stock", stockSchema);
