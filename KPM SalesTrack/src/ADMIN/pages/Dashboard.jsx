import React from 'react';
import StatCard from '../components/StatCard';

const Dashboard = () => {
  // Mock data - in a real app, this would come from props or API
  const totalEmployees = 5;
  const activeEmployees = 3;
  const totalClients = 4;
  const activeClients = 4; // Assuming all clients are active

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          borderColor="border-blue-500"
          valueColor="text-blue-600"
        />
        <StatCard
          title="Active Employees"
          value={activeEmployees}
          borderColor="border-green-500"
          valueColor="text-green-600"
        />
        <StatCard
          title="Total Clients"
          value={totalClients}
          borderColor="border-purple-500"
          valueColor="text-purple-600"
        />
        <StatCard
          title="Active Clients"
          value={activeClients}
          borderColor="border-orange-500"
          valueColor="text-orange-600"
        />
      </div>

      {/* Placeholder for additional dashboard content */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-600">Dashboard content can be expanded with charts, recent activities, etc.</p>
      </div>
    </div>
  );
};

export default Dashboard;
