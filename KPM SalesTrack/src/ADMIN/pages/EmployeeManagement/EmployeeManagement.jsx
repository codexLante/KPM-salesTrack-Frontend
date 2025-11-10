import { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeListView from './EmployeeListView';
import AddEmployeeForm from './AddEmployeeForm';
import EmployeeDetails from './EmployeeDetails';
import { Modal } from '../../components/modal';

const API_BASE_URL = 'https://salestrack-backend.onrender.com/users';

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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getToken = () => localStorage.getItem('token');

  const showModal = (title, message, type = 'success', actions = []) => {
    setModal({ title, message, type, actions });
  };
  const closeModal = () => setModal(null);

  useEffect(() => {
    fetchAllEmployees(currentPage);
  }, [currentPage]);

  const fetchAllEmployees = (page = 1) => {
    setIsLoading(true);
    setError(null);
    const token = getToken();

    axios({
      method: "GET",
      url: `${API_BASE_URL}/GetAll?page=${page}&per_page=10`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        let users = [];
        let pagination = {};
        
        if (Array.isArray(res.data)) {
          users = res.data;
          pagination = { page: page, pages: 1, total: users.length, per_page: 10 };
        } else {
          users = res.data?.users || [];
          pagination = res.data?.pagination || {};
        }

        const transformedEmployees = users.map(user => ({
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
        setCurrentPage(pagination.page || page);
        setTotalPages(pagination.pages || 1);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || err.message || 'Failed to fetch employees';
        setError(errorMsg);
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
        setCurrentPage(1);
        fetchAllEmployees(1);
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
      .then(() => {
        setEmployees(employees.map(emp =>
          emp.id === employeeId ? { ...emp, status: newStatus } : emp
        ));
        if (selectedEmployee?.id === employeeId) {
          setSelectedEmployee({ ...selectedEmployee, status: newStatus });
        }
        showModal('Status Updated', `Employee status updated successfully!`, 'success');
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to update employee status';
        showModal('Update Failed', `Error: ${errorMsg}`, 'error');
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
        setCurrentPage(1);
        fetchAllEmployees(1);
        setCurrentView('list');
        setSelectedEmployee(null);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to delete employee';
        showModal('Deletion Failed', `Error: ${errorMsg}`, 'error');
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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="p-8">
      {modal && <Modal {...modal} onClose={closeModal} />}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {isLoading && currentView === 'list' && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <span className="animate-pulse text-cyan-600 font-semibold">Loading employees ...</span>
        </div>
      )}

      {currentView === 'list' && !isLoading && (
        <>
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

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm font-medium py-2">Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
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