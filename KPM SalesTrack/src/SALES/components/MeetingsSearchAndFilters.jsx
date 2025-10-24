import { Search, Calendar, Filter } from "lucide-react";

export default function MeetingsSearchAndFilters({
  searchTerm,
  onSearchChange,
  dateFilter,
  onDateFilterChange,
  showDatePicker,
  onShowDatePickerToggle,
  dateRange,
  onDateRangeChange,
  statusFilter,
  onStatusFilterChange
}) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="search client by name"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={() => onDateFilterChange(dateFilter === "week" ? "all" : "week")}
        className={`px-6 py-3 rounded-lg border font-medium transition-colors flex items-center space-x-2 ${
          dateFilter === "week"
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
      >
        <Calendar size={18} />
        <span>This Week</span>
      </button>

      <div className="relative">
        <button
          onClick={onShowDatePickerToggle}
          className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium transition-colors flex items-center space-x-2"
        >
          <Calendar size={18} />
          <span>pick a date</span>
        </button>
        {showDatePicker && (
          <div className="absolute top-full mt-2 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 w-64">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={onShowDatePickerToggle}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => onStatusFilterChange(statusFilter === "all" ? "upcoming" : statusFilter === "upcoming" ? "completed" : "all")}
          className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium transition-colors flex items-center space-x-2"
        >
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>
    </div>
  );
}
