export default function MeetingsPast({ selectedMeeting }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Previous Meetings with {selectedMeeting.client}</h3>
      {selectedMeeting.pastMeetings && selectedMeeting.pastMeetings.length > 0 ? (
        <div className="space-y-4">
          {selectedMeeting.pastMeetings.map((past, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-900">{past.type}</p>
                <p className="text-sm text-gray-600">
                  {new Date(past.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <p className="text-gray-700">{past.notes}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">No past meetings with this client</p>
      )}
    </div>
  );
}
