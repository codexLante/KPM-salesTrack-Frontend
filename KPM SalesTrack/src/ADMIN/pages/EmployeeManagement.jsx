import { useState } from 'react';
import EmployeeListView from '../components/EmployeeListView';
import AddEmployeeForm from '../components/AddEmployeeForm';
import EmployeeDetails from '../components/EmployeeDetails';

const EmployeeManagement = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('list');
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
      name: 'Eugene mwite',
      email: 'mugure@blue.io',
      phone: '+1245537687',
      role: 'Sales Manager',
      status: 'active',
      clients: 3,
      initials: 'EM'
    },
    {
      id: 2,
      name: 'Erica muthoni',
      email: 'doe@blue.io',
      phone: '+1245537687',
      role: 'Sales rep',
      status: 'active',
      clients: 3,
      initials: 'EM'
    },
    {
      id: 3,
      name: 'Eva Mwaki',
      email: 'tony@Tony.io',
      phone: '+1245537687',
      role: 'Sales rep',
      status: 'active',
      clients: 3,
      initials: 'EM'
    },
    {
      id: 4,
      name: 'Elly Mbita',
      email: 'Silversufer@board.io',
      phone: '+1245537687',
      role: 'Sales rep',
      status: 'inactive',
      clients: 0,
      initials: 'EM'
    },
    {
      id: 5,
      name: 'John Kamau',
      email: 'jkamau@sales.io',
      phone: '+1245537688',
      role: 'Sales rep',
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
  );
};

export default EmployeeManagement;