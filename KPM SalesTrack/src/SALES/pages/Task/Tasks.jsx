import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Search, Clock, CheckCircle } from 'lucide-react';

const API_BASE_URL = 'http://127.0.0.1:5000/tasks';

export default function SalesTasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);

  const getToken = () => localStorage.getItem('token');
  
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const decoded = JSON.parse(jsonPayload);
      const id = decoded.sub || decoded.id; 
      return parseInt(id, 10);
    } catch (e) {
      console.error('Failed to decode token:', e);
      return null;
    }
  };


  useEffect(() => {
    const token = getToken();
    if (!token) {
      setError('No authentication token found. Please ensure you are logged in.');
      setLoading(false);
      return;
    }

    const decodedUserId = decodeToken(token);
    
    if (!decodedUserId || isNaN(decodedUserId)) {
      setError('Failed to get user information from token.');
      setLoading(false);
      return;
    }

    setUserId(decodedUserId);
    fetchTasks(token);
  }, []);

  const fetchTasks = (token) => {
    setLoading(true);
    setError('');

    axios({
      method: 'GET',
      // The backend route is now correctly set to /my_tasks
      url: `${API_BASE_URL}/my_tasks`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: { page: 1, per_page: 100 }
    })
      .then((res) => {
        // The backend already filters by user ID, so we use all returned tasks
        setTasks(res.data.tasks || []);
      })
      .catch((e) => {
        console.error('Failed to load tasks:', e.response || e);
        const status = e.response?.status;
        
        // Improved error handling for common authorization issues (401/403)
        if (status === 401 || status === 403) {
            setError('Authentication failed. You may not have the required "salesman" role, or your session has expired. Please log in again.');
        } else {
            setError(e.response?.data?.error || 'Failed to load tasks: Network or server error.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleMarkComplete = (taskId) => {
    setUpdating(true);
    
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        setUpdating(false);
        return;
    }
    
    // Ensure only the necessary fields are sent for status update
    axios({
      method: 'PUT',
      url: `${API_BASE_URL}/update/${taskId}`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      data: {
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        // user_id and assigned_by/to are not required by the PUT route
        status: 'completed' // This is the core change
      }
    })
      .then((res) => {
        // Use res.data.task if the API returns the updated task object
        const updatedTask = res.data.task || { ...task, status: 'completed' };

        setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
        setSelectedTask(updatedTask);
      })
      .catch((e) => {
        console.error('Failed to update task:', e);
        setError(e.response?.data?.error || 'Failed to update task');
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const searchableTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const finalPendingTasks = searchableTasks.filter(t => t.status === 'pending');
  const finalCompletedTasks = searchableTasks.filter(t => t.status === 'completed');

  if (selectedTask) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-5 pb-8 border-b border-gray-100 mb-8">
            <button
              onClick={() => setSelectedTask(null)}
              className="w-10 h-10 border-2 border-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-50"
            >
              <ArrowLeft className="w-5 h-5 text-cyan-500" />
            </button>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Task Details</h2>
              <p className="text-sm text-gray-500">{selectedTask.title}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{selectedTask.title}</h3>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  selectedTask.status === 'pending' 
                    ? 'bg-orange-100 text-orange-600' 
                    : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {selectedTask.status === 'pending' ? 'To Do' : 'Completed'}
                </span>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 mt-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Due Date</div>
                    <div className="font-medium text-gray-700">
                      {selectedTask.due_date ? new Date(selectedTask.due_date).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-4">Task Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedTask.description}</p>
              </div>
            </div>

            <div>
              {selectedTask.status === 'pending' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Actions</h3>
                  <button
                    onClick={() => handleMarkComplete(selectedTask.id)}
                    disabled={updating}
                    className="w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium disabled:opacity-50"
                  >
                    {updating ? 'Marking...' : 'Mark as Complete'}
                  </button>
                </div>
              )}

              {selectedTask.status === 'completed' && (
                <div className="bg-emerald-50 rounded-xl shadow-sm p-6 border-l-4 border-emerald-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <div>
                      <h3 className="font-bold text-emerald-900">Task Completed</h3>
                      <p className="text-sm text-emerald-700">Great work!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError('')} className="underline">Dismiss</button>
          </div>
        )}

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">My Tasks</h2>
          <p className="text-gray-600">Tasks assigned to you by management</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search your tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading your tasks...</p>
          </div>
        )}

        {!loading && finalPendingTasks.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              To Do ({finalPendingTasks.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {finalPendingTasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800 flex-1">{task.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
                      To Do
                    </span>
                  </div>
                  {task.due_date && (
                    <div className="text-sm text-gray-600 mb-3">
                      <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  {task.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && finalCompletedTasks.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Completed ({finalCompletedTasks.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {finalCompletedTasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800 flex-1">{task.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-600">
                      Done
                    </span>
                  </div>
                  {task.due_date && (
                    <div className="text-sm text-gray-600 mb-3">
                      <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  {task.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && tasks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">No tasks assigned to you yet</p>
          </div>
        )}
      </div>
    </div>
  );
}