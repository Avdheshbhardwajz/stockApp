const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const dbFile = "./db.json";

app.use(express.json());

// Function to read data from the database
const readDb = () => {
  const data = fs.readFileSync(dbFile);
  return JSON.parse(data);
};

// Function to write data into the database
const writeDb = (data) => {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
};

// Route to get all the todos
app.get("/todos", (req, res) => {
  const db = readDb();
  res.json(db.todos);
});

// Route to add a new todo in the database
app.post("/todos", (req, res) => {
  const db = readDb();
  const newTodo = req.body;
  newTodo.id = db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 1;
  db.todos.push(newTodo);
  writeDb(db);
  res.status(201).json(newTodo);
});

// Route to update the status of todos with even IDs
app.put("/todos/update-even-status", (req, res) => {
  const db = readDb();
  db.todos.forEach((ele) => {
    if (ele.id % 2 === 0 && ele.status === false) {
      ele.status = true;
    }
  });
  writeDb(db);
  res.json(db.todos);
});

// Route to delete the todos with status true
app.delete("/todos/delete-true-status", (req, res) => {
  let db = readDb();
  db.todos = db.todos.filter((todo) => !todo.status);
  writeDb(db);
  res.status(204).send();
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
