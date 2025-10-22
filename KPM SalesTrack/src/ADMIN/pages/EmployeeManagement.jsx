import { useState } from 'react';
import EmployeeListView from '../components/EmployeeListView';
import AddEmployeeForm from '../components/AddEmployeeForm';
import EmployeeDetails from '../components/EmployeeDetails';

const EmployeeManagement = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'details'
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    status: ''
  });

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Eugene Mwite',
      email: 'eugenemwite@gmail.com',
      phone: '+254712345678',
      role: 'Sales Manager',
      status: 'active',
      clients: 3,
      initials: 'EM'
    },
    {
      id: 2,
      name: 'Erica Muthoni',
      email: 'ericamuthoni@gmail.com',
      phone: '+254701234567',
      role: 'Sales Rep',
      status: 'active',
      clients: 3,
      initials: 'EM'
    },
    {
      id: 3,
      name: 'Eva Mwaki',
      email: 'evamwaki@gmail.com',
      phone: '+254798765432',
      role: 'Sales Rep',
      status: 'active',
      clients: 3,
      initials: 'EM'
    },
    {
      id: 4,
      name: 'Elly Mbita',
      email: 'ellymbita@gmail.com',
      phone: '+254704567890',
      role: 'Sales Rep',
      status: 'inactive',
      clients: 0,
      initials: 'EM'
    },
    {
      id: 5,
      name: 'John Kamau',
      email: 'johnkamau@gmail.com',
      phone: '+254711223344',
      role: 'Sales Rep',
      status: 'inactive',
      clients: 0,
      initials: 'JK'
    }
  ]);

  const filteredEmployees = employees.filter(emp => {
    const matchesFilter = 
      activeFilter === 'all' ? true :
      activeFilter === 'active' ? emp.status === 'active' :
      emp.status === 'inactive';
    
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleAddEmployee = () => {
    if (formData.fullName && formData.email && formData.phone && formData.role && formData.status) {
      const initials = formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
      const newEmployee = {
        id: employees.length + 1,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        status: formData.status,
        clients: 0,
        initials: initials
      };
      
      setEmployees([...employees, newEmployee]);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        role: '',
        status: ''
      });
      setCurrentView('list');
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      role: '',
      status: ''
    });
    setCurrentView('list');
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setSelectedEmployee(null);
    setCurrentView('list');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <Header />
        
        <div className="p-8">
          {currentView === 'list' && (
            <EmployeeListView
              employees={employees}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setShowAddForm={() => setCurrentView('add')}
              filteredEmployees={filteredEmployees}
              onEmployeeClick={handleEmployeeClick}
            />
          )}

          {currentView === 'add' && (
            <AddEmployeeForm
              formData={formData}
              setFormData={setFormData}
              onAdd={handleAddEmployee}
              onCancel={handleCancel}
            />
          )}

          {currentView === 'details' && selectedEmployee && (
            <EmployeeDetails
              employee={selectedEmployee}
              onBack={handleBackToList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
