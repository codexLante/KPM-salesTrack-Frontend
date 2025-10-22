import { useState } from 'react';
import EmployeeListView from '../components/EmployeeListView';
import AddEmployeeForm from '../components/AddEmployeeForm';

const EmployeeManagement = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
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
      email: 'eugi@gmail.com',
      phone: '+254 795432443',
      role: 'Sales Manager',
      status: 'active',
      clients: 3,
      initials: 'EM'
    },
    {
      id: 2,
      name: 'Erica muthoni',
      email: 'ericmu@gmail.com',
      phone: '+254 785734343',
      role: 'Sales rep',
      status: 'active',
      clients: 3,
      initials: 'EM'
    },
    {
      id: 3,
      name: 'Eva Mwaki',
      email: 'evamaki@gmail.com',
      phone: '+254 798413457',
      role: 'Sales rep',
      status: 'active',
      clients: 3,
      initials: 'EM'
    },
    {
      id: 4,
      name: 'Elly Mbita',
      email: 'Ellymbui@gmail.com',
      phone: '+254 723432563',
      role: 'Sales rep',
      status: 'inactive',
      clients: 0,
      initials: 'EM'
    },
    {
      id: 5,
      name: 'John Kamau',
      email: 'jkamau@gmail.com',
      phone: '+254 745445893',
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
      setShowAddForm(false);
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
    setShowAddForm(false);
  };

  return (
    <div>
      {!showAddForm ? (
        <EmployeeListView
          employees={employees}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setShowAddForm={setShowAddForm}
          filteredEmployees={filteredEmployees}
        />
      ) : (
        <AddEmployeeForm
          formData={formData}
          setFormData={setFormData}
          onAdd={handleAddEmployee}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EmployeeManagement;