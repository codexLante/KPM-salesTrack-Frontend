import { CheckCircle, Target } from "lucide-react";

export default function ObjectivesList({ objectives }) {
  return (
    <div className="bg-white rounded-lg p-6 space-y-6">
      {objectives.map((objective) => {
        const progress = Math.round((objective.completed / objective.target) * 100);
        const isComplete = objective.completed >= objective.target;
        
        return (
          <div key={objective.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Target className={isComplete ? "text-green-500" : "text-blue-500"} size={20} />
                <h3 className="font-semibold text-gray-900">{objective.name}</h3>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-600">
                  {objective.completed}/{objective.target} {objective.unit}
                </span>
                {isComplete && <CheckCircle className="text-green-500" size={20} />}
              </div>
            </div>
            
            {/* Progress bar */}
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
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>{progress}% complete</span>
              <span>{objective.target - objective.completed} remaining</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}