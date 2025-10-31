import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ClientListView from './ClientListView';
import AddClientForm from './AddClientForm';
import ClientDetails from './ClientDetails';

const ClientManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    industry: '',
    assignedTo: '',
    coordinates: null
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchClients();
    fetchEmployees();
  }, []);

  const fetchClients = () => {
    setIsLoading(true);
    setError('');

    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/clients/GetAll",  
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res);
        const clientsData = res?.data?.clients || res?.data || [];
        setClients(clientsData);
      })
      .catch((e) => {
        console.log(e);
        setError(e.response?.data?.error || "Failed to load clients");
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
    url: "http://127.0.0.1:5000/users/GetAll",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      console.log("Employees fetched:", res);
      const usersData = Array.isArray(res?.data) ? res.data : [];
      const salesUsers = usersData.filter(u => u.role === 'salesman');
      const employeesData = salesUsers.map(u => ({
        id: u.id,
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
      console.error("Error fetching employees:", e);
      setError(e.response?.data?.error || "Failed to load employees");
    });
};

  const filteredClients = clients.filter(client => 
    client.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact_person?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    if (formData.companyName && formData.contactPerson && formData.email && 
        formData.phone && formData.location && formData.assignedTo) {
      
      setIsLoading(true);
      setError('');

      axios({
        method: "POST",
        url: "http://127.0.0.1:5000/clients/create", 
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
          assigned_to: parseInt(formData.assignedTo)
        }
      })
        .then((res) => {
          console.log(res);
          fetchClients();
          setFormData({
            companyName: '',
            contactPerson: '',
            email: '',
            phone: '',
            location: '',
            industry: '',
            assignedTo: '',
            coordinates: null
          });
          navigate('/admin/clients');
        })
        .catch((e) => {
          console.log(e);
          setError(e.response?.data?.error || "Failed to add client");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setError("Please fill in all required fields");
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
      assignedTo: '',
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
    assignedTo: c.assigned_to,
    lastContact: new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    upcomingMeeting: 'TBD'
  }));

  if (isLoading && clients.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading clients...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <Routes>
        {/* Client List - Main view */}
        <Route 
          index 
          element={
            <ClientListView
              clients={displayClients}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setShowAddForm={handleShowAddForm}
              filteredClients={displayClients}
              onClientClick={handleClientClick}
              employees={employees}
            />
          } 
        />

        {/* Add Client Form */}
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

        {/* Client Details */}
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