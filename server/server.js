import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Task from './models/Task.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI && MONGODB_URI !== 'mongodb+srv://meklitwondwosen945_db_user:<db_password>@cluster0.t3yvksc.mongodb.net/taskflow?retryWrites=true&w=majority') {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      console.log('⚠️  Falling back to in-memory storage');
    });
} else {
  console.log('⚠️  No valid MongoDB URI found, using in-memory storage');
  console.log('💡 Update MONGODB_URI in .env file to use MongoDB');
}

// In-memory storage fallback
let tasksInMemory = [];
const useInMemory = !MONGODB_URI || MONGODB_URI.includes('<db_password>');

// Routes

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    if (useInMemory) {
      return res.json(tasksInMemory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single task
app.get('/api/tasks/:id', async (req, res) => {
  try {
    if (useInMemory) {
      const task = tasksInMemory.find(t => t._id === req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.json(task);
    }
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create task
app.post('/api/tasks', async (req, res) => {
  try {
    if (useInMemory) {
      const { v4: uuidv4 } = await import('uuid');
      const task = {
        _id: uuidv4(),
        title: req.body.title,
        description: req.body.description || '',
        priority: req.body.priority || 'medium',
        completed: req.body.completed || false,
        dueDate: req.body.dueDate || null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      tasksInMemory.push(task);
      return res.status(201).json(task);
    }
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    if (useInMemory) {
      const taskIndex = tasksInMemory.findIndex(t => t._id === req.params.id);
      if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
      }
      const task = tasksInMemory[taskIndex];
      if (req.body.title !== undefined) task.title = req.body.title;
      if (req.body.description !== undefined) task.description = req.body.description;
      if (req.body.priority !== undefined) task.priority = req.body.priority;
      if (req.body.completed !== undefined) task.completed = req.body.completed;
      if (req.body.dueDate !== undefined) task.dueDate = req.body.dueDate;
      task.updatedAt = new Date();
      tasksInMemory[taskIndex] = task;
      return res.json(task);
    }
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    if (useInMemory) {
      const taskIndex = tasksInMemory.findIndex(t => t._id === req.params.id);
      if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
      }
      tasksInMemory.splice(taskIndex, 1);
      return res.json({ message: 'Task deleted successfully' });
    }
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
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
