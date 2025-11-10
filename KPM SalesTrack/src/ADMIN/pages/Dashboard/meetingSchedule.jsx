import { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Clock, MapPin } from 'lucide-react';

const MeetingSchedule = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTodaysMeetings();
  }, []);

  const fetchTodaysMeetings = async () => {
    try {
      const res = await axios.get('https://salestrack-backend.onrender.com/meetings/sales/today', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = res.data?.meetings || [];
      const formatted = data.map((m, i) => ({
        id: m.id,
        client: m.client || 'Unknown Client',
        date: new Date(m.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        time: m.time,
        location: m.location || 'N/A',
        color: ['border-cyan-400', 'border-blue-400', 'border-green-400'][i % 3]
      }));

      setMeetings(formatted);
    } catch (error) {
      console.error('Failed to fetch today\'s meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-4">Today's Meetings</h3>

      {loading ? (
        <p className="text-gray-500">Loading meetings...</p>
      ) : meetings.length === 0 ? (
        <p className="text-gray-500">No meetings scheduled for today.</p>
      ) : (
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
      )}
    </div>
  );
};

export default MeetingSchedule;
