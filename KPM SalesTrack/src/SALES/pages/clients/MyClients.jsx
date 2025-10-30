import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClientsHeader from "./ClientsHeader";
import ClientsSearchBar from "./ClientsSearchBar";
import ClientsTable from "./ClientsTable";
import AddClientForm from "./AddClientForm";
import ClientDetails from "./ClientDetails";

export default function ClientManagement() {
  const navigate = useNavigate();
  const [view, setView] = useState("list"); // 'list', 'add', 'details'
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    setIsLoading(true);
    setError("");

    axios({
      method: "GET",
      url: "http://127.0.0.1:5000/clients/my_clients",
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

  const handleAddClient = (formData) => {
    setIsLoading(true);
    setError("");

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
        assigned_to: user.id
      }
    })
      .then((res) => {
        console.log(res);
        fetchClients();
        setView("list");
      })
      .catch((e) => {
        console.log(e);
        setError(e.response?.data?.error || "Failed to add client");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

const handleViewDetails = async (client) => {
  setIsLoading(true);
  setError("");

  try {
    const [clientRes, meetingsRes] = await Promise.all([
      axios.get(`http://127.0.0.1:5000/clients/${client.id}/get`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
    axios.get(`http://127.0.0.1:5000/meetings/client/${client.id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    ]);

    const fullClient = clientRes.data;
    const meetings = meetingsRes.data;

    setSelectedClient({
      ...fullClient,
      companyName: fullClient.company_name,
      contactPerson: fullClient.contact_person,
      phone: fullClient.phone_number,
      location: fullClient.address,
      dateAdded: fullClient.created_at,
      notes: fullClient.notes || "",
      upcomingMeetings: meetings.upcomingMeetings || [],
      pastMeetings: meetings.pastMeetings || []
    });

    setView("details");
  } catch (e) {
    console.error("Failed to load client details:", e);
    setError("Failed to load client details");
  } finally {
    setIsLoading(false);
  }
};

  const handleScheduleMeeting = () => {
    navigate("/sales/meetings");
  };

  const filteredClients = clients.filter(
    (client) =>
      client.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact_person?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading && clients.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {view === "list" && (
        <div className="space-y-6">
          <ClientsHeader onAddClient={() => setView("add")} />
          <ClientsSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ClientsTable
            clients={filteredClients}
            onViewDetails={handleViewDetails}
          />
        </div>
      )}

      {view === "add" && (
        <AddClientForm
          onBack={() => setView("list")}
          onSubmit={handleAddClient}
        />
      )}

      {view === "details" && selectedClient && (
        <ClientDetails
          client={{
            ...selectedClient,
            companyName: selectedClient.company_name,
            contactPerson: selectedClient.contact_person,
            phone: selectedClient.phone_number,
            location: selectedClient.address,
            dateAdded: selectedClient.created_at,
            notes: selectedClient.notes || "",
            upcomingMeetings: [],
            pastMeetings: []
          }}
          onBack={() => setView("list")}
          onScheduleMeeting={handleScheduleMeeting}
        />
      )}
    </div>
  );
}