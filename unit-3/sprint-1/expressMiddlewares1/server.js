const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Custom validation middleware
const validateTodo = (req, res, next) => {
  const { ID, Name, Rating, Description, Genre, Cast } = req.body;

  // Initialize an array to store validation errors
  const errors = [];

  // Validate each field
  if (typeof ID !== "number") errors.push("ID must be a number");
  if (typeof Name !== "string") errors.push("Name must be a string");
  if (typeof Rating !== "number") errors.push("Rating must be a number");
  if (typeof Description !== "string")
    errors.push("Description must be a string");
  if (typeof Genre !== "string") errors.push("Genre must be a string");
  if (!Array.isArray(Cast) || !Cast.every((c) => typeof c === "string")) {
    errors.push("Cast must be an array of strings");
  }

  // If there are errors, respond with 400 status code and error messages
  if (errors.length > 0) {
    return res.status(400).json({
      message: "bad request. some data is incorrect.",
      errors,
    });
  }

  // If no errors, proceed to the next middleware/route handler
  next();
};

// POST route with validation middleware
app.post("/", validateTodo, (req, res) => {
  res.status(200).json({ message: "data received" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
