const mongoose = require("mongoose");

const orderBookSchema = new mongoose.Schema(
  {
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    buyOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    sellOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrderBook", orderBookSchema);
