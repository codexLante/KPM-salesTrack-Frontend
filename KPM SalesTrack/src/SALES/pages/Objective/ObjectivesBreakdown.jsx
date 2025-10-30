import ObjectivesList from "./ObjectivesList";

export default function ObjectivesBreakdown({ objectives, onEdit, onDelete, onUpdateProgress }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 p-8">
      <div className="flex items-center space-x-3 mb-8">
        <svg className="text-blue-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        <h2 className="text-xl font-bold text-gray-900">Weekly Objectives Breakdown</h2>
      </div>

      <ObjectivesList 
        objectives={objectives}
        onEdit={onEdit}
        onDelete={onDelete}
        onUpdateProgress={onUpdateProgress}
      />
    </div>
  );
}