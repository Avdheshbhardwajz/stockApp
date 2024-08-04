const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(logger);

// Routes setup
app.use(courseRoutes);
app.use(userRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
