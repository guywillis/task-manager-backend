let tasks = [
  { id: 1, title: 'Learn Express.js', completed: false },
  { id: 2, title: 'Build a Task Manager App', completed: false }
];

export default function handler(req, res) {
  const { id } = req.query;
  const taskId = parseInt(id);

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (req.method === 'PUT') {
    const { completed } = req.body;
    task.completed = completed;

    return res.status(200).json(task);
  }

  if (req.method === 'DELETE') {
    tasks = tasks.filter(t => t.id !== taskId);

    return res.status(204).end();
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
