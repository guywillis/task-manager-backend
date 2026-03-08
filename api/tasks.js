// // api/tasks.js
// const express = require('express');
// const app = express();

// // Middleware to parse JSON request body
// app.use(express.json());

// // In-memory task list (You can replace this with a database later)
// let tasks = [
//   { id: 1, title: 'Learn Express.js', completed: false },
//   { id: 2, title: 'Build a Task Manager App', completed: false }
// ];

// // GET /tasks - Get all tasks
// app.get('/tasks', (req, res) => {
//   res.json(tasks);
// });

// // POST /tasks - Add a new task
// app.post('/tasks', (req, res) => {
//   const { title } = req.body;
//   const newTask = {
//     id: tasks.length + 1,
//     title,
//     completed: false,
//   };
//   tasks.push(newTask);
//   res.status(201).json(newTask);
// });

// // PUT /tasks/:id - Update a task by ID
// app.put('/tasks/:id', (req, res) => {
//   const taskId = parseInt(req.params.id);
//   const task = tasks.find((task) => task.id === taskId);
//   if (!task) {
//     return res.status(404).json({ message: 'Task not found' });
//   }
//   task.completed = req.body.completed;
//   res.json(task);
// });

// // DELETE /tasks/:id - Delete a task by ID
// app.delete('/tasks/:id', (req, res) => {
//   const taskId = parseInt(req.params.id);
//   tasks = tasks.filter((task) => task.id !== taskId);
//   res.status(204).end();
// });

// // Export the function as a serverless handler for Vercel
// module.exports = (req, res) => {
//   app(req, res);  // Pass the request to Express
// };

//

let tasks = [
  { id: 1, title: 'Learn Express.js', completed: false },
  { id: 2, title: 'Build a Task Manager App', completed: false }
];

module.exports = (req, res) => {
  if (req.method === 'GET') {
    // Respond with all tasks
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    // Add a new task
    const { title } = req.body;
    const newTask = { id: tasks.length + 1, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else if (req.method === 'PUT') {
    // Update a task by ID (from URL parameter)
    const taskId = parseInt(req.params.id); // Changed from req.query.id to req.params.id
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    const { completed } = req.body;
    task.completed = completed;
    res.status(200).json(task);
  } else if (req.method === 'DELETE') {
    // Delete a task by ID (from URL parameter)
    const taskId = parseInt(req.params.id); // Changed from req.query.id to req.params.id
    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).end();
  } else {
    // Method Not Allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
