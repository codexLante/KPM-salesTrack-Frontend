import { Menu } from 'lucide-react';

const Header = ({ onToggleSidebar }) => {
  return (
    <div className="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold">SalesTrack Admin</h1>
      </div>
    </div>
  );
};

export default Header;