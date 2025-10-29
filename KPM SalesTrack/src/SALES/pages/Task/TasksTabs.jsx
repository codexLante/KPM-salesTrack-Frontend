export function TasksTabs({ activeTab, setActiveTab, tasksCount, messagesCount, completedCount }) {
  return (
    <div className="flex space-x-4">
      <button
        onClick={() => setActiveTab("tasks")}
        className={`px-6 py-3 rounded-full font-semibold transition-colors ${
          activeTab === "tasks"
            ? "bg-gray-200 text-gray-900"
            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
        }`}
      >
        Tasks ({tasksCount})
      </button>
      <button
        onClick={() => setActiveTab("messages")}
        className={`px-6 py-3 rounded-full font-semibold transition-colors ${
          activeTab === "messages"
            ? "bg-gray-200 text-gray-900"
            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
        }`}
      >
        Messages ({messagesCount})
      </button>
      <button
        onClick={() => setActiveTab("completed")}
        className={`px-6 py-3 rounded-full font-semibold transition-colors ${
          activeTab === "completed"
            ? "bg-gray-200 text-gray-900"
            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
        }`}
      >
        Completed ({completedCount})
      </button>
    </div>
  );
}