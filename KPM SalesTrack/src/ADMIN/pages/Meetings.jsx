import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MeetingStats } from '../components/MeetingStats';
import { MeetingFilters } from '../components/MeetingFilters';
import { MeetingsList } from '../components/MeetingList';

const Meetings = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedSalesPerson, setSelectedSalesPerson] = useState('all');

  const meetings = [
    {
      id: 1,
      company: 'ABC Corporation',
      address: '123 Main St, New York, NY',
      date: '2025-10-23',
      time: '10:00 AM',
      salesPerson: 'John Smith',
      status: 'scheduled'
    },
    {
      id: 2,
      company: 'Tech Solutions Inc',
      address: '456 Broadway, New York, NY',
      date: '2025-10-23',
      time: '2:00 PM',
      salesPerson: 'John Smith',
      status: 'scheduled'
    },
    {
      id: 3,
      company: 'Global Ventures',
      address: '789 5th Ave, New York, NY',
      date: '2025-10-23',
      time: '4:30 PM',
      salesPerson: 'John Smith',
      status: 'scheduled'
    },
    {
      id: 4,
      company: 'Innovate Corp',
      address: '321 Park Ave, New York, NY',
      date: '2025-10-24',
      time: '11:00 AM',
      salesPerson: 'Sarah Johnson',
      status: 'scheduled'
    },
    {
      id: 5,
      company: 'Future Tech LLC',
      address: '654 Madison Ave, New York, NY',
      date: '2025-10-24',
      time: '1:30 PM',
      salesPerson: 'Sarah Johnson',
      status: 'scheduled'
    },
    {
      id: 6,
      company: 'Digital Dynamics',
      address: '987 Lexington Ave, New York, NY',
      date: '2025-10-25',
      time: '9:00 AM',
      salesPerson: 'Mike Davis',
      status: 'scheduled'
    },
    {
      id: 7,
      company: 'Enterprise Solutions',
      address: '147 Wall St, New York, NY',
      date: '2025-10-25',
      time: '3:00 PM',
      salesPerson: 'Mike Davis',
      status: 'scheduled'
    }
  ];

  const salesPersons = ['all', ...new Set(meetings.map(m => m.salesPerson))];

  const filteredMeetings = meetings.filter(meeting => {
    const meetingDate = new Date(meeting.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const dateMatch = (!start || meetingDate >= start) && (!end || meetingDate <= end);
    const personMatch = selectedSalesPerson === 'all' || meeting.salesPerson === selectedSalesPerson;

    return dateMatch && personMatch;
  });

  const scheduledCount = filteredMeetings.filter(m => m.status === 'scheduled').length;

  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
    setSelectedSalesPerson('all');
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

        {/* Stats */}
        <MeetingStats 
          totalMeetings={filteredMeetings.length}
          scheduledCount={scheduledCount}
          optimizedCount={1}
        />

        {/* Filters */}
        <MeetingFilters
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          selectedSalesPerson={selectedSalesPerson}
          setSelectedSalesPerson={setSelectedSalesPerson}
          salesPersons={salesPersons}
          scheduledCount={scheduledCount}
          onClearFilters={handleClearFilters}
          onOptimizeRoutes={handleOptimizeRoutes}
        />

        {/* Meetings List */}
        <MeetingsList meetings={filteredMeetings} />
      </div>
    </div>
  );
};

export default Meetings;