import { Task } from '../types';
import { config } from '../config';

const API_URL = `${config.apiUrl}/api`;

export const taskAPI = {
  // Get all tasks
  getTasks: async (): Promise<Task[]> => {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    const data = await response.json();
    return data.map((task: any) => ({
      ...task,
      id: task._id,
      createdAt: new Date(task.createdAt),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    }));
  },

  // Create task
  createTask: async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to create task');
    const data = await response.json();
    return {
      ...data,
      id: data._id,
      createdAt: new Date(data.createdAt),
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    };
  },

  // Update task
  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update task');
    const data = await response.json();
    return {
      ...data,
      id: data._id,
      createdAt: new Date(data.createdAt),
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    };
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
  },
};
