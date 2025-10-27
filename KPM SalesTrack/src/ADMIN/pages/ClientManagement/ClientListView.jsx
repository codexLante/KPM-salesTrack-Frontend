import { Users } from 'lucide-react';
import SearchBar from './SearchBar';
import ClientTable from './ClientTable';
import StatCard from './StatCard';

const ClientListView = ({
  clients,
  searchTerm,
  setSearchTerm,
  setShowAddForm,
  filteredClients,
  onClientClick,
  employees
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2">Client Management</h2>
          <p className="text-gray-600">Manage and track all your client relationships</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded flex items-center gap-2 transition"
        >
          <span className="text-xl">+</span>
          Add Client
        </button>
      </div>

      {/* Stats Bar */}
      <div className="mb-8">
        <StatCard
          title="Total Clients"
          value={clients.length}
          borderColor="border-cyan-400"
          valueColor="text-cyan-500"
          bgColor="bg-cyan-100"
          color="text-cyan-500"
          Icon={Users}
        />
      </div>

      {/* Search */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Client Table */}
      <ClientTable
        clients={filteredClients}
        onClientClick={onClientClick}
        employees={employees}
      />
    </div>
  );
};

export default ClientListView;
