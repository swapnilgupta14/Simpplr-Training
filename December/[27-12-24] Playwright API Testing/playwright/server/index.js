const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const todosFilePath = path.join(__dirname, "todos.json");

const readTodos = () => {
  if (!fs.existsSync(todosFilePath)) {
    fs.writeFileSync(todosFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(todosFilePath);
  return JSON.parse(data);
};

const writeTodos = (todos) => {
  fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
};

app.get("/todos", (req, res) => {
  try {
    const todos = readTodos();
    res.status(200).json({ success: true, todos });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error reading todos", error });
  }
});

app.post("/todos", (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res
        .status(400)
        .json({ success: false, message: "Text is required" });
    }

    const todos = readTodos();
    const newTodo = { id: todos.length + 1, text };
    todos.push(newTodo);
    writeTodos(todos);

    res.status(201).json({ success: true, todo: newTodo });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error adding todo", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
