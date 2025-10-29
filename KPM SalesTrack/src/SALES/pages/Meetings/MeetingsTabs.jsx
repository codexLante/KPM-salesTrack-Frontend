export default function MeetingsTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onTabChange("notes")}
        className={`px-8 py-3 rounded-full font-semibold transition-colors ${
          activeTab === "notes"
            ? "bg-white text-gray-900 shadow-md"
            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        }`}
      >
        Meeting Notes
      </button>
      <button
        onClick={() => onTabChange("past")}
        className={`px-8 py-3 rounded-full font-semibold transition-colors ${
          activeTab === "past"
            ? "bg-white text-gray-900 shadow-md"
            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        }`}
      >
        Past Meetings
      </button>
    </div>
  );
}
