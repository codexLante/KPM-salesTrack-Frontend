import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import MeetingStatsCards from "./MeetingStatsCards";
import MeetingDetailModal from "./MeetingDetailModal";

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

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    fetchAllMeetings();
  }, [currentPage, statusFilter, employeeFilter]);

  useEffect(() => {
    axios({
      method: "GET",
      url: 'http://localhost:5000/users/GetAll',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        setEmployees(res.data.users || []);
      })
      .catch((err) => {
        console.log('Failed to fetch employees:', err);
        setEmployees([
          { id: 1, name: 'Eugene Mwite', role: 'Sales Manager' },
          { id: 2, name: 'Erica Muthoni', role: 'Sales rep' },
          { id: 3, name: 'Eva Mwaki', role: 'Sales rep' }
        ]);
      });
  }, []);

  const fetchAllMeetings = () => {
    setIsLoading(true);
    setError(null);
    
    axios({
      method: "GET",
      url: `${API_BASE_URL}/admin/all`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      params: {
        page: currentPage,
        per_page: 10,
        status: statusFilter,
        employee_id: employeeFilter !== "all" ? employeeFilter : undefined
      }
    })
      .then((res) => {
        setMeetings(res.data.meetings);
        setPagination(res.data.pagination);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to fetch meetings';
        setError(errorMsg);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
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
        alert('Failed to fetch meeting details');
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
        alert('Meeting updated successfully!');
        setShowDetailModal(false);
        fetchAllMeetings();
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to update meeting';
        alert(`Error: ${errorMsg}`);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteMeeting = (meetingId) => {
    if (window.confirm('Are you sure you want to delete this meeting?')) {
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
          alert('Meeting deleted successfully!');
          setShowDetailModal(false);
          fetchAllMeetings();
        })
        .catch((err) => {
          const errorMsg = err.response?.data?.error || 'Failed to delete meeting';
          alert(`Error: ${errorMsg}`);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleOptimizeRoutes = () => {
    if (!startDate || !endDate) {
      alert('Please select start and end dates');
      return;
    }

    // Navigate to routes page with dates
    navigate('/admin/route-optimizer', { 
      state: { 
        employeeFilter,
        startDate,
        endDate
      } 
    });
  };

  const totalMeetings = pagination.total || 0;
  const scheduledCount = meetings.filter(m => m.status === "Upcoming").length;
  const completedCount = meetings.filter(m => m.status === "Completed").length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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

        {isLoading ? (
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
            />

            <MeetingStatsCards
              totalMeetings={totalMeetings}
              scheduledCount={scheduledCount}
              completedCount={completedCount}
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