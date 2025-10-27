import { FaCalendarAlt, FaClock, FaRoute } from 'react-icons/fa';

function MeetingStats({ totalMeetings, scheduledCount, optimizedCount }){
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Meetings</p>
            <p className="text-3xl font-bold text-gray-800">{totalMeetings}</p>
            <p className="text-xs text-gray-500 mt-1">In selected period</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <FaCalendarAlt className="text-blue-600 text-xl" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Scheduled</p>
            <p className="text-3xl font-bold text-orange-600">{scheduledCount}</p>
            <p className="text-xs text-gray-500 mt-1">Awaiting optimization</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <FaClock className="text-orange-600 text-xl" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Optimized</p>
            <p className="text-3xl font-bold text-green-600">{optimizedCount}</p>
            <p className="text-xs text-gray-500 mt-1">Routes ready</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <FaRoute className="text-green-600 text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export {MeetingStats}