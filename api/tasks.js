const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON request body

// In-memory task list (You can replace this with a database later)
let tasks = [
  { id: 1, title: 'Learn Express.js', completed: false },
  { id: 2, title: 'Build a Task Manager App', completed: false },
];

// GET /tasks - Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks - Add a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update a task by ID
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  task.completed = req.body.completed;
  res.json(task);
});

// DELETE /tasks/:id - Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.status(204).end();
});

// Export the Express app as a serverless function
module.exports = (req, res) => {
  app(req, res);  // Pass the request to the Express app
};
