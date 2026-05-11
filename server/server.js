import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (temporary until MongoDB is set up)
let tasks = [];

console.log('✅ Server started with in-memory storage');
console.log('💡 To use MongoDB, update MONGODB_URI in .env file');

// Routes

// Get all tasks
app.get('/api/tasks', (req, res) => {
  try {
    res.json(tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single task
app.get('/api/tasks/:id', (req, res) => {
  try {
    const task = tasks.find(t => t._id === req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create task
app.post('/api/tasks', (req, res) => {
  try {
    const task = {
      _id: uuidv4(),
      title: req.body.title,
      description: req.body.description || '',
      priority: req.body.priority || 'medium',
      completed: req.body.completed || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    tasks.push(task);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
  try {
    const taskIndex = tasks.findIndex(t => t._id === req.params.id);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const task = tasks[taskIndex];
    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.description !== undefined) task.description = req.body.description;
    if (req.body.priority !== undefined) task.priority = req.body.priority;
    if (req.body.completed !== undefined) task.completed = req.body.completed;
    task.updatedAt = new Date();

    tasks[taskIndex] = task;
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const taskIndex = tasks.findIndex(t => t._id === req.params.id);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
