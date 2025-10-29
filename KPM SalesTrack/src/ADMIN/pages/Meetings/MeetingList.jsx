import { FaCalendarAlt } from 'react-icons/fa';
import { MeetingCard } from './MeetingCards';

function MeetingsList({ meetings }) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Meetings List</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>

      {meetings.length === 0 && (
        <div className="p-12 text-center">
          <FaCalendarAlt className="text-gray-300 text-5xl mx-auto mb-4" />
          <p className="text-gray-600">No meetings found with the selected filters</p>
        </div>
      )}
    </div>
  );
};
export {MeetingsList}