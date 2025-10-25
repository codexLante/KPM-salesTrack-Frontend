import { Clock, Calendar, User } from "lucide-react";

export function TasksList({ tasks, onMarkComplete, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="text-blue-500" size={24} />
        <h2 className="text-xl font-bold text-gray-900">Pending Tasks</h2>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  {task.priority && (
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                      {task.priority}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{task.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{task.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{task.assignedBy}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => onMarkComplete(task.id)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Mark Complete
              </button>
              <button
                onClick={() => onViewDetails(task.id)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}