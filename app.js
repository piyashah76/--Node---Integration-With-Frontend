const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let todos = []; // In-memory todo list
let idCounter = 1;

// GET - Show all todos
app.get("/", (req, res) => {
  res.render("index", { todos });
});

// POST - Create a new todo
app.post("/add", (req, res) => {
  const todo = {
    id: idCounter++,
    task: req.body.task,
  };
  todos.push(todo);
  res.redirect("/");
});

// GET - Edit form
app.get("/edit/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  res.render("edit", { todo });
});

// POST - Update a todo
app.post("/update/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  todo.task = req.body.task;
  res.redirect("/");
});

// GET - Delete a todo
app.get("/delete/:id", (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
