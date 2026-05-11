import { useTaskStore } from '../store/taskStore';
import { CheckCircle2, Circle, TrendingUp, Target } from 'lucide-react';

export const TaskStats = () => {
  const tasks = useTaskStore((state) => state.tasks);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const highPriorityTasks = tasks.filter((t) => t.priority === 'high' && !t.completed).length;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: <TrendingUp size={28} />,
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'In Progress',
      value: activeTasks,
      icon: <Circle size={28} />,
      gradient: 'from-orange-500 to-yellow-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: <CheckCircle2 size={28} />,
      gradient: 'from-green-500 to-emerald-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      label: 'High Priority',
      value: highPriorityTasks,
      icon: <Target size={28} />,
      gradient: 'from-red-500 to-pink-500',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-5 border border-gray-200/50 hover:shadow-xl transition-all animate-slide-in hover:scale-105"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`inline-flex p-3 rounded-xl ${stat.iconBg} ${stat.iconColor} mb-3`}>
              {stat.icon}
            </div>
            <p className="text-3xl font-extrabold text-gray-800 mb-1">{stat.value}</p>
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {totalTasks > 0 && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-800">Overall Progress</h3>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {completionRate}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
              style={{ width: `${completionRate}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
      )}
    </div>
  );
};
