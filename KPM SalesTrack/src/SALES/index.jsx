import { Outlet } from "react-router-dom";
import { useState } from "react";
import SalesSidebar from "./components/SalesSidebar";
import SalesHeader from "./components/SalesHeader";

function SalesLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SalesSidebar isOpen={sidebarOpen} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <SalesHeader onToggleSidebar={toggleSidebar} />
        
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SalesLayout;