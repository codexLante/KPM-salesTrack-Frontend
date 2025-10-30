import { useState } from "react";

const CalendarHeader = ({
  currentDate,
  setCurrentDate,
  view,
  setView,
  statusFilter,
  setStatusFilter,
  employeeFilter,
  setEmployeeFilter,
  employees,
  isLoading,
  onOptimizeRoutes,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      {/* Top Row: Navigation + View Toggle + Filter Button */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Date Navigation */}
        <div className="flex items-center gap-2">
          <button onClick={handlePrevDay} className="px-3 py-2 border rounded-lg hover:bg-gray-50">
            ← Prev
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[180px] text-center">
            {formattedDate}
          </span>
          <button onClick={handleNextDay} className="px-3 py-2 border rounded-lg hover:bg-gray-50">
            Next →
          </button>
          <button onClick={handleToday} className="px-3 py-2 border rounded-lg hover:bg-gray-50 text-sm font-medium">
            Today
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {['day', 'week', 'month'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                view === v ? 'bg-white shadow text-blue-600' : 'text-gray-600'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Employee Filter */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Employee</label>
            <select
              value={employeeFilter}
              onChange={(e) => setEmployeeFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Employees</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="flex gap-2 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Optimize Button */}
      <div className="mt-4 text-right">
        <button
          onClick={onOptimizeRoutes}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
        >
          {isLoading ? 'Optimizing...' : 'Optimize Routes'}
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
