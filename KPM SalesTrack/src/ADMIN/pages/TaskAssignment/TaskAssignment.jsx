import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Plus, Search, Clock, CheckCircle } from 'lucide-react';

const API_BASE_URL = 'http://127.0.0.1:5000';

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({  // ✅ MOVED TO TOP
    title: '',
    description: '',
    due_date: '',
    assigned_to: '',
    status: 'pending'
  });

  const getToken = () => localStorage.getItem('token');

  // Fetch tasks
  useEffect(() => {
    setLoading(true);

    axios({
      method: 'GET',
      url: `${API_BASE_URL}/tasks/GetAll`,  // ✅ FIXED
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      params: { page: 1, per_page: 100 }
    })
      .then((res) => {
        setTasks(res.data.tasks || []);
      })
      .catch((e) => {
        console.log(e);
        setError('Failed to load tasks');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Fetch employees
  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API_BASE_URL}/users/GetAll`,  
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        setEmployees(res.data.employees || []);
      })
      .catch((e) => {
        console.log(e);
        setEmployees([
          { id: 1, name: 'Eugene Mwite', role: 'Sales Manager' },
          { id: 2, name: 'Erica Muthoni', role: 'Sales rep' },
          { id: 3, name: 'Eva Mwaki', role: 'Sales rep' }
        ]);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTask = () => {
  setSubmitting(true);
  setError('');

  // ✅ ADD VALIDATION
  if (!formData.title || !formData.description || !formData.due_date || !formData.assigned_to) {
    setError('Please fill in all required fields');
    setSubmitting(false);
    return;
  }

  const userId = parseInt(localStorage.getItem('user_id') || '1');

  axios({
    method: 'POST',
    url: `${API_BASE_URL}/tasks/add`,
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    data: {
      title: formData.title,
      description: formData.description,
      due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null,
      assigned_to: parseInt(formData.assigned_to),  // ✅ This will be a valid number now
      assigned_by: userId,
      status: formData.status
    }
  })
    .then((res) => {
      setTasks([...tasks, res.data.task]);
      setShowAddForm(false);
      setFormData({
        title: '',
        description: '',
        due_date: '',
        assigned_to: '',
        status: 'pending'
      });
    })
    .catch((e) => {
      console.log(e.response?.data); // ✅ Log the actual error from backend
      setError(e.response?.data?.error || 'Failed to add task');
    })
    .finally(() => {
      setSubmitting(false);
    });
};

  const handleDeleteTask = (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    setDeleting(true);

    axios({
      method: 'DELETE',
      url: `${API_BASE_URL}/tasks/permanent/${taskId}`, 
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        setTasks(tasks.filter(t => t.id !== taskId));
        setSelectedTask(null);
      })
      .catch((e) => {
        console.log(e);
        setError(e.response?.data?.error || 'Failed to delete task');
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  const inProgressTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  // Task Details View
  if (selectedTask) {
    const assignedEmployee = employees.find(emp => emp.id === selectedTask.assigned_to);

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
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  {selectedTask.status === 'pending' ? 'In Progress' : 'Completed'}
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

            <div className="space-y-8">
              {assignedEmployee && (
                <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-emerald-400">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Assigned To</h3>
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-medium">
                      {assignedEmployee.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">{assignedEmployee.name}</div>
                      <div className="text-sm text-gray-500">{assignedEmployee.role}</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Actions</h3>
                <button
                  onClick={() => handleDeleteTask(selectedTask.id)}
                  disabled={deleting}
                  className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium disabled:opacity-50"
                >
                  {deleting ? 'Deleting...' : 'Delete Task'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Add Task Form View
  if (showAddForm) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setShowAddForm(false)}
              className="w-12 h-12 border-2 border-cyan-500 rounded-lg flex items-center justify-center hover:bg-cyan-50"
            >
              <ArrowLeft className="w-6 h-6 text-cyan-500" />
            </button>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-1">Create New Task</h2>
              <p className="text-gray-600">Assign a task to a sales team member</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-xl font-semibold text-cyan-600 mb-2">Task Information</h3>
            <p className="text-gray-600 mb-6">Enter the details of the new task</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Product Demo Screening"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign To *</label>
                <select
                  name="assigned_to"
                  value={formData.assigned_to}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Select employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} - {emp.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe task details, objectives, and any important information"
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-10 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowAddForm(false)}
                disabled={submitting}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                disabled={submitting}
                className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg disabled:opacity-50"
              >
                {submitting ? 'Creating...' : 'Create Task'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Task List View
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError('')} className="underline">Dismiss</button>
          </div>
        )}

        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Task Assignment</h2>
            <p className="text-gray-600">Create and manage tasks for your sales team</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium shadow-md"
          >
            <Plus size={20} />
            Create Task
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tasks by title or employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading tasks...</p>
          </div>
        )}

        {!loading && inProgressTasks.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              In Progress ({inProgressTasks.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressTasks.map(task => {
                const assignedEmployee = employees.find(emp => emp.id === task.assigned_to);
                return (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800 flex-1">{task.title}</h3>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                        In Progress
                      </span>
                    </div>
                    <div className="space-y-3">
                      {assignedEmployee && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Assigned to: {assignedEmployee.name}</span>
                        </div>
                      )}
                      {task.due_date && (
                        <div className="text-sm text-gray-600">
                          <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    {task.description && (
                      <p className="mt-4 text-sm text-gray-500 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!loading && completedTasks.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              Completed ({completedTasks.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedTasks.map(task => {
                const assignedEmployee = employees.find(emp => emp.id === task.assigned_to);
                return (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-800 flex-1">{task.title}</h3>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-600">
                        Completed
                      </span>
                    </div>
                    <div className="space-y-3">
                      {assignedEmployee && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Assigned to: {assignedEmployee.name}</span>
                        </div>
                      )}
                      {task.due_date && (
                        <div className="text-sm text-gray-600">
                          <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    {task.description && (
                      <p className="mt-4 text-sm text-gray-500 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!loading && tasks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No tasks created yet</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="text-cyan-500 hover:text-cyan-600 font-medium"
            >
              Create your first task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}