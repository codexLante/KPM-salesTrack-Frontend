import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom"
import axios from "axios";
import { Calendar, ClipboardList, Users, Target, Clock, MapPin, CheckCircle, AlertCircle, X } from "lucide-react";

const API_BASE_URL = 'https://salestrack-backend.onrender.com';

const Modal = ({ title, message, onClose, type = "success", actions = [] }) => {
  const isSuccess = type === "success";
  const bgColor = isSuccess ? "bg-green-50" : "bg-red-50";
  const textColor = isSuccess ? "text-green-900" : "text-red-900";
  const borderColor = isSuccess ? "border-green-300" : "border-red-300";
  const Icon = isSuccess ? CheckCircle : AlertCircle;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);


  const modalContent = (
    <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full border ${borderColor} overflow-hidden`}>
        {/* Header */}
        <div className={`px-6 py-4 flex items-center gap-3 ${bgColor}`}>
          <Icon size={28} className={isSuccess ? "text-green-600" : "text-red-600"} />
          <h2 className={`text-lg font-bold ${textColor}`}>{title}</h2>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-gray-700 text-center mb-6">{message}</p>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            {actions.length > 0 ? (
              actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.onClick}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    action.primary
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {action.label}
                </button>
              ))
            ) : (
              <button
                onClick={onClose}
                className="px-8 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
export default function SalesDashboard() {
  const navigate = useNavigate();
  const [checkedIn, setCheckedIn] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkInError, setCheckInError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [todaysMeetings, setTodaysMeetings] = useState([]);
  const [isLoadingMeetings, setIsLoadingMeetings] = useState(false);
  const [meetingsError, setMeetingsError] = useState(null);
  const [modal, setModal] = useState(null);
  const [stats, setStats] = useState({ completed: 0, pending: 0 });
  const [pendingTasks, setPendingTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.first_name || "User";
  const userId = storedUser?.id;

  const getToken = () => localStorage.getItem('token');

  const showModal = (title, message, type = 'success', actions = []) => {
    setModal({ title, message, type, actions });
  };

  useEffect(() => {
    fetchTodaysMeetings();
    fetchStats();
    fetchPendingTasks();
  }, []);

  const fetchTodaysMeetings = async () => {
    setIsLoadingMeetings(true);
    setMeetingsError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/meetings/sales/today`, {
        headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' }
      });
      setTodaysMeetings(response.data.meetings);
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to fetch today\'s meetings';
      setMeetingsError(errorMsg);
      console.error('Error fetching meetings:', error);
    } finally {
      setIsLoadingMeetings(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/meetings/sales/my_meetings`, {
        headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
        params: { page: 1, per_page: 100 }
      });
      const meetings = response.data.meetings || [];
      setStats({
        completed: meetings.filter(m => m.status === "Completed").length,
        pending: meetings.filter(m => m.status === "Upcoming").length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchPendingTasks = async () => {
    setIsLoadingTasks(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/my_tasks`, {
        headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
        params: { page: 1, per_page: 10 }
      });
      
      const tasks = response.data.tasks || [];
      const formattedTasks = tasks
        .filter(task => task.status === 'pending')
        .map(task => ({
          id: task.id,
          task: task.title,
          description: task.description,
          date: task.due_date ? new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No due date',
          priority: determinePriority(task.due_date),
          status: task.status
        }));
      
      setPendingTasks(formattedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setPendingTasks([]);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const determinePriority = (dueDate) => {
    if (!dueDate) return 'low';
    const due = new Date(dueDate);
    const now = new Date();
    const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 'high';
    if (diffDays <= 2) return 'high';
    if (diffDays <= 7) return 'medium';
    return 'low';
  };

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude }),
        (error) => reject(error)
      );
    });
  };

  const handleCheckIn = async () => {
    try {
      setIsCheckingIn(true);
      setCheckInError(null);
      const location = await getUserLocation();
      setUserLocation(location);
      setCheckedIn(true);
      showModal('Success!', 'You have checked in successfully!', 'success');
    } catch (error) {
      const errorMsg = error.message || "Failed to get your location";
      setCheckInError(errorMsg);
      showModal('Error', errorMsg, 'error');
    } finally {
      setIsCheckingIn(false);
    }
  };

  const handleCheckOut = () => {
    setCheckedIn(false);
    setUserLocation(null);
    showModal('Checked Out', 'You have checked out successfully!', 'success');
  };

  const submitCheckIn = async (meetingId, clientId) => {
    try {
      if (!userLocation) {
        const location = await getUserLocation();
        setUserLocation(location);
      }
      await axios.post(`${API_BASE_URL}/checkins/checkin`, 
        { user_id: userId, meeting_id: meetingId, client_id: clientId, location: userLocation },
        { headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' } }
      );
      showModal('Success!', 'Checked in successfully!', 'success');
      fetchTodaysMeetings();
      fetchStats();
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message;
      showModal('Check-in Failed', errorMsg, 'error');
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {modal && <Modal {...modal} onClose={() => setModal(null)} />}

      {/* Check-in Card */}
      <div className={`rounded-xl p-6 transition-colors ${checkedIn ? 'bg-teal-400' : 'bg-white border border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-lg font-semibold ${checkedIn ? 'text-black' : 'text-gray-800'}`}>Welcome back, {userName}</h2>
            <p className={`font-bold ${checkedIn ? 'text-black' : 'text-gray-900'}`}>{checkedIn ? 'Checked In' : 'Checked Out'}</p>
            <p className={`text-sm ${checkedIn ? 'text-black' : 'text-gray-600'}`}>
              {checkedIn ? userLocation ? `Lat: ${userLocation.lat.toFixed(4)}, Lon: ${userLocation.lon.toFixed(4)}` : 'Location captured' : 'Toggle to start your day'}
            </p>
            {checkInError && <p className="text-sm text-red-600 mt-2">{checkInError}</p>}
          </div>
          <button onClick={checkedIn ? handleCheckOut : handleCheckIn} disabled={isCheckingIn}
            className={`relative w-14 h-7 rounded-full transition-colors disabled:opacity-50 ${checkedIn ? 'bg-gray-700' : 'bg-gray-300'}`}>
            <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${checkedIn ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
        </div>
        {isCheckingIn && <p className="text-sm text-gray-600 mt-2">Getting your location...</p>}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button onClick={() => navigate('/sales/meetings')} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all text-left">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Today's meeting</p>
            <Calendar className="text-blue-500" size={32} />
          </div>
          <p className="text-4xl font-bold text-gray-900">{todaysMeetings.length}</p>
        </button>
        <button onClick={() => navigate('/sales/meetings')} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-teal-300 transition-all text-left">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Total Completed</p>
            <CheckCircle className="text-teal-400" size={32} />
          </div>
          <p className="text-4xl font-bold text-gray-900">{stats.completed}</p>
        </button>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={() => navigate('/sales/meetings')} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all text-center">
          <Calendar className="mx-auto mb-3 text-gray-700" size={32} />
          <p className="font-semibold text-gray-900">Meetings</p>
        </button>
        <button onClick={() => navigate('/sales/clients')} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md hover:border-cyan-300 transition-all text-center">
          <Users className="mx-auto mb-3 text-gray-700" size={32} />
          <p className="font-semibold text-gray-900">My Clients</p>
        </button>
        <button onClick={() => navigate('/sales/objectives')} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md hover:border-purple-300 transition-all text-center">
          <Target className="mx-auto mb-3 text-gray-700" size={32} />
          <p className="font-semibold text-gray-900">Objectives</p>
        </button>
        <button onClick={() => navigate('/sales/tasks')} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md hover:border-teal-300 transition-all text-center">
          <ClipboardList className="mx-auto mb-3 text-gray-700" size={32} />
          <p className="font-semibold text-gray-900">Tasks ({pendingTasks.length})</p>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Summary */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="text-blue-500" size={24} />
            <h3 className="font-semibold text-gray-900 text-lg">Today's Summary</h3>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-700 font-medium">Meetings Completed</p>
              <p className="text-blue-600 font-semibold">{todaysMeetings.filter(m => m.status === "Completed").length}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-800 to-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${todaysMeetings.length > 0 ? (todaysMeetings.filter(m => m.status === "Completed").length / todaysMeetings.length) * 100 : 0}%` }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-700 font-medium">Upcoming Meetings</p>
              <p className="text-teal-500 font-semibold">{todaysMeetings.filter(m => m.status === "Upcoming").length}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-teal-500 to-teal-400 h-3 rounded-full transition-all"
                style={{ width: `${todaysMeetings.length > 0 ? (todaysMeetings.filter(m => m.status === "Upcoming").length / todaysMeetings.length) * 100 : 0}%` }} />
            </div>
          </div>
        </div>

        {/* Meetings */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Calendar className="text-blue-500" size={24} />
              <h3 className="font-semibold text-gray-900 text-lg">Today's meetings ({todaysMeetings.length})</h3>
            </div>
            <button onClick={() => navigate('/sales/meetings')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All →</button>
          </div>
          {isLoadingMeetings ? <p className="text-gray-600 text-center py-4">Loading meetings...</p> :
           meetingsError ? <p className="text-red-600 text-center py-4">⚠️ {meetingsError}</p> :
           todaysMeetings.length === 0 ? <p className="text-gray-600 text-center py-4">No meetings scheduled for today</p> :
           <div className="space-y-3">
             {todaysMeetings.map((meeting) => (
               <div key={meeting.id} className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all">
                 <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center space-x-3">
                     <Clock className="text-gray-500" size={20} />
                     <div className="text-left">
                       <p className="font-semibold text-gray-900">{meeting.client}</p>
                       <p className="text-sm text-gray-600">{meeting.time}</p>
                     </div>
                   </div>
                   <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700">{meeting.status}</span>
                 </div>
                 {checkedIn && (
                   <button onClick={() => submitCheckIn(meeting.id, meeting.clientId)}
                     className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                     <MapPin size={16} />Check In Here
                   </button>
                 )}
               </div>
             ))}
           </div>
          }
        </div>
      </div>

      {/*TASKS SECTION - Integrated with backend */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ClipboardList className="text-blue-500" size={24} />
            <h3 className="font-semibold text-gray-900 text-lg">Pending Tasks ({pendingTasks.length})</h3>
          </div>
          <button onClick={() => navigate('/sales/tasks')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All →</button>
        </div>
        {isLoadingTasks ? <p className="text-gray-600 text-center py-4">Loading tasks...</p> :
         pendingTasks.length === 0 ? (
           <div className="text-center py-8">
             <ClipboardList className="mx-auto text-gray-300 mb-3" size={48} />
             <p className="text-gray-600">No pending tasks</p>
             <p className="text-sm text-gray-500 mt-1">All caught up!</p>
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {pendingTasks.map((task) => (
               <div key={task.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all cursor-pointer"
                 onClick={() => navigate('/sales/tasks')}>
                 <div className="flex items-start justify-between gap-3 mb-2">
                   <div className="flex-1">
                     <p className="font-semibold text-gray-900">{task.task}</p>
                     {task.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>}
                   </div>
                   {task.priority && <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}>{task.priority}</span>}
                 </div>
                 <div className="flex items-center gap-2 text-xs text-gray-600">
                   <Clock size={14} />
                   <span>Due: {task.date}</span>
                 </div>
               </div>
             ))}
           </div>
         )
        }
      </div>
    </div>
  );
}