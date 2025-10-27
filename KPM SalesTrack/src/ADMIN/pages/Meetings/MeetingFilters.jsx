import { FaFilter, FaRoute } from 'react-icons/fa';

function MeetingFilters({ 
  startDate, 
  setStartDate, 
  endDate, 
  setEndDate, 
  selectedSalesPerson, 
  setSelectedSalesPerson, 
  salesPersons, 
  scheduledCount,
  onClearFilters,
  onOptimizeRoutes 
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaFilter className="text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Filter Meetings for Optimization</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sales Person</label>
          <select
            value={selectedSalesPerson}
            onChange={(e) => setSelectedSalesPerson(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {salesPersons.map(person => (
              <option key={person} value={person}>
                {person === 'all' ? 'All' : person}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {scheduledCount} scheduled meetings ready for optimization
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onOptimizeRoutes}
            className="px-6 py-2 text-sm text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2"
          >
            <FaRoute />
            Optimize Routes
          </button>
        </div>
      </div>
    </div>
  );
};

export {MeetingFilters}