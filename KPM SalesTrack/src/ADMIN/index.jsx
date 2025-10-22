import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement';
import ClientManagement from './pages/ClientManagement';

const AdminHub = () => {
  const [activePage, setActivePage] = useState('dashboard');

  // Mock employees data for ClientManagement
  const employees = [
    { id: 1, name: 'Eugene Mwite', initials: 'EM' },
    { id: 2, name: 'Erica Muthoni', initials: 'EM' },
    { id: 3, name: 'Eva Mwaki', initials: 'EM' },
    { id: 4, name: 'Eric Mbithi', initials: 'EM' },
    { id: 5, name: 'John Kamau', initials: 'JK' }
  ];

  const handleNavigate = (page) => {
    setActivePage(page);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <EmployeeManagement />;
      case 'clients':
        return <ClientManagement employees={employees} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />

      <div className="flex-1 overflow-auto">
        <Header />
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminHub;