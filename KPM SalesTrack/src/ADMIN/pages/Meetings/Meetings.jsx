import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import MeetingStatsCards from "./MeetingStatsCards";
import MeetingDetailModal from "./MeetingDetailModal";
import { Modal } from "../../components/modal";

const API_BASE_URL = 'http://localhost:5000/meetings';

const AdminMeetings = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState("all");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState({ total: 0, scheduled: 0, completed: 0 });
  const [modal, setModal] = useState(null);

  const getToken = () => localStorage.getItem('token');

  const showModal = (title, message, type = 'success', actions = []) => {
    setModal({ title, message, type, actions });
  };
  const closeModal = () => setModal(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchAllMeetings();
  }, [currentPage, statusFilter, employeeFilter]);

  const fetchEmployees = () => {
    axios({
      method: "GET",
      url: 'http://localhost:5000/users/GetAll',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        const usersData = Array.isArray(res?.data) ? res.data : [];
        
        const salesUsers = usersData.filter(u => 
          u.role === 'sales' || u.role === 'salesman'
        );
        
        const formattedEmployees = salesUsers.map(u => ({
          id: u.id,
          name: `${u.first_name} ${u.last_name}`,
          email: u.email,
          phone: u.phone_number,
          role: u.role
        }));
        
        setEmployees(formattedEmployees);
      })
      .catch((err) => {
        console.error('Failed to fetch employees:', err);
        setEmployees([]);
      });
  };

  const fetchAllMeetings = () => {
    setIsLoading(true);
    setError(null);

    const params = {
      page: currentPage,
      per_page: 10
    };

    if (statusFilter !== "all") {
      params.status = statusFilter.toLowerCase();
    }

    if (employeeFilter !== "all") {
      params.user_id = parseInt(employeeFilter);
    }

    axios({
      method: "GET",
      url: `${API_BASE_URL}/admin/all`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      params: params
    })
      .then((res) => {
        setMeetings(res.data.meetings);
        setPagination(res.data.pagination);
        
        const scheduledCount = res.data.meetings.filter(m => m.status === "Upcoming").length;
        const completedCount = res.data.meetings.filter(m => m.status === "Completed").length;
        
        setStats({
          total: res.data.pagination.total || 0,
          scheduled: scheduledCount,
          completed: completedCount
        });
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to fetch meetings';
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          showModal("Session Expired", "Your session has expired. Please log in again.", "error", [
            { label: "Login", onClick: () => navigate('/login'), primary: true }
          ]);
        }
        setError(errorMsg);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleMeetingClick = (meeting) => {
    setIsLoading(true);
    
    axios({
      method: "GET",
      url: `${API_BASE_URL}/admin/${meeting.id}`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        setSelectedMeeting(res.data);
        setShowDetailModal(true);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to fetch meeting details.';
        showModal('Error', errorMsg, 'error');
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateMeeting = (updatedData) => {
    setIsLoading(true);
    
    const payload = {
      notes: updatedData.notes,
      duration: updatedData.duration,
      location: updatedData.location,
      meetingType: updatedData.meetingType,
      date: updatedData.date,
      time: updatedData.time
    };

    axios({
      method: "PUT",
      url: `${API_BASE_URL}/admin/${selectedMeeting.id}/update`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      data: payload
    })
      .then((res) => {

        showModal('Success', 'Meeting updated successfully!', 'success');
        setShowDetailModal(false);
        fetchAllMeetings();
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to update meeting';
        showModal('Error', `Error updating meeting: ${errorMsg}`, 'error');
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteMeeting = (meetingId) => {
    setShowDetailModal(false);
    showModal(
        'Confirm Deletion', 
        'Are you sure you want to permanently delete this meeting? This action cannot be undone.', 
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
    
    axios({
      method: "DELETE",
      url: `${API_BASE_URL}/admin/${meetingId}/delete`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        showModal('Deleted', 'Meeting deleted successfully!', 'success');
        fetchAllMeetings();
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to delete meeting';
        showModal('Error', `Error deleting meeting: ${errorMsg}`, 'error');
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOptimizeRoutes = () => {
    if (!startDate || !endDate) {
      showModal('Validation Error', 'Please select both start date and end date before optimizing routes.', 'error');
      return;
    }

    navigate('/admin/route-optimizer', { 
      state: { 
        employeeFilter,
        startDate,
        endDate
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {modal && <Modal {...modal} onClose={closeModal} />}
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">All Meetings</h1>
          <p className="text-gray-600">View all scheduled meetings and optimize routes</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <CalendarHeader
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          view={view}
          setView={setView}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          employeeFilter={employeeFilter}
          setEmployeeFilter={setEmployeeFilter}
          employees={employees}
          isLoading={isLoading}
          onOptimizeRoutes={handleOptimizeRoutes}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />

        {isLoading && meetings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <span className="animate-pulse text-blue-600 font-semibold">Loading ...</span>
          </div>
        ) : (
          <>
            <CalendarGrid
              currentDate={currentDate}
              view={view}
              meetings={meetings}
              onMeetingClick={handleMeetingClick}
              employeeFilter={employeeFilter}
            />

            <MeetingStatsCards
              totalMeetings={stats.total}
              scheduledCount={stats.scheduled}
              completedCount={stats.completed}
              optimizedCount={0}
            />

            {pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
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

        {showDetailModal && selectedMeeting && (
          <MeetingDetailModal
            meeting={selectedMeeting}
            onClose={() => setShowDetailModal(false)}
            onUpdate={handleUpdateMeeting}
            onDelete={() => handleDeleteMeeting(selectedMeeting.id)}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default AdminMeetings;