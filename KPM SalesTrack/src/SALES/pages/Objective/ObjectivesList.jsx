import { Target } from "lucide-react";
import ObjectiveItem from "./ObjectiveItem";

export default function ObjectivesList({ objectives, onEdit, onDelete, onUpdateProgress }) {
  if (objectives.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6">
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No objectives yet. Click "Add Objective" to create one.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 space-y-6">
      {objectives.map((objective) => (
        <ObjectiveItem
          key={objective.id}
          objective={objective}
          onEdit={onEdit}
          onDelete={onDelete}
          onUpdateProgress={onUpdateProgress}
        />
      ))}
    </div>
  );
}
