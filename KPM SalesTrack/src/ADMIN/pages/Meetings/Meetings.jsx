import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import MeetingStatsCards from './MeetingStatsCards';
import MeetingDetailModal from './MeetingDetailModal';
import { AddMeetingModal } from './AddMeetingModal';


const Meetings = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('week'); // 'day', 'week', 'month'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSalesPerson, setSelectedSalesPerson] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [meetings, setMeetings] = useState([
    {
      id: 1,
      company: 'Metro Corp',
      salesPerson: 'John Smith',
      date: '2025-10-28',
      time: '09:00',
      duration: 60,
      location: '123 Main St, New York',
      status: 'scheduled',
      color: 'blue',
      notes: 'Important client meeting'
    },
    {
      id: 2,
      company: 'Global Industries',
      salesPerson: 'Mike Davis',
      date: '2025-10-29',
      time: '11:00',
      duration: 60,
      location: '456 Park Ave, New York',
      status: 'scheduled',
      color: 'green',
      notes: 'Follow-up meeting'
    },
    {
      id: 3,
      company: 'North Star LLC',
      salesPerson: 'Mike Davis',
      date: '2025-10-30',
      time: '13:00',
      duration: 90,
      location: '789 Broadway, New York',
      status: 'scheduled',
      color: 'green',
      notes: 'Product demo'
    },
    {
      id: 4,
      company: 'Sunrise Enterprises',
      salesPerson: 'Sarah Johnson',
      date: '2025-10-29',
      time: '15:00',
      duration: 60,
      location: '321 5th Ave, New York',
      status: 'scheduled',
      color: 'pink',
      notes: 'Contract negotiation'
    }
  ]);

  const salesPersons = ['all', ...new Set(meetings.map(m => m.salesPerson))];

  // Filter meetings
  const filteredMeetings = meetings.filter(meeting => {
    const meetingDate = new Date(meeting.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const dateMatch = (!start || meetingDate >= start) && (!end || meetingDate <= end);
    const personMatch = selectedSalesPerson === 'all' || meeting.salesPerson === selectedSalesPerson;

    return dateMatch && personMatch;
  });

  // Stats
  const totalMeetings = filteredMeetings.length;
  const scheduledCount = filteredMeetings.filter(m => m.status === 'scheduled').length;
  const optimizedCount = 1; // Mock data

  const handleMeetingClick = (meeting) => {
    setSelectedMeeting(meeting);
    setShowDetailModal(true);
  };

  const handleSlotClick = (date, time) => {
    setSelectedSlot({ date, time });
    setShowAddModal(true);
  };

  const handleAddMeeting = (newMeeting) => {
    const meeting = {
      id: meetings.length + 1,
      ...newMeeting,
      status: 'scheduled'
    };
    setMeetings([...meetings, meeting]);
    setShowAddModal(false);
  };

  const handleUpdateMeeting = (updatedMeeting) => {
    setMeetings(meetings.map(m => m.id === updatedMeeting.id ? updatedMeeting : m));
    setShowDetailModal(false);
  };

  const handleDeleteMeeting = (meetingId) => {
    setMeetings(meetings.filter(m => m.id !== meetingId));
    setShowDetailModal(false);
  };

  const handleDragMeeting = (meetingId, newDate, newTime) => {
    setMeetings(meetings.map(m => 
      m.id === meetingId ? { ...m, date: newDate, time: newTime } : m
    ));
  };

  const handleOptimizeRoutes = () => {
    navigate('/admin/route-optimizer', { 
      state: { meetings: filteredMeetings } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">All Meetings</h1>
          <p className="text-gray-600">View all scheduled meetings and optimize routes</p>
        </div>

        {/* Calendar Header */}
        <CalendarHeader
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          view={view}
          setView={setView}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          selectedSalesPerson={selectedSalesPerson}
          setSelectedSalesPerson={setSelectedSalesPerson}
          salesPersons={salesPersons}
          onOptimizeRoutes={handleOptimizeRoutes}
        />

        {/* Calendar Grid */}
        <CalendarGrid
          currentDate={currentDate}
          view={view}
          meetings={filteredMeetings}
          onMeetingClick={handleMeetingClick}
          onSlotClick={handleSlotClick}
          onDragMeeting={handleDragMeeting}
        />

        {/* Stats Cards */}
        <MeetingStatsCards
          totalMeetings={totalMeetings}
          scheduledCount={scheduledCount}
          optimizedCount={optimizedCount}
        />

        {/* Meeting Detail Modal */}
        {showDetailModal && selectedMeeting && (
          <MeetingDetailModal
            meeting={selectedMeeting}
            onClose={() => setShowDetailModal(false)}
            onUpdate={handleUpdateMeeting}
            onDelete={handleDeleteMeeting}
          />
        )}

        {/* Add Meeting Modal */}
        {showAddModal && (
          <AddMeetingModal
            selectedSlot={selectedSlot}
            salesPersons={salesPersons.filter(p => p !== 'all')}
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddMeeting}
          />
        )}
      </div>
    </div>
  );
};

export default Meetings;