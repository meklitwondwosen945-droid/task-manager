import { create } from 'zustand';
import { Task, TaskFilter } from '../types';
import { taskAPI } from '../services/api';

interface TaskStore {
  tasks: Task[];
  filter: TaskFilter;
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  setFilter: (filter: TaskFilter) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filter: 'all',
  loading: false,
  error: null,
  
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await taskAPI.getTasks();
      set({ tasks, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', loading: false });
      console.error('Error fetching tasks:', error);
    }
  },
  
  addTask: async (task) => {
    set({ loading: true, error: null });
    try {
      const newTask = await taskAPI.createTask(task);
      set((state) => ({ 
        tasks: [newTask, ...state.tasks],
        loading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to create task', loading: false });
      console.error('Error creating task:', error);
    }
  },
  
  toggleTask: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;
    
    try {
      const updatedTask = await taskAPI.updateTask(id, { completed: !task.completed });
      set((state) => ({
        tasks: state.tasks.map((t) => t.id === id ? updatedTask : t),
      }));
    } catch (error) {
      set({ error: 'Failed to update task' });
      console.error('Error updating task:', error);
    }
  },
  
  deleteTask: async (id) => {
    try {
      await taskAPI.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      set({ error: 'Failed to delete task' });
      console.error('Error deleting task:', error);
    }
  },
  
  updateTask: async (id, updates) => {
    try {
      const updatedTask = await taskAPI.updateTask(id, updates);
      set((state) => ({
        tasks: state.tasks.map((task) => task.id === id ? updatedTask : task),
      }));
    } catch (error) {
      set({ error: 'Failed to update task' });
      console.error('Error updating task:', error);
    }
  },
  
  setFilter: (filter) => set({ filter }),
}));
