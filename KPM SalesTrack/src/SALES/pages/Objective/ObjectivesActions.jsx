import { Plus } from "lucide-react";
import ObjectivesHeader from "./ObjectivesHeader";

export default function ObjectivesActions({ onAddObjective }) {
  return (
    <div className="flex items-center justify-between">
      <ObjectivesHeader />
      <button
        onClick={onAddObjective}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Plus size={20} />
        Add Objective
      </button>
    </div>
  );
}