import { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeListView from './EmployeeListView';
import AddEmployeeForm from './AddEmployeeForm';
import EmployeeDetails from './EmployeeDetails';
import { Modal } from '../../components/modal'; 

const API_BASE_URL = 'https://kpm-salestrack-backend.onrender.com/users';

const EmployeeManagement = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('list');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null); 
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    status: ''
  });

  const getToken = () => localStorage.getItem('token');

  const showModal = (title, message, type = 'success', actions = []) => {
    setModal({ title, message, type, actions });
  };
  const closeModal = () => setModal(null);


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
          showModal("Session Expired", "Your session has expired. Please log in again.", "error", [
            { label: "Login", onClick: () => window.location.href = '/login', primary: true }
          ]);
        }
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  const handleAddEmployee = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.role || !formData.status) {
      showModal('Validation Error', 'Please fill all fields to add a new employee.', 'error');
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
        showModal('Success!', `${firstName} ${lastName} has been added successfully!`, 'success');
        
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
        showModal('Error Adding Employee', `Error: ${errorMsg}`, 'error');
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
        const updatedName = employees.find(emp => emp.id === employeeId)?.name || 'Employee';
        const action = newStatus === 'active' ? 'activated' : 'deactivated';

        setEmployees(employees.map(emp =>
          emp.id === employeeId 
            ? { ...emp, status: newStatus } 
            : emp
        ));

        if (selectedEmployee?.id === employeeId) {
          setSelectedEmployee({ ...selectedEmployee, status: newStatus });
        }


        showModal('Status Updated', `${updatedName} has been ${action} successfully!`, 'success');
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to update employee status';
        showModal('Update Failed', `Error: ${errorMsg}`, 'error');
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteEmployee = (employeeId) => {
    const employeeName = employees.find(emp => emp.id === employeeId)?.name || 'this employee';
    
    showModal(
        'Confirm Deletion', 
        `Are you sure you want to delete ${employeeName}? This action cannot be undone.`, 
        'error', 
        [
            { label: 'Cancel', onClick: closeModal, primary: false },
            { label: 'Delete', onClick: () => confirmDelete(employeeId), primary: true }
        ]
    );
  };
  
  const confirmDelete = (employeeId) => {
      closeModal();
      setIsLoading(true);
      axios({
        method: "DELETE",
        url: `${API_BASE_URL}/delete/${employeeId}`, 
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
      })
        .then(() => {
          showModal('Deleted', 'Employee deleted successfully!', 'success');
          setEmployees(employees.filter(emp => emp.id !== employeeId));
          setCurrentView('list');
          setSelectedEmployee(null);
        })
        .catch((err) => {
          const errorMsg = err.response?.data?.error || 'Failed to delete employee';
          showModal('Deletion Failed', `Error: ${errorMsg}`, 'error');
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
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
      {/* 3. RENDER MODAL */}
      {modal && <Modal {...modal} onClose={closeModal} />} 

      {/* Replaced conditional alert message with conditional rendering based on 'error' state for simple display */}
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
          onDelete={handleDeleteEmployee}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default EmployeeManagement;