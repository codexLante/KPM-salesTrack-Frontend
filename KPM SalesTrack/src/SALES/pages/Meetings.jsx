
import { useState } from "react";
import MeetingsHeader from "../components/MeetingsHeader";
import MeetingsStats from "../components/MeetingsStats";
import MeetingsSearchAndFilters from "../components/MeetingsSearchAndFilters";
import MeetingsTable from "../components/MeetingsTable";
import MeetingsScheduleForm from "../components/MeetingsScheduleForm";
import MeetingsDetails from "../components/MeetingsDetails";
import MeetingsTabs from "../components/MeetingsTabs";
import MeetingsNotes from "../components/MeetingsNotes";
import MeetingsPast from "../components/MeetingsPast";

export default function Meetings() {
  const [view, setView] = useState("list"); // 'list', 'schedule', 'details'
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [activeTab, setActiveTab] = useState("notes"); // 'notes' or 'past'

  // Form state for scheduling
  const [meetingForm, setMeetingForm] = useState({
    companyName: "",
    contactPerson: "",
    meetingType: "",
    date: "",
    time: "",
    location: "",
    notes: ""
  });

  // Dummy meetings data
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      client: "TechCorp Solutions",
      contactPerson: "Sarah Johnson",
      meetingType: "Product Demo",
      date: "2024-10-20",
      time: "09:00 AM",
      location: "Kilimani",
      status: "Upcoming",
      notes: "",
      pastMeetings: [
        { date: "2024-09-15", type: "Initial Consultation", notes: "Discussed product requirements" },
        { date: "2024-08-20", type: "Follow-up", notes: "Reviewed pricing options" }
      ]
    },
    {
      id: 2,
      client: "Global Enterprises",
      contactPerson: "Michael Chen",
      meetingType: "Product Demo",
      date: "2024-10-20",
      time: "09:00 AM",
      location: "Kilimani",
      status: "Upcoming",
      notes: "",
      pastMeetings: []
    },
    {
      id: 3,
      client: "Innovative Systems",
      contactPerson: "Emily Rodriguez",
      meetingType: "Product Demo",
      date: "2024-10-20",
      time: "09:00 AM",
      location: "Kilimani",
      status: "Upcoming",
      notes: "",
      pastMeetings: [
        { date: "2024-10-01", type: "Product Demo", notes: "Successful demo presentation" }
      ]
    },
    {
      id: 4,
      client: "DataSync Inc",
      contactPerson: "James Wilson",
      meetingType: "Product Demo",
      date: "2024-10-20",
      time: "09:00 AM",
      location: "Kilimani",
      status: "Completed",
      notes: "Great discussion about implementation timeline",
      pastMeetings: []
    },
    {
      id: 5,
      client: "CloudWave Technologies",
      contactPerson: "Lisa Anderson",
      meetingType: "Product Demo",
      date: "2024-10-20",
      time: "09:00 AM",
      location: "Kilimani",
      status: "Completed",
      notes: "Client interested in enterprise package",
      pastMeetings: []
    },
    {
      id: 6,
      client: "NextGen Solutions",
      contactPerson: "Robert Taylor",
      meetingType: "Product Demo",
      date: "2024-10-20",
      time: "09:00 AM",
      location: "Kilimani",
      status: "Completed",
      notes: "Follow-up scheduled for next month",
      pastMeetings: []
    }
  ]);

  // Calculate stats
  const totalMeetings = meetings.length;
  const upcomingMeetings = meetings.filter(m => m.status === "Upcoming").length;
  const completedMeetings = meetings.filter(m => m.status === "Completed").length;
  const thisWeekMeetings = meetings.length; // Simplified for demo

  // Filter meetings
  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || meeting.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    const newMeeting = {
      id: meetings.length + 1,
      client: meetingForm.companyName,
      contactPerson: meetingForm.contactPerson,
      meetingType: meetingForm.meetingType,
      date: meetingForm.date,
      time: meetingForm.time,
      location: meetingForm.location,
      status: "Upcoming",
      notes: meetingForm.notes,
      pastMeetings: []
    };
    setMeetings([...meetings, newMeeting]);
    setMeetingForm({
      companyName: "",
      contactPerson: "",
      meetingType: "",
      date: "",
      time: "",
      location: "",
      notes: ""
    });
    setView("list");
  };

  const handleSaveMeeting = () => {
    const updatedMeetings = meetings.map(m =>
      m.id === selectedMeeting.id ? { ...m, notes: selectedMeeting.notes } : m
    );
    setMeetings(updatedMeetings);
    alert("Meeting notes saved successfully!");
  };

  // LIST VIEW
  if (view === "list") {
    return (
      <div className="space-y-6">
        <MeetingsHeader onScheduleClick={() => setView("schedule")} />
        <MeetingsStats
          totalMeetings={totalMeetings}
          upcomingMeetings={upcomingMeetings}
          completedMeetings={completedMeetings}
          thisWeekMeetings={thisWeekMeetings}
        />
        <MeetingsSearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          showDatePicker={showDatePicker}
          onShowDatePickerToggle={() => setShowDatePicker(!showDatePicker)}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
        <MeetingsTable
          filteredMeetings={filteredMeetings}
          onViewDetails={(meeting) => {
            setSelectedMeeting(meeting);
            setView("details");
          }}
        />
      </div>
    );
  }

  // SCHEDULE VIEW
  if (view === "schedule") {
    return (
      <MeetingsScheduleForm
        onBackToList={() => setView("list")}
        meetingForm={meetingForm}
        onFormChange={setMeetingForm}
        onSubmit={handleScheduleMeeting}
      />
    );
  }

  // DETAILS VIEW
  if (view === "details" && selectedMeeting) {
    return (
      <div className="max-w-5xl mx-auto">
        <MeetingsDetails selectedMeeting={selectedMeeting} onBackToList={() => setView("list")} />
        <MeetingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "notes" ? (
          <MeetingsNotes
            selectedMeeting={selectedMeeting}
            onNotesChange={(value) => setSelectedMeeting({ ...selectedMeeting, notes: value })}
            onSave={handleSaveMeeting}
          />
        ) : (
          <MeetingsPast selectedMeeting={selectedMeeting} />
        )}
      </div>
    );
  }
}