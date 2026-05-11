import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { TaskItem } from './TaskItem';
import { Inbox, Filter, ArrowUpDown } from 'lucide-react';
import { SearchBar } from './SearchBar';

export const TaskList = () => {
  const { tasks, filter } = useTaskStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'title'>('date');

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter((task) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const getTitle = () => {
    if (filter === 'all') return '📋 All Tasks';
    if (filter === 'active') return '⚡ Active Tasks';
    return '✅ Completed Tasks';
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Filter size={24} />
            <h2 className="text-xl font-bold">{getTitle()}</h2>
          </div>
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
            {filteredTasks.length}
          </span>
        </div>
      </div>

      <div className="p-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <div className="flex items-center gap-2 mb-4">
          <ArrowUpDown size={16} className="text-gray-500" />
          <label htmlFor="sort-select" className="text-sm text-gray-600 font-medium">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'title')}
            className="text-sm px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Date Created</option>
            <option value="priority">Priority</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-16">
            <Inbox size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl font-semibold text-gray-600 mb-2">
              {searchQuery
                ? 'No tasks found'
                : filter === 'completed'
                ? 'No completed tasks yet'
                : 'No tasks here'}
            </p>
            <p className="text-sm text-gray-500">
              {searchQuery
                ? 'Try a different search term'
                : filter === 'completed'
                ? 'Complete some tasks to see them here!'
                : 'Create a new task to get started!'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className="animate-slide-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TaskItem task={task} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
