const express = require('express');
const app = express();

app.use(express.json()); // allows JSON request bodies

// In-memory todo list
let todos = [
  { id: 1, task: "Learn Node", done: true }
];


// -------------------------
// 🟦 GET /todos → List all
// -------------------------
app.get('/todos', (req, res) => {
  res.json(todos);
});


// --------------------------------------
// 🟩 POST /todos → Add a new task
// body: { "task": "Practice Express" }
// --------------------------------------
app.post('/todos', (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }

  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    task,
    done: false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});


// -------------------------------------------------------
// 🟧 PATCH /todos/:id → Update done to true
// Output:
// { "message": "Task updated", "todo": { id:1, task:"Learn Node", done:true } }
// -------------------------------------------------------
app.patch('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Task not found" });
  }

  todo.done = true;

  res.json({
    message: "Task updated",
    todo
  });
});


// -------------------------
// 🚀 Start Server
// -------------------------
app.listen(3000, () => {
  console.log("Server running on port 3000");
});