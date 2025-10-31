import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, ClipboardList, Users, Target, Clock, MapPin } from "lucide-react";

const API_BASE_URL = 'http://localhost:5000';

export default function SalesDashboard() {
  const navigate = useNavigate();
  const [checkedIn, setCheckedIn] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkInError, setCheckInError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.first_name || "User";
  const userId = storedUser?.id;

  const getToken = () => localStorage.getItem('token');

  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
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
      console.log('Check-in location:', location);
    } catch (error) {
      setCheckInError(error.message || "Failed to get your location");
      console.error('Check-in error:', error);
    } finally {
      setIsCheckingIn(false);
    }
  };

  const handleCheckOut = () => {
    setCheckedIn(false);
    setUserLocation(null);
  };
  const submitCheckIn = async (meetingId, clientId) => {
    try {
      if (!userLocation) {
        const location = await getUserLocation();
        setUserLocation(location);
      }

      const response = await axios.post(
        `${API_BASE_URL}/checkins/checkin`,
        {
          user_id: userId,
          meeting_id: meetingId,
          client_id: clientId,
          location: userLocation
        },
        {
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
          }
        }
      );

      alert('Checked in successfully!');
      console.log('Check-in response:', response.data);
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message;
      alert(`Check-in failed: ${errorMsg}`);
      console.error('Check-in error:', error);
    }
  };

  // Dummy data
  const todaysMeetings = [
    { id: 1, company: "ABC Corporation", time: "9:00 AM", status: "Upcoming", clientId: 1 },
    { id: 2, company: "ABC Tech", time: "10:00 AM", status: "Upcoming", clientId: 2 },
    { id: 3, company: "Wayne Tech", time: "12:00 PM", status: "Upcoming", clientId: 3 }
  ];

  const pendingTasks = [
    { id: 1, task: "Follow up on ABC Corp", date: "Today" },
    { id: 2, task: "Phone call on ABC Tech", date: "Oct 20" }
  ];

  const monthlyProgress = 8;
  const monthlyTarget = 12;
  const newClients = 3;
  const newClientsTarget = 5;

  return (
    <div className="space-y-6">
      {/* Check-in/Check-out Card */}
      <div className={`rounded-xl p-6 transition-colors ${
        checkedIn ? 'bg-teal-400' : 'bg-white border border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-lg font-semibold ${checkedIn ? 'text-black' : 'text-gray-800'}`}>
              Welcome back, {userName}
            </h2>
            <p className={`font-bold ${checkedIn ? 'text-black' : 'text-gray-900'}`}>
              {checkedIn ? 'Checked In' : 'Checked Out'}
            </p>
            <p className={`text-sm ${checkedIn ? 'text-black' : 'text-gray-600'}`}>
              {checkedIn 
                ? userLocation 
                  ? `Lat: ${userLocation.lat.toFixed(4)}, Lon: ${userLocation.lon.toFixed(4)}`
                  : 'Location captured' 
                : 'Toggle to start your day'}
            </p>
            {checkInError && (
              <p className="text-sm text-red-600 mt-2">⚠️ {checkInError}</p>
            )}
          </div>
          
          {/* Toggle Switch */}
          <button
            onClick={checkedIn ? handleCheckOut : handleCheckIn}
            disabled={isCheckingIn}
            className={`relative w-14 h-7 rounded-full transition-colors disabled:opacity-50 ${
              checkedIn ? 'bg-gray-700' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                checkedIn ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        {isCheckingIn && (
          <p className="text-sm text-gray-600 mt-2">Getting your location...</p>
        )}
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

        <button onClick={() => navigate('/sales/tasks')} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-teal-300 transition-all text-left">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Pending Tasks</p>
            <ClipboardList className="text-teal-400" size={32} />
          </div>
          <p className="text-4xl font-bold text-gray-900">{pendingTasks.length}</p>
        </button>
      </div>

      {/* Quick Access Buttons */}
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
          <p className="font-semibold text-gray-900">Tasks</p>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="text-blue-500" size={24} />
            <h3 className="font-semibold text-gray-900 text-lg">Weekly Progress</h3>
          </div>

          {/* Monthly Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-700 font-medium">Monthly Progress</p>
              <p className="text-blue-600 font-semibold">{monthlyProgress}/{monthlyTarget}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-800 to-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${(monthlyProgress / monthlyTarget) * 100}%` }}
              />
            </div>
          </div>

          {/* New Clients */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-700 font-medium">New clients</p>
              <p className="text-teal-500 font-semibold">{newClients}/{newClientsTarget}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-800 to-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${(newClients / newClientsTarget) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Today's Meetings List */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Calendar className="text-blue-500" size={24} />
              <h3 className="font-semibold text-gray-900 text-lg">
                Today's meeting ({todaysMeetings.length})
              </h3>
            </div>
            <button
              onClick={() => navigate('/sales/meetings')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </button>
          </div>

          <div className="space-y-3">
            {todaysMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="text-gray-500" size={20} />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{meeting.company}</p>
                      <p className="text-sm text-gray-600">{meeting.time}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700">
                    {meeting.status}
                  </span>
                </div>
                {checkedIn && (
                  <button
                    onClick={() => submitCheckIn(meeting.id, meeting.clientId)}
                    className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MapPin size={16} />
                    Check In Here
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Tasks Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ClipboardList className="text-blue-500" size={24} />
            <h3 className="font-semibold text-gray-900 text-lg">Pending Tasks</h3>
          </div>
          <button
            onClick={() => navigate('/sales/tasks')}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View All →
          </button>
        </div>

        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => navigate('/sales/tasks')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-teal-300 transition-all"
            >
              <div className="flex items-center space-x-3">
                <Clock className="text-gray-500" size={20} />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{task.task}</p>
                  <p className="text-sm text-gray-600">{task.date}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}