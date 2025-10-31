import { Calendar, Clock, MapPin } from 'lucide-react';

const MeetingSchedule = () => {
  const meetings = [
    {
      id: 1,
      client: 'Tech Solutions Ltd',
      date: 'Nov 20, 2024',
      time: '10:00 AM',
      location: 'Nairobi Office',
      status: 'upcoming',
      color: 'border-cyan-400'
    },
    {
      id: 2,
      client: 'Global Enterprises',
      date: 'Nov 25, 2024',
      time: '2:00 PM',
      location: 'Virtual Meeting',
      status: 'upcoming',
      color: 'border-blue-400'
    },
    {
      id: 3,
      client: 'Retail Masters',
      date: 'Dec 1, 2024',
      time: '11:30 AM',
      location: 'Kisumu Office',
      status: 'upcoming',
      color: 'border-green-400'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-4">Upcoming Meetings</h3>
      
      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div key={meeting.id} className={`p-4 border-l-4 ${meeting.color} bg-gray-50 rounded-lg`}>
            <h4 className="font-semibold mb-2">{meeting.client}</h4>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{meeting.date}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{meeting.time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{meeting.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingSchedule;