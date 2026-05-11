import { Task } from '../types';
import { useTaskStore } from '../store/taskStore';
import { Trash2, Check, Calendar, Edit2, Clock } from 'lucide-react';
import { useState } from 'react';
import { TaskEditModal } from './TaskEditModal';

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const { toggleTask, deleteTask } = useTaskStore();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const priorityConfig = {
    low: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: '🌱' },
    medium: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', icon: '⚡' },
    high: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: '🔥' },
  };

  const config = priorityConfig[task.priority];

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <>
      <div className={`bg-white rounded-xl shadow-md hover:shadow-lg p-4 border-l-4 ${config.border} transition-all group ${isOverdue ? 'border-red-500' : ''}`}>
        <div className="flex items-start gap-4">
          <button
            onClick={() => toggleTask(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all mt-1 ${
              task.completed
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-500 scale-110'
                : 'border-gray-300 hover:border-blue-500 hover:scale-110'
            }`}
          >
            {task.completed && <Check size={16} className="text-white" strokeWidth={3} />}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={`text-base font-semibold mb-1 transition-all ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`text-sm mb-2 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${config.bg} ${config.text} border ${config.border}`}>
                {config.icon} {task.priority}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar size={12} />
                {new Date(task.createdAt).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric'
                })}
              </span>
              {task.dueDate && (
                <span className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-600 font-semibold' : 'text-blue-600'}`}>
                  <Clock size={12} />
                  Due: {new Date(task.dueDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric'
                  })}
                  {isOverdue && ' (Overdue)'}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditOpen(true)}
              className="flex-shrink-0 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              aria-label="Edit task"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <TaskEditModal task={task} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
    </>
  );
};
