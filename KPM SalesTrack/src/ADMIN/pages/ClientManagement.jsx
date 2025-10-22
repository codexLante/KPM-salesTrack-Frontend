import React, { useState } from 'react';
import ClientListView from '../components/ClientListView';
import AddClientForm from '../components/AddClientForm';
import ClientDetails from '../components/ClientDetails';

const ClientManagement = ({ employees }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'details'
  const [selectedClient, setSelectedClient] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    industry: '',
    assignedTo: ''
  });

  const [clients, setClients] = useState([
    {
      id: 1,
      companyName: 'Electric Blue',
      contactPerson: 'Shainnah Mugure',
      email: 'mugure@blue.io',
      phone: '+1245537687',
      location: 'Kilimani',
      industry: 'Technology',
      assignedTo: 4,
      lastContact: 'Oct 16',
      upcomingMeeting: 'Nov 20'
    },
    {
      id: 2,
      companyName: 'Tech Inc',
      contactPerson: 'John Doe',
      email: 'doe@blue.io',
      phone: '+1245537687',
      location: 'Lavington',
      industry: 'Technology',
      assignedTo: 4,
      lastContact: 'Oct 10',
      upcomingMeeting: 'Nov 15'
    },
    {
      id: 3,
      companyName: 'Stark Industries',
      contactPerson: 'Stark Tony',
      email: 'tony@Tony.io',
      phone: '+1245537687',
      location: 'Ngong',
      industry: 'Manufacturing',
      assignedTo: 4,
      lastContact: 'Oct 12',
      upcomingMeeting: 'Nov 25'
    },
    {
      id: 4,
      companyName: 'Huik Inc',
      contactPerson: 'Silver Sufer',
      email: 'Silversufer@board.io',
      phone: '+1245537687',
      location: 'Karen',
      industry: 'Finance',
      assignedTo: 4,
      lastContact: 'Oct 18',
      upcomingMeeting: 'Nov 30'
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
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        industry: formData.industry,
        assignedTo: parseInt(formData.assignedTo),
        lastContact: 'Today',
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
      setCurrentView('list');
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
    setCurrentView('list');
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setSelectedClient(null);
    setCurrentView('list');
  };

  return (
    <div className="p-8">
          {currentView === 'list' && (
            <ClientListView
              clients={clients}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setShowAddForm={() => setCurrentView('add')}
              filteredClients={filteredClients}
              onClientClick={handleClientClick}
              employees={employees}
            />
          )}

          {currentView === 'add' && (
            <AddClientForm
              formData={formData}
              setFormData={setFormData}
              onAdd={handleAddClient}
              onCancel={handleCancel}
              employees={employees}
            />
          )}

          {currentView === 'details' && selectedClient && (
            <ClientDetails
              client={selectedClient}
              onBack={handleBackToList}
              employees={employees}
            />
          )}
    </div>
  );
};

export default ClientManagement;