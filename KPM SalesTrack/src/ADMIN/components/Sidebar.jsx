import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartBar, FaUsers, FaUserTie, FaMapMarkerAlt, FaClipboardList, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ isOpen = true }) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: FaChartBar, path: '/admin' },
    { name: 'Employees', icon: FaUsers, path: '/admin/employees' },
    { name: 'Client View', icon: FaUserTie, path: '/admin/clients' },
    { name: 'Live Location', icon: FaMapMarkerAlt, path: '/admin/live-location' },
    { name: 'Task Assignment', icon: FaClipboardList, path: '/admin/tasks' },
    { name: 'Reports & Analytics', icon: FaChartLine, path: '/admin/reports' }
  ];

  const handleMenuClick = (item) => {
    setActiveMenu(item.name);
    navigate(item.path);
  };

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    navigate('/login');
  };

  return (
    <div className={`bg-gradient-to-b from-blue-900 to-blue-800 text-white h-screen fixed left-0 top-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden z-20`}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-emerald-400 rounded-lg flex items-center justify-center">
            <FaChartBar className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">SalesTrack</h2>
            <p className="text-xs text-blue-200">Admin Portal</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs text-blue-300 mb-3 uppercase tracking-wider">Admin Panel</p>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === item.name
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-800'
                  }`}
                >
                  <IconComponent />
                  <span className="text-sm">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg transition-colors"
        >
          <FaSignOutAlt />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;