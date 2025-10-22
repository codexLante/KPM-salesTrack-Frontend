import { FaArrowLeft,FaCalendar, FaBuilding, FaCheckCircle, FaClock } from 'react-icons/fa';

const TaskDetails = ({ task, onBack, employees }) => {
  const assignedEmployee = employees.find(emp => emp.id === task.assignedTo);

  const statusConfig = {
    'In Progress': { color: 'blue', bgColor: 'bg-blue-50', borderColor: 'border-blue-500', textColor: 'text-blue-600' },
    'Completed': { color: 'emerald', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-500', textColor: 'text-emerald-600' },
    'Active': { color: 'cyan', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-500', textColor: 'text-cyan-600' }
  };

  const config = statusConfig[task.status] || statusConfig['Active'];

  return (
    <div className="animate-in fade-in slide-in-from-left-2 duration-300">
      {/* Header */}
      <div className="flex items-center gap-5 pb-8 border-b border-gray-100 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 border-2 border-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-50 transition-colors duration-200"
        >
          <FaArrowLeft className="w-5 h-5 text-cyan-500" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Task Details</h2>
          <p className="text-sm text-gray-500">Complete information for {task.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Task Info Card */}
          <div className={`bg-white rounded-xl shadow-sm p-8 border-l-4 ${config.borderColor}`}>
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{task.title}</h3>
                <span className={`inline-flex items-center gap-2 px-4 py-2 ${config.bgColor} ${config.textColor} rounded-full text-sm font-medium`}>
                  {task.status === 'Completed' ? <FaCheckCircle /> : <FaClock />}
                  {task.status}
                </span>
              </div>
            </div>

            {/* Task Meta Info */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <FaCalendar className="w-5 h-5 mx-auto mb-2 text-cyan-600" />
                <div className="text-xs text-gray-500">Due Date</div>
                <div className="font-medium text-gray-700">{task.dueDate}</div>
              </div>
              {task.client && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <FaBuilding className="w-5 h-5 mx-auto mb-2 text-blue-600" />
                  <div className="text-xs text-gray-500">Client</div>
                  <div className="font-medium text-gray-700">{task.client}</div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-4">Task Description</h3>
            <p className="text-gray-700 leading-relaxed">{task.description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Assigned Employee */}
          {assignedEmployee && (
            <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-emerald-400">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Assigned To</h3>
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-medium text-lg">
                  {assignedEmployee.initials}
                </div>
                <div>
                  <div className="font-medium text-gray-700">{assignedEmployee.name}</div>
                  <div className="text-sm text-gray-500">{assignedEmployee.role}</div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors">
                Edit Task
              </button>
              <button className="w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors">
                Mark as Complete
              </button>
              <button className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
                Delete Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;