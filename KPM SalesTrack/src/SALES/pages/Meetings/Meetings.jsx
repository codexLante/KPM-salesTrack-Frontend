import { useState, useEffect } from "react";
import axios from "axios";
import MeetingsHeader from "./MeetingsHeader";
import MeetingsStats from "./MeetingsStats";
import MeetingsSearchAndFilters from "./MeetingsSearchAndFilters";
import MeetingsTable from "./MeetingsTable";
import MeetingsScheduleForm from "./MeetingsScheduleForm";
import MeetingsDetails from "./MeetingsDetails";
import MeetingsTabs from "./MeetingsTabs";
import MeetingsNotes from "./MeetingsNotes";
import MeetingsPast from "./MeetingsPast";

const API_BASE_URL = 'http://localhost:5000/meetings';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default function SalesMeetings() {
  const [view, setView] = useState("list");
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("notes");
  const [meetings, setMeetings] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      return;
    }

    fetchClients();
    fetchMyMeetings();
  }, [currentPage, statusFilter, searchTerm]);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await apiClient.get('/clients', config);
      setClients(response.data);
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    }
  };

  const fetchMyMeetings = async () => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        page: currentPage,
        per_page: 10,
        status: statusFilter,
        search: searchTerm
      }
    };

    try {
      const response = await apiClient.get('/sales/my_meetings', config);
      setMeetings(response.data.meetings);
      setPagination(response.data.pagination);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Failed to fetch meetings';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScheduleMeeting = async (formData) => {
    if (!selectedClient) {
      alert("Please select a company before scheduling a meeting.");
      return;
    }

    setIsLoading(true);

    const payload = {
      companyName: selectedClient.companyName,
      contactPerson: selectedClient.contactPerson,
      meetingType: formData.meetingType,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      notes: formData.notes || ''
    };

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await apiClient.post('/sales/create', payload, config);
      alert('Meeting created successfully!');
      setView('list');
      setCurrentPage(1);
      fetchMyMeetings();
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to create meeting';
      alert(`Error: ${errorMsg}`);
      console.error('Error creating meeting:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = async (meeting) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await apiClient.get(`/sales/${meeting.id}`, config);
      setSelectedMeeting(response.data);
      setView('details');
    } catch (err) {
      alert('Failed to fetch meeting details');
      console.error('Error fetching details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMeeting = async () => {
    if (!selectedMeeting) return;

    setIsLoading(true);

    const payload = {
      notes: selectedMeeting.notes,
      duration: selectedMeeting.duration,
      location: selectedMeeting.location,
      meetingType: selectedMeeting.meetingType,
      date: selectedMeeting.date,
      time: selectedMeeting.time
    };

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await apiClient.put(`/sales/${selectedMeeting.id}/update`, payload, config);
      alert('Meeting notes saved successfully!');
      setView('list');
      fetchMyMeetings();
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to save meeting';
      alert(`Error: ${errorMsg}`);
      console.error('Error saving meeting:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMeeting = async (meetingId) => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        await apiClient.delete(`/sales/${meetingId}/delete`, config);
        alert('Meeting deleted successfully!');
        setView('list');
        fetchMyMeetings();
      } catch (err) {
        const errorMsg = err.response?.data?.error || 'Failed to delete meeting';
        alert(`Error: ${errorMsg}`);
        console.error('Error deleting meeting:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const totalMeetings = pagination.total || 0;
  const upcomingMeetings = meetings.filter(m => m.status === "Upcoming").length;
  const completedMeetings = meetings.filter(m => m.status === "Completed").length;
  const thisWeekMeetings = meetings.length;

  if (error) {
    return (
      <div className="space-y-6">
        <MeetingsHeader onScheduleClick={() => setView("schedule")} />
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

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
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
        {isLoading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <span className="animate-pulse text-blue-600 font-semibold">Loading ...</span>
          </div>
        ) : (
          <>
            <MeetingsTable
              filteredMeetings={meetings}
              onViewDetails={handleViewDetails}
              onDelete={handleDeleteMeeting}
            />
            {pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  Page {pagination.current_page} of {pagination.pages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
                  disabled={currentPage === pagination.pages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
              </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  if (view === "schedule") {
    return (
      <MeetingsScheduleForm
        clients={clients}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        onBackToList={() => setView("list")}
        onSubmit={handleScheduleMeeting}
        isLoading={isLoading}
      />
    );
  }

  if (view === "details" && selectedMeeting) {
    return (
      <div className="max-w-5xl mx-auto">
        <MeetingsDetails 
          selectedMeeting={selectedMeeting} 
          onBackToList={() => setView("list")} 
        />
        <MeetingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "notes" ? (
          <MeetingsNotes
            selectedMeeting={selectedMeeting}
            onNotesChange={(value) =>
              setSelectedMeeting({ ...selectedMeeting, notes: value })
            }
            onSave={handleSaveMeeting}
          />
        ) : (
          <MeetingsPast selectedMeeting={selectedMeeting} />
        )}
      </div>
    );
  }

  return null;
}