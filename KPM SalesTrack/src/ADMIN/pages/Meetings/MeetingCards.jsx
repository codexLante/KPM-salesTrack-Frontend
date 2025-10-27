import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';

function MeetingCard ({ meeting }) {
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors border-b border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{meeting.company}</h3>
            <span className="px-3 py-1 text-xs font-medium text-orange-700 bg-orange-100 rounded-full">
              {meeting.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>{meeting.address}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaCalendarAlt className="text-gray-400" />
              <span>{new Date(meeting.date).toLocaleDateString()} at {meeting.time}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaUser className="text-gray-400" />
              <span>{meeting.salesPerson}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export {MeetingCard}