import { FaUsers, FaUserCheck, FaClipboardCheck } from 'react-icons/fa';
import StatCard from '../../components/StatCard';
import PerformanceChart from '../../components/performanceChart';
import ActivityFeed from './activtyFeed';
import MeetingSchedule from './meetingSchedule';

const Dashboard = () => {
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
          value="248"
          change="12% from last month"
          Icon={FaUsers}
          color="text-blue-500"
          borderColor="border-blue-500"
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Active Employees"
          value="238"
          Icon={FaUserCheck}
          color="text-emerald-500"
          borderColor="border-emerald-500"
          bgColor="bg-emerald-50"
        />
        <StatCard
          title="Today's Check-ins"
          value="238"
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