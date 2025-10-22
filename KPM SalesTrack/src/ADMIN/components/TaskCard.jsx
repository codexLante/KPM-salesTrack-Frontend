import { FaUser, FaCalendar, FaBuilding } from 'react-icons/fa';

const TaskCard = ({ task, onClick, employees }) => {
  const assignedEmployee = employees.find(emp => emp.id === task.assignedTo);
  
  const statusColors = {
    'In Progress': 'bg-blue-100 text-blue-600 border-blue-200',
    'Completed': 'bg-emerald-100 text-emerald-600 border-emerald-200',
    'Active': 'bg-cyan-100 text-cyan-600 border-cyan-200'
  };

  return (
    <div 
      onClick={() => onClick(task)}
      className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Task Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex-1">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>

      {/* Task Details */}
      <div className="space-y-3">
        {/* Assigned Employee */}
        {assignedEmployee && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaUser className="text-cyan-500" />
            <span className="font-medium">{assignedEmployee.name}</span>
          </div>
        )}

        {/* Due Date */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaCalendar className="text-orange-500" />
          <span>{task.dueDate}</span>
        </div>

        {/* Client (if exists) */}
        {task.client && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaBuilding className="text-blue-500" />
            <span>{task.client}</span>
          </div>
        )}
      </div>

      {/* Task Description Preview */}
      {task.description && (
        <p className="mt-4 text-sm text-gray-500 line-clamp-2">
          {task.description}
        </p>
      )}
    </div>
  );
};

export default TaskCard;