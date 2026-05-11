import { useEffect } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskStats } from './components/TaskStats';
import { Sidebar } from './components/Sidebar';
import { useTaskStore } from './store/taskStore';
import { Loader2, WifiOff } from 'lucide-react';

function App() {
  const { fetchTasks, loading, error } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 ml-0 lg:ml-80">
          {error && (
            <div className="mb-6 bg-red-50/90 backdrop-blur-sm border-l-4 border-red-500 rounded-xl p-5 flex items-start gap-4 text-red-700 shadow-lg animate-slide-in">
              <WifiOff size={24} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-lg mb-1">Connection Error</p>
                <p className="text-sm">Make sure the backend server is running on http://localhost:5000</p>
              </div>
            </div>
          )}

          {loading && !error ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 size={56} className="text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600 text-lg">Loading your tasks...</p>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <TaskStats />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Task Form - Takes 1 column */}
                <div className="lg:col-span-1">
                  <TaskForm />
                </div>
                
                {/* Task List - Takes 2 columns */}
                <div className="lg:col-span-2">
                  <TaskList />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
