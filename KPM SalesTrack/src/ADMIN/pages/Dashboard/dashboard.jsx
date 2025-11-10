import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers, FaUserCheck, FaClipboardCheck } from 'react-icons/fa';
import StatCard from '../../components/StatCard';
import PerformanceChart from '../../components/performanceChart';
import ActivityFeed from './activtyFeed';
import MeetingSchedule from './meetingSchedule';

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [todaysMeetings, setTodaysMeetings] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch employee data
      const userRes = await axios.get('https://salestrack-backend.onrender.com/users/GetAll', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Handle paginated response
      const users = userRes.data?.users || [];
      const totalCount = userRes.data?.pagination?.total || users.length;
      const activeCount = users.filter(u => u.is_active).length;

      setTotalEmployees(totalCount);
      setActiveEmployees(activeCount);

      // Fetch today's meetings (admin-wide)
      const meetingRes = await axios.get('https://salestrack-backend.onrender.com/meetings/sales/today', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const meetings = Array.isArray(meetingRes.data?.meetings) ? meetingRes.data.meetings : [];
      setTodaysMeetings(meetings.length);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening with your sales team today.</p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Total Employees"
          value={loading ? '...' : totalEmployees}
          Icon={FaUsers}
          color="text-blue-500"
          borderColor="border-blue-500"
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Active Employees"
          value={loading ? '...' : activeEmployees}
          Icon={FaUserCheck}
          color="text-emerald-500"
          borderColor="border-emerald-500"
          bgColor="bg-emerald-50"
        />
        <StatCard
          title="Today's Meetings"
          value={loading ? '...' : todaysMeetings}
          Icon={FaClipboardCheck}
          color="text-cyan-500"
          borderColor="border-cyan-500"
          bgColor="bg-cyan-50"
        />
      </div>

      {/* Performance Chart */}
      <div className="mb-6">
        <PerformanceChart />
      </div>

      {/* Activity Feed and Meeting Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <MeetingSchedule />
      </div>
    </>
  );
};

export default Dashboard;