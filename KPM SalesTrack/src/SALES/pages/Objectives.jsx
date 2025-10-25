import { useState } from "react";
import ObjectivesHeader from "../components/ObjectivesHeader";
import ProgressCircle from "../components/ProgressCircle";
import ObjectivesList from "../components/ObjectivesList";

export default function Objectives() {
  // Dummy objectives data
  const [objectives, setObjectives] = useState([
    { id: 1, name: "Client Meetings", target: 10, completed: 7, unit: "meetings" },
    { id: 2, name: "New Clients", target: 5, completed: 3, unit: "clients" },
    { id: 3, name: "Proposals Sent", target: 8, completed: 6, unit: "proposals" },
    { id: 4, name: "Follow-up Calls", target: 15, completed: 10, unit: "calls" },
    { id: 5, name: "Demos Conducted", target: 6, completed: 4, unit: "demos" }
  ]);

  // Calculate overall progress
  const totalTarget = objectives.reduce((sum, obj) => sum + obj.target, 0);
  const totalCompleted = objectives.reduce((sum, obj) => sum + obj.completed, 0);
  const overallProgress = Math.round((totalCompleted / totalTarget) * 100);

  return (
    <div className="space-y-6">
      <ObjectivesHeader />

      {/* Overall Progress Section */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 p-8">
        <div className="flex items-center space-x-3 mb-8">
          <svg className="text-blue-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
          <h2 className="text-xl font-bold text-gray-900">Overall weekly Progress</h2>
        </div>

        <div className="flex justify-center">
          <ProgressCircle percentage={overallProgress} />
        </div>
      </div>

      {/* Detailed Objectives Breakdown */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 p-8">
        <div className="flex items-center space-x-3 mb-8">
          <svg className="text-blue-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          <h2 className="text-xl font-bold text-gray-900">Weekly Objectives Breakdown</h2>
        </div>

        <ObjectivesList objectives={objectives} />
      </div>
    </div>
  );
}