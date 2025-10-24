// src/SALES/components/SalesHeader.jsx
import { Menu } from "lucide-react";

export default function SalesHeader({ onToggleSidebar }) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center">
      <button
        onClick={onToggleSidebar}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-4"
      >
        <Menu size={24} />
      </button>
      
      <h1 className="text-xl font-bold text-gray-800">SalesTrack</h1>
    </header>
  );
}