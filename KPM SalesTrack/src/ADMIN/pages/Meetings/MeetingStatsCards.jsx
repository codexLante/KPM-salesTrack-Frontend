import { Calendar, Clock, Route } from 'lucide-react';

export default function MeetingStatsCards({ totalMeetings, scheduledCount, optimizedCount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Meetings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Meetings</p>
            <p className="text-4xl font-bold text-gray-900">{totalMeetings}</p>
          </div>
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
            <Calendar size={28} className="text-blue-600" />
          </div>
        </div>
        <p className="text-xs text-gray-500">In selected period</p>
      </div>

      {/* Scheduled */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Scheduled</p>
            <p className="text-4xl font-bold text-gray-900">{scheduledCount}</p>
          </div>
          <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
            <Clock size={28} className="text-orange-600" />
          </div>
        </div>
        <p className="text-xs text-gray-500">Awaiting optimization</p>
      </div>

      {/* Optimized */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Optimized</p>
            <p className="text-4xl font-bold text-gray-900">{optimizedCount}</p>
          </div>
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
            <Route size={28} className="text-green-600" />
          </div>
        </div>
        <p className="text-xs text-gray-500">Routes ready</p>
      </div>
    </div>
  );
}