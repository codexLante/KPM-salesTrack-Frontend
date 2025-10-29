import { useState } from 'react';

export default function CalendarGrid({
  currentDate,
  view,
  meetings,
  onMeetingClick,
  onSlotClick,
  onDragMeeting
}) {
  const [draggedMeeting, setDraggedMeeting] = useState(null);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const getWeekDays = (date) => {
    const days = [];
    const curr = new Date(date);
    const first = curr.getDate() - curr.getDay() + 1; // Monday

    for (let i = 0; i < 5; i++) {
      const day = new Date(curr.setDate(first + i));
      days.push(day);
    }
    return days;
  };

  const getDayName = (date) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[date.getDay()];
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getMeetingsForSlot = (date, time) => {
    const dateKey = formatDateKey(date);
    return meetings.filter(m => m.date === dateKey && m.time === time);
  };

  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-200 border-blue-400 text-blue-900',
      green: 'bg-green-200 border-green-400 text-green-900',
      pink: 'bg-pink-200 border-pink-400 text-pink-900',
      purple: 'bg-purple-200 border-purple-400 text-purple-900',
      yellow: 'bg-yellow-200 border-yellow-400 text-yellow-900'
    };
    return colors[color] || colors.blue;
  };

  const handleDragStart = (e, meeting) => {
    setDraggedMeeting(meeting);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, date, time) => {
    e.preventDefault();
    if (draggedMeeting) {
      const dateKey = formatDateKey(date);
      onDragMeeting(draggedMeeting.id, dateKey, time);
      setDraggedMeeting(null);
    }
  };

  const weekDays = view === 'week' ? getWeekDays(currentDate) : [currentDate];

  if (view === 'month') {
    // Simple month view - just showing message for now
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 mb-6">
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold mb-2">Month View</p>
          <p className="text-sm">Month view coming soon. Please use Day or Week view for now.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
      {/* Header with days */}
      <div className="grid border-b border-gray-200" style={{ gridTemplateColumns: `80px repeat(${weekDays.length}, 1fr)` }}>
        <div className="p-4 border-r border-gray-200"></div>
        {weekDays.map((day, index) => (
          <div key={index} className="p-4 text-center border-r border-gray-200 last:border-r-0">
            <div className="text-sm font-medium text-gray-600">{getDayName(day)}</div>
            <div className={`text-2xl font-bold mt-1 ${
              isToday(day) 
                ? 'w-10 h-10 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center' 
                : 'text-gray-900'
            }`}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Time slots */}
      <div className="overflow-y-auto max-h-[600px]">
        {timeSlots.map((time) => (
          <div 
            key={time}
            className="grid border-b border-gray-200 last:border-b-0"
            style={{ gridTemplateColumns: `80px repeat(${weekDays.length}, 1fr)`, minHeight: '80px' }}
          >
            {/* Time label */}
            <div className="p-4 border-r border-gray-200 text-sm text-gray-600 font-medium">
              {time}
            </div>

            {/* Day cells */}
            {weekDays.map((day, dayIndex) => {
              const slotMeetings = getMeetingsForSlot(day, time);
              const dateKey = formatDateKey(day);

              return (
                <div
                  key={dayIndex}
                  className="p-2 border-r border-gray-200 last:border-r-0 hover:bg-gray-50 cursor-pointer transition-colors relative"
                  onClick={() => slotMeetings.length === 0 && onSlotClick(dateKey, time)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, day, time)}
                >
                  {slotMeetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, meeting)}
                      onClick={(e) => {
                        e.stopPropagation();
                        onMeetingClick(meeting);
                      }}
                      className={`p-2 rounded-lg border-l-4 mb-1 cursor-move hover:shadow-md transition-shadow ${getColorClass(meeting.color)}`}
                    >
                      <div className="text-sm font-semibold">{meeting.time}</div>
                      <div className="text-sm font-medium">{meeting.company}</div>
                      <div className="text-xs mt-1">{meeting.salesPerson}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}