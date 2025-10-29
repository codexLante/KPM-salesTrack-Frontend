import { CheckCircle, Calendar, User } from "lucide-react";

export default function CompletedTasksList({ tasks, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <CheckCircle className="text-green-500" size={24} />
        <h2 className="text-xl font-bold text-gray-900">Completed Tasks</h2>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-50 rounded-lg p-6 border border-gray-200 opacity-75"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-700 line-through">{task.title}</h3>
                  <CheckCircle className="text-green-500" size={20} />
                </div>
                <p className="text-gray-500 mb-4">{task.description}</p>

                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>Completed: {new Date(task.completedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{task.assignedBy}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onViewDetails(task.id)}
              className="mt-4 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
