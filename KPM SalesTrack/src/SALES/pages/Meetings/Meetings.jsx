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
import { Modal } from "../../components/modal"; 

const API_BASE_URL = 'http://localhost:5000/meetings';
const CLIENTS_API_URL = 'http://localhost:5000/clients';

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
  const [modal, setModal] = useState(null); 

  const showModal = (title, message, type = 'success', actions = []) => {
    setModal({ title, message, type, actions });
  };
  const closeModal = () => setModal(null);

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
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchMyMeetings();
    }
  }, [currentPage, statusFilter, searchTerm]);

  const fetchClients = () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    axios
      .get(`${CLIENTS_API_URL}/my_clients`, config)
      .then((res) => {
        const clientsList = res.data.clients || [];
        const formattedClients = clientsList.map(client => ({
          id: client.id,
          company_name: client.company_name,
          contact_person: client.contact_person,
          address: client.address,
          email: client.email,
          phone_number: client.phone_number,
          status: client.status
        }));
        setClients(formattedClients);
      })
      .catch((err) => {
        console.error('Failed to fetch clients:', err);
        setClients([]);
      });
  };

  const fetchMyMeetings = () => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: {
        page: currentPage,
        per_page: 10,
        status: statusFilter,
        search: searchTerm,
        start_date: dateRange.start || undefined,
        end_date: dateRange.end || undefined
      }

    };

    axios
      .get(`${API_BASE_URL}/sales/my_meetings`, config)
      .then((res) => {
        setMeetings(res.data.meetings);
        setPagination(res.data.pagination);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || err.message || 'Failed to fetch meetings';
        setError(errorMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleScheduleMeeting = (formData) => {
    if (!selectedClient) {
      showModal("Validation Error", "Please select a company before scheduling a meeting.", "error");
      return;
    }

    setIsLoading(true);

    const payload = {
      companyName: selectedClient.company_name,
      contactPerson: selectedClient.contact_person,
      meetingType: formData.meetingType,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      notes: formData.notes || ''
    };

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    axios
      .post(`${API_BASE_URL}/sales/create`, payload, config)
      .then(() => {
        showModal('Success', 'Meeting created successfully!', 'success');
        setView('list');
        setCurrentPage(1);
        setSelectedClient(null);
        fetchMyMeetings();
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to create meeting';
        showModal('Error', `Error: ${errorMsg}`, 'error');
        console.error('Error creating meeting:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleViewDetails = (meeting) => {
    setIsLoading(true);

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    axios
      .get(`${API_BASE_URL}/sales/${meeting.id}`, config)
      .then((res) => {
        setSelectedMeeting(res.data);
        setView('details');
      })
      .catch(() => {
        showModal('Error', 'Failed to fetch meeting details.', 'error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSaveMeeting = () => {
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

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    axios
      .put(`${API_BASE_URL}/sales/${selectedMeeting.id}/update`, payload, config)
      .then(() => {
        showModal('Success', 'Meeting notes saved successfully!', 'success');
        setView('list');
        fetchMyMeetings();
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to save meeting';
        showModal('Error', `Error: ${errorMsg}`, 'error');
        console.error('Error saving meeting:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteMeeting = (meetingId) => {
    showModal(
        'Confirm Deletion', 
        'Are you sure you want to delete this meeting? This action cannot be undone.', 
        'error', 
        [
            { label: 'Cancel', onClick: closeModal, primary: false },
            { label: 'Delete', onClick: () => confirmDelete(meetingId), primary: true }
        ]
    );
  };
  
  const confirmDelete = (meetingId) => {
    closeModal();
    setIsLoading(true);

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    axios
      .delete(`${API_BASE_URL}/sales/${meetingId}/delete`, config)
      .then(() => {
        showModal('Deleted', 'Meeting deleted successfully!', 'success');
        setView('list');
        fetchMyMeetings();
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to delete meeting';
        showModal('Error', `Failed to delete meeting: ${errorMsg}`, 'error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  const totalMeetings = pagination.total || 0;
  const upcomingMeetings = meetings.filter(m => m.status === "Upcoming").length;
  const completedMeetings = meetings.filter(m => m.status === "Completed").length;
  const thisWeekMeetings = meetings.length;
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [showDatePicker, setShowDatePicker] = useState(false);
  
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
        {modal && <Modal {...modal} onClose={closeModal} />}
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
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          showDatePicker={showDatePicker}
          onShowDatePickerToggle={() => setShowDatePicker(!showDatePicker)}
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
      <>
        {modal && <Modal {...modal} onClose={closeModal} />} {/* <-- 3. RENDER MODAL */}
        <MeetingsScheduleForm
          clients={clients}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          onBackToList={() => setView("list")}
          onSubmit={handleScheduleMeeting}
          isLoading={isLoading}
        />
      </>
    );
  }

  if (view === "details" && selectedMeeting) {
    return (
      <div className="max-w-5xl mx-auto">
        {modal && <Modal {...modal} onClose={closeModal} />}
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