import React from 'react';
import { LayoutDashboard, Users, MapPin, ClipboardList, BarChart3, LogOut } from 'lucide-react';

const Sidebar = ({ activePage, onNavigate }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', page: 'dashboard', active: false },
    { icon: Users, label: 'Employee Management', page: 'employees', active: activePage === 'employees' },
    { icon: Users, label: 'Client View', page: 'clients', active: activePage === 'clients' },
    { icon: MapPin, label: 'Live Location', page: 'location', active: false },
    { icon: ClipboardList, label: 'Task Assignment', page: 'tasks', active: false },
    { icon: BarChart3, label: 'Reports & Analytics', page: 'reports', active: false }
  ];

  return (
    <div className="w-64 bg-blue-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl">
          📊
        </div>
        <div>
          <div className="font-bold text-lg">SalesTrack</div>
          <div className="text-xs text-blue-300">Admin Portal</div>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-3">
        <div className="text-xs text-blue-300 px-3 py-2 mb-2">ADMIN PANEL</div>
        
        <div className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                onClick={() => onNavigate(item.page)}
                className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer ${
                  item.active ? 'bg-blue-800' : 'hover:bg-blue-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-blue-800">
        <div className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-800 cursor-pointer">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;