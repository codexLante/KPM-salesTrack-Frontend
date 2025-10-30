import { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeListView from './EmployeeListView';
import AddEmployeeForm from './AddEmployeeForm';
import EmployeeDetails from './EmployeeDetails';

const API_BASE_URL = 'http://localhost:5000/users';

const EmployeeManagement = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('list');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    status: ''
  });

  const getToken = () => localStorage.getItem('token');


  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = () => {
    setIsLoading(true);
    setError(null);
    
    axios({
      method: "GET",
      url: `${API_BASE_URL}/GetAll`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        const transformedEmployees = res.data.map(user => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          phone: user.phone_number,
          role: user.role,
          status: user.is_active ? 'active' : 'inactive',
          clients: 0,
          initials: `${user.first_name[0]}${user.last_name[0]}`.toUpperCase(),
          first_name: user.first_name,
          last_name: user.last_name
        }));
        setEmployees(transformedEmployees);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to fetch employees';
        setError(errorMsg);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  const handleAddEmployee = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.role || !formData.status) {
      alert('Please fill all fields');
      return;
    }

    setIsLoading(true);

    const nameParts = formData.fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || firstName;
    const tempPassword = `Temp@${Date.now().toString().slice(-4)}`;

    axios({
      method: "POST",
      url: `${API_BASE_URL}/add`,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      data: {
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        phone_number: formData.phone,
        role: formData.role.toLowerCase(),
        password: tempPassword
      }
    })
      .then((res) => {
        alert('Employee added successfully!');
        
        const newEmployee = {
          id: res.data.user.id,
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          status: formData.status === 'active' ? 'active' : 'inactive',
          clients: 0,
          initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
          first_name: firstName,
          last_name: lastName
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
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to add employee';
        alert(`Error: ${errorMsg}`);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateEmployeeStatus = (employeeId, newStatus) => {
    setIsLoading(true);

    const endpoint = newStatus === 'active' 
      ? `${API_BASE_URL}/${employeeId}/Active`
      : `${API_BASE_URL}/${employeeId}/Inactive`;

    axios({
      method: "PUT",
      url: endpoint,
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        setEmployees(employees.map(emp =>
          emp.id === employeeId 
            ? { ...emp, status: newStatus } 
            : emp
        ));

        if (selectedEmployee?.id === employeeId) {
          setSelectedEmployee({ ...selectedEmployee, status: newStatus });
        }

        alert(`Employee ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to update employee status';
        alert(`Error: ${errorMsg}`);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      // TODO: Implement 
      alert('Delete functionality to be implemented');
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesFilter = 
      activeFilter === 'all' ? true :
      activeFilter === 'active' ? emp.status === 'active' :
      emp.status === 'inactive';
    
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

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
      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && currentView === 'list' && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <span className="animate-pulse text-cyan-600 font-semibold">Loading employees ...</span>
        </div>
      )}

      {currentView === 'list' && !isLoading && (
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
          isLoading={isLoading}
        />
      )}

      {currentView === 'details' && selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          onBack={handleBackToList}
          onStatusChange={handleUpdateEmployeeStatus}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default EmployeeManagement;