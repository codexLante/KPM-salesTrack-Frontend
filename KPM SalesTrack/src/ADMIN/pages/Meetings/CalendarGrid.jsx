import { useState } from 'react';

export default function CalendarGrid({
  currentDate,
  view,
  meetings,
  onMeetingClick,
  employeeFilter
}) {
  const [draggedMeeting, setDraggedMeeting] = useState(null);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const getFullWeek = (date) => {
    const days = [];
    const curr = new Date(date);
    const dayOfWeek = curr.getDay();
    
    const diff = curr.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(curr.setDate(diff));
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      days.push(new Date(day));
    }
    return days;
  };

  const getDayName = (date) => {
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
    return days[dayIndex];
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };


  const roundToNearestSlot = (time) => {
    if (!time) return null;
    

    const [hours, minutes] = time.split(':').map(Number);
    

    const roundedHour = minutes >= 30 ? hours + 1 : hours;
    

    const formattedHour = roundedHour.toString().padStart(2, '0');
    return `${formattedHour}:00`;
  };

  const getMeetingsForSlot = (date, timeSlot) => {
    const dateKey = formatDateKey(date);
    
    let filteredMeetings = meetings.filter(m => {
      if (m.date !== dateKey) return false;
      
      const meetingRoundedTime = roundToNearestSlot(m.time);
      
      return meetingRoundedTime === timeSlot;
    });
    

    if (employeeFilter && employeeFilter !== 'all') {
      filteredMeetings = filteredMeetings.filter(m => {
        const empId = parseInt(employeeFilter);
        return m.salesPersonId === empId;
      });
    }
    
    return filteredMeetings;
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
    if (draggedMeeting && onDragMeeting) {
      const dateKey = formatDateKey(date);
      onDragMeeting(draggedMeeting.id, dateKey, time);
      setDraggedMeeting(null);
    }
  };

  if (view === 'month') {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 mb-6">
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold mb-2">Month View</p>
          <p className="text-sm">Month view coming soon. Please use Week view for now.</p>
        </div>
      </div>
    );
  }

  if (view === 'day') {
    const singleDay = [new Date(currentDate)];
    return (
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
        {/* Header */}
        <div className="grid border-b border-gray-200" style={{ gridTemplateColumns: `80px 1fr` }}>
          <div className="p-4 border-r border-gray-200"></div>
          <div className="p-4 text-center border-r border-gray-200 last:border-r-0">
            <div className="text-sm font-medium text-gray-600">{getDayName(singleDay[0])}</div>
            <div className={`text-2xl font-bold mt-1 ${
              isToday(singleDay[0]) 
                ? 'w-10 h-10 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center' 
                : 'text-gray-900'
            }`}>
              {singleDay[0].getDate()}
            </div>
          </div>
        </div>

        {/* Time slots */}
        <div className="overflow-y-auto max-h-[600px]">
          {timeSlots.map((time) => (
            <div 
              key={time}
              className="grid border-b border-gray-200 last:border-b-0"
              style={{ gridTemplateColumns: `80px 1fr`, minHeight: '80px' }}
            >
              <div className="p-4 border-r border-gray-200 text-sm text-gray-600 font-medium">
                {time}
              </div>
              <div
                className="p-2 border-r border-gray-200 last:border-r-0 hover:bg-gray-50 transition-colors"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, singleDay[0], time)}
              >
                {getMeetingsForSlot(singleDay[0], time).map((meeting) => (
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
                    <div className="text-xs font-medium mt-1">{meeting.client}</div>
                    <div className="text-xs font-medium">{meeting.salesPerson}</div>
                    <div className="text-xs text-opacity-75 mt-0.5">{meeting.meetingType}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const weekDays = getFullWeek(currentDate);

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
      {/* Header with days */}
      <div className="grid border-b border-gray-200" style={{ gridTemplateColumns: `80px repeat(7, 1fr)` }}>
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
            style={{ gridTemplateColumns: `80px repeat(7, 1fr)`, minHeight: '80px' }}
          >
            {/* Time label */}
            <div className="p-4 border-r border-gray-200 text-sm text-gray-600 font-medium">
              {time}
            </div>

            {/* Day cells */}
            {weekDays.map((day, dayIndex) => {
              const slotMeetings = getMeetingsForSlot(day, time);

              return (
                <div
                  key={dayIndex}
                  className="p-2 border-r border-gray-200 last:border-r-0 hover:bg-gray-50 transition-colors relative"
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
                      <div className="text-xs font-medium mt-1">{meeting.client}</div>
                      <div className="text-xs font-medium">{meeting.salesPerson}</div>
                      <div className="text-xs text-opacity-75 mt-0.5">{meeting.meetingType}</div>
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