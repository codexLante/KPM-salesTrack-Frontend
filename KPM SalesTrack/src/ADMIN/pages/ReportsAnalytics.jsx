import { Users, Calendar } from 'lucide-react';
import StatCard from '../components/StatCard';
import PerformanceChart from '../components/performanceChart';

const ReportsAnalytics = () => {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Reports & Analytics</h2>
        <p className="text-gray-600">Comprehensive insights into your sales performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          title="New Clients"
          value={204}
          borderColor="border-cyan-400"
          valueColor="text-cyan-500"
          Icon={Users}
          iconBgColor="bg-cyan-100"
          iconColor="text-cyan-500"
        />
        
        <StatCard
          title="Meetings Held"
          value={305}
          borderColor="border-cyan-400"
          valueColor="text-cyan-500"
          Icon={Calendar}
          iconBgColor="bg-cyan-100"
          iconColor="text-cyan-500"
        />
      </div>

      {/* Chart Section */}
      <PerformanceChart />
    </div>
  );
};

export default ReportsAnalytics;