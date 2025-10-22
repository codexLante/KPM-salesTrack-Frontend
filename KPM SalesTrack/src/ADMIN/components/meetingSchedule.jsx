import { FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const MeetingSchedule = () => {
  const meetings = [
    { company: 'Wayne Corporations - Quarterly Review', person: 'Bruce Wayne', time: '2:00pm' },
    { company: 'Star City Industries - Project Demo', person: 'Oliver Queen', time: '2:00pm' },
    { company: 'Star Labs Tech Solutions - Follow up', person: 'Barry Allen', time: '2:00pm' }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-emerald-400">
      <div className="flex items-center gap-2 mb-4">
        <FaCalendarAlt className="text-emerald-400 text-xl" />
        <h3 className="text-lg font-semibold text-gray-800">Meeting Schedule</h3>
      </div>
      <div className="space-y-3">
        {meetings.map((meeting, index) => (
          <div key={index} className="bg-emerald-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-800">{meeting.company}</h4>
                <p className="text-xs text-gray-600 mt-1">{meeting.person}</p>
              </div>
              <div className="flex items-center gap-2 text-emerald-600">
                <FaCheckCircle />
                <span className="text-xs font-medium">{meeting.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingSchedule;