import React from 'react';
import SearchBar from './SearchBar';
import ClientTable from './ClientTable';

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
    <>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Client Management</h2>
          <p className="text-gray-600">Manage and track all your client relationships</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Add Client
        </button>
      </div>

      {/* Total Clients Card */}
      <div className="bg-white rounded-lg p-6 mb-8 border-l-4 border-cyan-400 max-w-xs">
        <div className="text-gray-600 mb-2">Total Clients</div>
        <div className="text-5xl font-light text-cyan-500">{clients.length}</div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Client Table */}
      <ClientTable 
        clients={filteredClients} 
        onClientClick={onClientClick}
        employees={employees}
      />
    </>
  );
};

export default ClientListView;