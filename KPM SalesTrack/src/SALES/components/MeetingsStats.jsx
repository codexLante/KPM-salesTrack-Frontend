export default function MeetingsStats({ totalMeetings, upcomingMeetings, completedMeetings, thisWeekMeetings }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <p className="text-gray-600 text-sm mb-2">Total meetings</p>
        <p className="text-4xl font-bold text-gray-900">{totalMeetings}</p>
      </div>
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <p className="text-gray-600 text-sm mb-2">Upcoming meetings</p>
        <p className="text-4xl font-bold text-gray-900">{upcomingMeetings}</p>
      </div>
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <p className="text-gray-600 text-sm mb-2">Completed Meetings</p>
        <p className="text-4xl font-bold text-gray-900">{completedMeetings}</p>
      </div>
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <p className="text-gray-600 text-sm mb-2">This Week</p>
        <p className="text-4xl font-bold text-gray-900">{thisWeekMeetings}</p>
      </div>
    </div>
  );
}
