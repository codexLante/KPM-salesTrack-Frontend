import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ClientListView from './ClientListView';
import AddClientForm from './AddClientForm';
import ClientDetails from './ClientDetails';

const ClientManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    industry: '',
    assignedTo: ''
  });

  // Dummy employees data
  const [employees] = useState([
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
    }
  ]);

  // Dummy clients data
  const [clients, setClients] = useState([
    {
      id: 1,
      companyName: 'Tech Solutions Ltd',
      contactPerson: 'John Doe',
      email: 'john@techsolutions.com',
      phone: '+254 712345678',
      location: 'Nairobi, Kenya',
      industry: 'Technology',
      assignedTo: 1,
      lastContact: 'Oct 16',
      upcomingMeeting: 'Nov 20'
    },
    {
      id: 2,
      companyName: 'Global Enterprises',
      contactPerson: 'Jane Smith',
      email: 'jane@globalent.com',
      phone: '+254 723456789',
      location: 'Mombasa, Kenya',
      industry: 'Manufacturing',
      assignedTo: 2,
      lastContact: 'Oct 18',
      upcomingMeeting: 'Nov 25'
    },
    {
      id: 3,
      companyName: 'Retail Masters',
      contactPerson: 'Peter Kimani',
      email: 'peter@retailmasters.com',
      phone: '+254 734567890',
      location: 'Kisumu, Kenya',
      industry: 'Retail',
      assignedTo: 3,
      lastContact: 'Oct 20',
      upcomingMeeting: 'Dec 1'
    }
  ]);

  const filteredClients = clients.filter(client => 
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    if (formData.companyName && formData.contactPerson && formData.email && 
        formData.phone && formData.location && formData.industry && formData.assignedTo) {
      const newClient = {
        id: clients.length + 1,
        ...formData,
        assignedTo: parseInt(formData.assignedTo),
        lastContact: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        upcomingMeeting: 'TBD'
      };
      
      setClients([...clients, newClient]);
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        location: '',
        industry: '',
        assignedTo: ''
      });
      navigate('/admin/clients');
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
      assignedTo: ''
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

  return (
    <Routes>
      {/* Client List - Main view */}
      <Route 
        index 
        element={
          <ClientListView
            clients={clients}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setShowAddForm={handleShowAddForm}
            filteredClients={filteredClients}
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
            client={clients.find(c => c.id === parseInt(window.location.pathname.split('/').pop()))}
            onBack={handleBack}
            employees={employees}
          />
        } 
      />
    </Routes>
  );
};

export default ClientManagement;