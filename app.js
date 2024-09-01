require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

const { protect, admin } = require("./middlewares/auth.middleware");
const errorHandler = require("./middlewares/error.middleware");
const logger = require("./middlewares/logger.middleware");
const apiLimiter = require("./middlewares/ratelimit.middleware");

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const stockRoutes = require("./routes/stock.route");
const orderRoute = require("./routes/order.route");
const transactionRoutes = require("./routes/transaction.route");

const connection = require("./config/connection");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(logger);
app.use("/api/", apiLimiter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(200).send("server is working fine");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", protect, userRoutes);
app.use("/api/stocks", protect, admin, stockRoutes);
app.use("/api/orders", protect, orderRoute);
app.use("/api/transactions", protect, transactionRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error.message, error);
  }
});
