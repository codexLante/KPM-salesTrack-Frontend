import StatCard from './StatCard';
import SearchBar from './SearchBar';
import FilterButtons from './FilterButtons';
import EmployeeTable from './EmployeeTable';

const EmployeeListView = ({ 
  employees, 
  activeFilter, 
  setActiveFilter, 
  searchTerm, 
  setSearchTerm, 
  setShowAddForm,
  filteredEmployees 
}) => {
  const activeCount = employees.filter(e => e.status === 'active').length;
  const inactiveCount = employees.filter(e => e.status === 'inactive').length;

  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Employee Management</h2>
          <p className="text-gray-600">Manage your sales team members</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Add Employee
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <StatCard 
          title="Active employees" 
          value={activeCount} 
          borderColor="border-teal-400" 
          valueColor="text-teal-600" 
        />
        <StatCard 
          title="Inactive employees" 
          value={inactiveCount} 
          borderColor="border-red-400" 
          valueColor="text-red-600" 
        />
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex gap-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterButtons activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </div>

      {/* Employee Table */}
      <EmployeeTable employees={filteredEmployees} />
    </>
  );
};

export default EmployeeListView;