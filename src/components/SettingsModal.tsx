import { X, Trash2, Download, Upload, Info } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);

  if (!isOpen) return null;

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `taskflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    // CSV Header
    const headers = ['Title', 'Description', 'Priority', 'Completed', 'Created Date', 'Due Date'];
    
    // CSV Rows
    const rows = tasks.map(task => [
      `"${task.title.replace(/"/g, '""')}"`,
      `"${task.description.replace(/"/g, '""')}"`,
      task.priority,
      task.completed ? 'Yes' : 'No',
      new Date(task.createdAt).toISOString(),
      task.dueDate ? new Date(task.dueDate).toISOString() : ''
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `taskflow-tasks-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedTasks = JSON.parse(event.target?.result as string);
            if (Array.isArray(importedTasks)) {
              importedTasks.forEach(task => {
                addTask({
                  title: task.title,
                  description: task.description || '',
                  priority: task.priority || 'medium',
                  completed: task.completed || false,
                  dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
                });
              });
              alert(`Successfully imported ${importedTasks.length} tasks!`);
              onClose();
            } else {
              alert('Invalid JSON format. Expected an array of tasks.');
            }
          } catch (error) {
            alert('Invalid JSON file format');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleImportCSV = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const csvContent = event.target?.result as string;
            const lines = csvContent.split('\n');
            
            // Skip header row
            const dataLines = lines.slice(1).filter(line => line.trim());
            
            let importCount = 0;
            dataLines.forEach(line => {
              // Parse CSV line (handle quoted fields)
              const matches = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
              if (matches && matches.length >= 4) {
                const [title, description, priority, completed, createdDate, dueDate] = matches.map(
                  field => field.replace(/^"|"$/g, '').replace(/""/g, '"')
                );

                addTask({
                  title: title || 'Untitled Task',
                  description: description || '',
                  priority: (priority?.toLowerCase() as 'low' | 'medium' | 'high') || 'medium',
                  completed: completed?.toLowerCase() === 'yes',
                  dueDate: dueDate ? new Date(dueDate) : undefined,
                });
                importCount++;
              }
            });

            alert(`Successfully imported ${importCount} tasks from CSV!`);
            onClose();
          } catch (error) {
            alert('Error parsing CSV file. Please check the format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearAllTasks = () => {
    if (window.confirm('Are you sure you want to delete all tasks? This cannot be undone.')) {
      tasks.forEach(task => {
        useTaskStore.getState().deleteTask(task.id);
      });
      alert('All tasks have been deleted');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-in">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between text-white">
            <h2 className="text-2xl font-bold">Settings</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
              aria-label="Close settings"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* App Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">TaskFlow v1.0</h3>
                <p className="text-sm text-gray-600">
                  A modern task management application built with React, TypeScript, and Express.
                </p>
              </div>
            </div>
          </div>

          {/* Export Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Export Tasks</h3>
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleExportJSON}
                className="w-full flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl transition-all text-left"
              >
                <div className="p-2 bg-green-500 text-white rounded-lg">
                  <Download size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Export as JSON</p>
                  <p className="text-sm text-gray-600">Download tasks with full data</p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleExportCSV}
                className="w-full flex items-center gap-3 p-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all text-left"
              >
                <div className="p-2 bg-emerald-500 text-white rounded-lg">
                  <Download size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Export as CSV</p>
                  <p className="text-sm text-gray-600">Download for Excel/Sheets</p>
                </div>
              </button>
            </div>
          </div>

          {/* Import Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Import Tasks</h3>
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleImportJSON}
                className="w-full flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all text-left"
              >
                <div className="p-2 bg-blue-500 text-white rounded-lg">
                  <Upload size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Import from JSON</p>
                  <p className="text-sm text-gray-600">Upload JSON backup file</p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleImportCSV}
                className="w-full flex items-center gap-3 p-4 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-xl transition-all text-left"
              >
                <div className="p-2 bg-cyan-500 text-white rounded-lg">
                  <Upload size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Import from CSV</p>
                  <p className="text-sm text-gray-600">Upload CSV file from Excel/Sheets</p>
                </div>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <h3 className="text-lg font-bold text-red-600 mb-3">Danger Zone</h3>
            <button
              type="button"
              onClick={handleClearAllTasks}
              className="w-full flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-all text-left"
            >
              <div className="p-2 bg-red-500 text-white rounded-lg">
                <Trash2 size={20} />
              </div>
              <div>
                <p className="font-semibold text-red-800">Clear All Tasks</p>
                <p className="text-sm text-red-600">Permanently delete all tasks</p>
              </div>
            </button>
          </div>

          {/* Stats */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Statistics</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white rounded-lg p-3">
                <p className="text-2xl font-bold text-blue-600">{tasks.length}</p>
                <p className="text-xs text-gray-600">Total Tasks</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-2xl font-bold text-green-600">
                  {tasks.filter(t => t.completed).length}
                </p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-2xl border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
