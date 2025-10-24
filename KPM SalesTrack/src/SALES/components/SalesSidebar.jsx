// src/SALES/components/SalesSidebar.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Target, 
  ClipboardList,
  LogOut
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function SalesSidebar({ isOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/sales/dashboard" },
    { id: "meetings", label: "Meetings", icon: Calendar, path: "/sales/meetings" },
    { id: "clients", label: "My Clients", icon: Users, path: "/sales/clients" },
    { id: "objectives", label: "Objectives", icon: Target, path: "/sales/objectives" },
    { id: "task", label: "Task", icon: ClipboardList, path: "/sales/tasks" }
  ];

  const handleMenuClick = (item) => {
    setActiveItem(item.id);
    navigate(item.path);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#1e3a8a] text-white flex flex-col shadow-xl z-50">
      {/* Logo */}
      <div className="p-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">
          📊
        </div>
        <span className="text-xl font-bold">SalesTrack</span>
      </div>

      {/* Panel Label */}
      <div className="px-6 py-3">
        <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
          ADMIN PANEL
        </p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
                          (item.id === "dashboard" && location.pathname === "/sales");
          
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-700 text-white font-medium"
                  : "text-blue-100 hover:bg-blue-800"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-lg transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}