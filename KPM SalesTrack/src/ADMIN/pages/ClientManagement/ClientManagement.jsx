import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClientListView from './ClientListView';
import AddClientForm from './AddClientForm';
import ClientDetails from './ClientDetails';
import { Modal } from '../../components/modal';

const ClientManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusModal, setStatusModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    industry: '',
    coordinates: null
  });

  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = storedUser?.id;

  const showStatusModal = (title, message, type = 'success', actions = []) => {
    setStatusModal({ title, message, type, actions });
  };
  const closeStatusModal = () => setStatusModal(null);

  useEffect(() => {
    fetchClients(currentPage);
    fetchEmployees();
  }, [currentPage]);

  const fetchClients = (page = 1) => {
    setIsLoading(true);
    setError('');

    axios({
      method: "GET",
      url: `https://salestrack-backend.onrender.com/clients/GetAll?page=${page}&per_page=10`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        const clientsData = res?.data?.clients || [];
        const pagination = res?.data?.pagination || {};
        setClients(clientsData);
        setCurrentPage(pagination.page || 1);
        setTotalPages(pagination.pages || 1);
      })
      .catch((e) => {
        const errorMsg = e.response?.data?.error || "Failed to load clients";
        setError(errorMsg);
        if (e.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchEmployees = () => {
    axios({
      method: "GET",
      url: "https://salestrack-backend.onrender.com/users/GetAll",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        const usersData = Array.isArray(res?.data) ? res.data : [];
        const employeesData = usersData.map(u => ({
          id: Number(u.id),
          name: `${u.first_name} ${u.last_name}`,
          email: u.email,
          phone: u.phone_number,
          role: u.role,
          status: u.is_active ? 'active' : 'inactive',
          clients: 0,
          initials: `${u.first_name[0]}${u.last_name[0]}`
        }));
        setEmployees(employeesData);
      })
      .catch((e) => {
        setError(e.response?.data?.error || "Failed to load employees");
      });
  };

  const filteredClients = clients.filter(client =>
    client.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact_person?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    const requiredFields = ['companyName', 'contactPerson', 'email', 'phone', 'location'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length === 0) {
      setIsLoading(true);
      setError('');

      axios({
        method: "POST",
        url: "https://salestrack-backend.onrender.com/clients/create",
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          company_name: formData.companyName,
          contact_person: formData.contactPerson,
          email: formData.email,
          phone_number: formData.phone,
          address: formData.location,
          status: "active",
        }
      })
        .then(() => {
          fetchClients(currentPage);
          showStatusModal(
            'Client Added!',
            `The client "${formData.companyName}" has been successfully created.`,
            'success',
            [{ label: 'Continue', onClick: closeStatusModal }]
          );
          setFormData({
            companyName: '',
            contactPerson: '',
            email: '',
            phone: '',
            location: '',
            industry: '',
            coordinates: null
          });
          navigate('/admin/clients');
        })
        .catch((e) => {
          const errorMsg = e.response?.data?.error || "Failed to add client";
          showStatusModal(
            'Creation Failed',
            errorMsg,
            'error',
            [{ label: 'Dismiss', onClick: closeStatusModal }]
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      showStatusModal(
        'Validation Required',
        `Please fill in all required fields: ${missingFields.join(', ')}.`,
        'warning',
        [{ label: 'Close', onClick: closeStatusModal }]
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      location: '',
      industry: '',
      coordinates: null
    });
    navigate('/admin/clients');
  };

  const handleClientClick = (client) => {
    navigate(`/admin/clients/${client.id}`);
  };

  const handleBack = () => {
    navigate('/admin/clients');
  };

  const handleShowAddForm = () => {
    navigate('/admin/clients/add');
  };

  const displayClients = filteredClients.map(c => ({
    id: c.id,
    companyName: c.company_name,
    contactPerson: c.contact_person,
    email: c.email,
    phone: c.phone_number,
    location: c.address,
    industry: c.industry || 'N/A',
    assignedTo: Number(c.assigned_to),
    lastContact: new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    upcomingMeeting: 'TBD'
  }));

  return (
    <>
      {statusModal && <Modal {...statusModal} onClose={closeStatusModal} />}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <Routes>
        <Route
          index
          element={
            <>
              <ClientListView
                clients={displayClients}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setShowAddForm={handleShowAddForm}
                filteredClients={displayClients}
                onClientClick={handleClientClick}
                employees={employees}
              />
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          }
        />

        <Route
          path="add"
          element={
            <AddClientForm
              formData={formData}
              setFormData={setFormData}
              onAdd={handleAddClient}
              onCancel={handleCancel}
              employees={employees}
            />
          }
        />

        <Route
          path=":clientId"
          element={
            <ClientDetails
              client={displayClients.find(c => c.id === parseInt(window.location.pathname.split('/').pop()))}
              onBack={handleBack}
              employees={employees}
            />
          }
        />
      </Routes>
    </>
  );
};

export default ClientManagement;
