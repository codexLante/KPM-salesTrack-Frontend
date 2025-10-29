import { Calendar } from "lucide-react";

export default function MeetingsHeader({ onScheduleClick }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
        <p className="text-gray-600 mt-1">Manage and track all your clients meetings</p>
      </div>
      <button
        onClick={onScheduleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-2"
      >
        <Calendar size={20} />
        <span>Schedule Meeting</span>
      </button>
    </div>
  );
}
