import { createPortal } from "react-dom";
import { X, Calendar, User, Clock, AlertCircle, FileText } from "lucide-react";

export function TaskDetailsModal({ task, onClose, onMarkComplete }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMarkComplete = () => {
    onMarkComplete(task.id);
    onClose();
  };

  const modalContent = (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center p-4"
      style={{
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed'
      }}
      onClick={handleBackdropClick}
    >
      <div
        className="relative bg-white rounded-xl w-full max-w-2xl shadow-2xl"
        style={{
          zIndex: 100000,
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
                {task.priority && (
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    task.priority === 'High'
                      ? 'bg-red-100 text-red-700'
                      : task.priority === 'Medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {task.priority} Priority
                  </span>
                )}
              </div>
              <p className="text-gray-600">{task.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              type="button"
            >
              <X size={24} />
            </button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <DetailCard icon={<Calendar className="text-blue-600" size={20} />} label="Due Date" value={task.date} bg="bg-blue-100" />
            {task.dueTime && (
              <DetailCard icon={<Clock className="text-purple-600" size={20} />} label="Due Time" value={task.dueTime} bg="bg-purple-100" />
            )}
            <DetailCard icon={<User className="text-green-600" size={20} />} label="Assigned By" value={task.assignedBy} bg="bg-green-100" />
            <DetailCard icon={<AlertCircle className="text-orange-600" size={20} />} label="Status" value={task.status} bg="bg-orange-100" />
          </div>

          {/* Notes Section */}
          {task.notes && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="text-blue-600" size={18} />
                <h3 className="font-semibold text-gray-900">Additional Notes</h3>
              </div>
              <p className="text-gray-700">{task.notes}</p>
            </div>
          )}

          {/* Completion Date */}
          {task.status === 'completed' && task.completedDate && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="text-green-600" size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-900">Task Completed</p>
                  <p className="text-sm text-green-700">
                    {task.completedDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            {task.status === 'pending' && (
              <button
                onClick={handleMarkComplete}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Mark as Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

function DetailCard({ icon, label, value, bg }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-900 capitalize">{value}</p>
      </div>
    </div>
  );
}
