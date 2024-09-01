//i wil be creating this to handle user auth , profile, portfolio, transaction history  and for active orders..

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please enter a username "],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please enter a email "],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please enter a password "],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      fullName: String,
      address: String,
      phoneNumber: String,
    },
    portfolio: [
      {
        stock: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Stock",
        },
        quantity: Number,
      },
    ],
    transactionHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    activeOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
