import { useState } from "react";
import ClientsHeader from "./ClientsHeader";
import ClientsSearchBar from "./ClientsSearchBar";
import ClientsTable from "./ClientsTable";
import ClientDetails from "./ClientDetails";
import AddClientForm from "./AddClientForm";

export default function MyClients() {
  const [view, setView] = useState("list"); // 'list', 'details', 'add'
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy clients data
  const [clients, setClients] = useState([
    {
      id: 1,
      companyName: "TechCorp Solutions",
      contactPerson: "Eric Chan",
      email: "eric.chan@techcorp.com",
      phone: "0712345678",
      location: "Kilimani",
      notes: "Key client interested in enterprise solutions",
      dateAdded: "2024-10-26",
      upcomingMeetings: [
        { id: 1, type: "Product Demo", date: "2024-10-28", time: "10:00 AM", duration: "1 hour" }
      ],
      pastMeetings: [
        { id: 1, date: "2024-09-15", time: "02:00 PM", duration: "45 minutes", notes: "Discussed product requirements and pricing" },
        { id: 2, date: "2024-08-20", time: "11:00 AM", duration: "1 hour", notes: "Initial consultation meeting" }
      ]
    },
    {
      id: 2,
      companyName: "Global Enterprises",
      contactPerson: "Eric Demo",
      email: "Lisha@gmail.com",
      phone: "0712345678",
      location: "Kilimani",
      notes: "Growing startup with high potential",
      dateAdded: "2024-10-26",
      upcomingMeetings: [],
      pastMeetings: [
        { id: 1, date: "2024-10-10", time: "09:00 AM", duration: "30 minutes", notes: "Quick follow-up on proposal" }
      ]
    },
    {
      id: 3,
      companyName: "Innovative Systems",
      contactPerson: "Iris Allen",
      email: "Lisha@gmail.com",
      phone: "0712345678",
      location: "Kilimani",
      notes: "Interested in custom integration solutions",
      dateAdded: "2024-10-26",
      upcomingMeetings: [
        { id: 1, type: "Follow-up", date: "2024-10-30", time: "02:00 PM", duration: "30 minutes" }
      ],
      pastMeetings: [
        { id: 1, date: "2024-10-01", time: "03:00 PM", duration: "1.5 hours", notes: "Comprehensive product demonstration" },
        { id: 2, date: "2024-09-10", time: "10:00 AM", duration: "45 minutes", notes: "Discovery meeting" }
      ]
    },
    {
      id: 4,
      companyName: "DataSync Inc",
      contactPerson: "Dane wayne",
      email: "Lisha@gmail.com",
      phone: "0712345678",
      location: "Kilimani",
      notes: "Requires urgent implementation timeline",
      dateAdded: "2024-10-26",
      upcomingMeetings: [],
      pastMeetings: [
        { id: 1, date: "2024-09-25", time: "01:00 PM", duration: "2 hours", notes: "Technical requirements discussion" }
      ]
    },
    {
      id: 5,
      companyName: "CloudWave Technologies",
      contactPerson: "li shane",
      email: "Lisha@gmail.com",
      phone: "0712345678",
      location: "Kilimani",
      notes: "Enterprise client with multiple departments",
      dateAdded: "2024-10-26",
      upcomingMeetings: [
        { id: 1, type: "Presentation", date: "2024-11-02", time: "11:00 AM", duration: "2 hours" }
      ],
      pastMeetings: [
        { id: 1, date: "2024-10-15", time: "04:00 PM", duration: "1 hour", notes: "Budget and timeline discussion" },
        { id: 2, date: "2024-09-30", time: "02:00 PM", duration: "45 minutes", notes: "Stakeholder introduction meeting" }
      ]
    },
    {
      id: 6,
      companyName: "NextGen Solutions",
      contactPerson: "Wayne corp",
      email: "Lisha@gmail.com",
      phone: "0712345678",
      location: "Kilimani",
      notes: "Long-term partnership potential",
      dateAdded: "2024-10-26",
      upcomingMeetings: [],
      pastMeetings: [
        { id: 1, date: "2024-10-05", time: "09:30 AM", duration: "1 hour", notes: "Contract negotiation meeting" },
        { id: 2, date: "2024-09-20", time: "03:00 PM", duration: "30 minutes", notes: "Quick check-in call" },
        { id: 3, date: "2024-09-01", time: "10:00 AM", duration: "1.5 hours", notes: "Initial proposal presentation" }
      ]
    }
  ]);

  // Filter clients based on search
  const filteredClients = clients.filter(client =>
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = (newClient) => {
    const client = {
      id: clients.length + 1,
      ...newClient,
      dateAdded: new Date().toISOString().split('T')[0],
      upcomingMeetings: [],
      pastMeetings: []
    };
    setClients([...clients, client]);
    setView("list");
  };

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setView("details");
  };

  if (view === "add") {
    return (
      <AddClientForm
        onBack={() => setView("list")}
        onSubmit={handleAddClient}
      />
    );
  }

  if (view === "details" && selectedClient) {
    return (
      <ClientDetails
        client={selectedClient}
        onBack={() => setView("list")}
        onScheduleMeeting={() => {
          // Navigate to meetings page with client pre-selected
          console.log("Schedule meeting for", selectedClient.companyName);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ClientsHeader onAddClient={() => setView("add")} />
      <ClientsSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ClientsTable clients={filteredClients} onViewDetails={handleViewDetails} />
    </div>
  );
}