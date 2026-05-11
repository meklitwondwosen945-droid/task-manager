import { useTaskStore } from '../store/taskStore';
import { TaskItem } from './TaskItem';
import { Inbox, Filter } from 'lucide-react';

export const TaskList = () => {
  const { tasks, filter } = useTaskStore();

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
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
        {filteredTasks.length === 0 ? (
          <div className="text-center py-16">
            <Inbox size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl font-semibold text-gray-600 mb-2">
              {filter === 'completed' ? 'No completed tasks yet' : 'No tasks here'}
            </p>
            <p className="text-sm text-gray-500">
              {filter === 'completed' 
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
