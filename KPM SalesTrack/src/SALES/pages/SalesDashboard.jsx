// src/SALES/pages/SalesDashboard.jsx
import { useState } from "react";
import { Calendar, ClipboardList, Users, Target, Clock } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function SalesDashboard() {
  const { user } = useAuth();
  const [checkedIn, setCheckedIn] = useState(false);

  // Dummy data
  const todaysMeetings = [
    { id: 1, company: "ABC Corporaton", time: "9:00Am", status: "Upcoming" },
    { id: 2, company: "ABC Tech", time: "10:00Am", status: "Upcoming" },
    { id: 3, company: "wayne Tech", time: "12:00pm", status: "Upcoming" }
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
              Welcome back
            </h2>
            <p className={`font-bold ${checkedIn ? 'text-black' : 'text-gray-900'}`}>
              {checkedIn ? 'Checked In' : 'Checked Out'}
            </p>
            <p className={`text-sm ${checkedIn ? 'text-black' : 'text-gray-600'}`}>
              {checkedIn ? 'Toggle to Check out' : 'Toggle to start your day'}
            </p>
          </div>
          
          {/* Toggle Switch */}
          <button
            onClick={() => setCheckedIn(!checkedIn)}
            className={`relative w-14 h-7 rounded-full transition-colors ${
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
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Meetings */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Today's meeting</p>
            <Calendar className="text-blue-500" size={32} />
          </div>
          <p className="text-4xl font-bold text-gray-900">{todaysMeetings.length}</p>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Pending Tasks</p>
            <ClipboardList className="text-teal-400" size={32} />
          </div>
          <p className="text-4xl font-bold text-gray-900">{pendingTasks.length}</p>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow text-center">
          <Calendar className="mx-auto mb-3 text-gray-700" size={32} />
          <p className="font-semibold text-gray-900">Meetings</p>
        </button>

        <button className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow text-center">
          <Users className="mx-auto mb-3 text-gray-700" size={32} />
          <p className="font-semibold text-gray-900">My Clients</p>
        </button>

        <button className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow text-center">
          <Target className="mx-auto mb-3 text-gray-700" size={32} />
          <p className="font-semibold text-gray-900">Objectives</p>
        </button>

        <button className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow text-center">
          <ClipboardList className="mx-auto mb-3 text-gray-700" size={32} />
          <p className="font-semibold text-gray-900">Task</p>
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
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="text-blue-500" size={24} />
            <h3 className="font-semibold text-gray-900 text-lg">
              Today's meeting({todaysMeetings.length})
            </h3>
          </div>

          <div className="space-y-3">
            {todaysMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="text-gray-500" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">{meeting.company}</p>
                    <p className="text-sm text-gray-600">{meeting.time}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700">
                  {meeting.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Tasks Section */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <ClipboardList className="text-blue-500" size={24} />
          <h3 className="font-semibold text-gray-900 text-lg">Pending Tasks</h3>
        </div>

        <div className="space-y-3">
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <Clock className="text-gray-500" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">{task.task}</p>
                  <p className="text-sm text-gray-600">{task.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}