import { CheckCircle, Target, Edit2, Trash2, Plus, Minus } from "lucide-react";

export default function ObjectiveItem({ objective, onEdit, onDelete, onUpdateProgress }) {
  const progress = Math.round((objective.completed / objective.target) * 100);
  const isComplete = objective.completed >= objective.target;

  return (
    <div className="space-y-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Target className={isComplete ? "text-green-500" : "text-blue-500"} size={20} />
          <h3 className="font-semibold text-gray-900">{objective.name}</h3>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-600">
            {objective.completed}/{objective.target} {objective.unit}
          </span>
          {isComplete && <CheckCircle className="text-green-500" size={20} />}
          <button
            onClick={() => onEdit(objective)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(objective.id)}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            isComplete 
              ? "bg-gradient-to-r from-green-400 to-green-600" 
              : "bg-gradient-to-r from-blue-400 to-blue-600"
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{progress}% complete</span>
          <span>•</span>
          <span>{objective.target - objective.completed} remaining</span>
        </div>

        {/* Quick update buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUpdateProgress(objective.id, Math.max(0, objective.completed - 1))}
            className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            disabled={objective.completed === 0}
          >
            <Minus size={16} />
          </button>
          <button
            onClick={() => onUpdateProgress(objective.id, Math.min(objective.target, objective.completed + 1))}
            className="p-1 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
            disabled={objective.completed >= objective.target}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}