const express = require("express");

require("dotenv").config();

const connection = require("./config/connection");

const app = express();

app.get("/", (req, res) => {
  res.send(200).send("server is working fine");
});

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error.message, error);
  }
});
