export default function MeetingsTable({ filteredMeetings, onViewDetails }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">All Meetings ({filteredMeetings.length})</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Clients</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">meeting type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date&time</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMeetings.map((meeting) => (
              <tr key={meeting.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-900">{meeting.client}</td>
                <td className="px-6 py-4 text-gray-900">{meeting.meetingType}</td>
                <td className="px-6 py-4">
                  <div className="text-gray-900">
                    {new Date(meeting.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-gray-600">{meeting.time}</div>
                </td>
                <td className="px-6 py-4 text-gray-900">{meeting.location}</td>
                <td className="px-6 py-4">
                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                    meeting.status === "Upcoming"
                      ? "bg-teal-50 text-teal-600 border border-teal-200"
                      : "bg-gray-100 text-gray-700 border border-gray-300"
                  }`}>
                    {meeting.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onViewDetails(meeting)}
                    className="px-4 py-1 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
