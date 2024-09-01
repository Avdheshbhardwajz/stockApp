const morgan = require("morgan");

// Middleware for logging requests
const logger = morgan("dev");

module.exports = logger;
