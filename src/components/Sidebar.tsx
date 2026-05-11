import { CheckSquare, Sparkles, Calendar, TrendingUp, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { SettingsModal } from './SettingsModal';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  const menuItems = [
    { id: 'all', label: 'All Tasks', icon: <TrendingUp size={20} />, count: stats.total },
    { id: 'active', label: 'Active', icon: <Calendar size={20} />, count: stats.active },
    { id: 'completed', label: 'Completed', icon: <CheckSquare size={20} />, count: stats.completed },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg text-gray-700 hover:bg-white transition-all"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:fixed top-0 left-0 h-full w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <CheckSquare size={32} className="text-white" strokeWidth={2.5} />
                </div>
                <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-500 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-xs text-gray-500">Productivity Suite</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
            <p className="text-sm font-medium text-gray-600 mb-3">Today's Progress</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-gray-800">{stats.completed}</span>
              <span className="text-sm text-gray-500">of {stats.total} tasks</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Navigation</p>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setFilter(item.id as any);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      filter === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-sm font-semibold ${
                        filter === item.id
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsSettingsOpen(true)}
              className="w-full flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
            >
              <Settings size={20} />
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};
