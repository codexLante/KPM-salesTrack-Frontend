import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import ClientsHeader from "./ClientsHeader";
import ClientsSearchBar from "./ClientsSearchBar";
import ClientsTable from "./ClientsTable";
import AddClientForm from "./AddClientForm";
import ClientDetails from "./ClientDetails";

export default function ClientManagement() {
  const navigate = useNavigate();
  const [view, setView] = useState("list");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [successClient, setSuccessClient] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setSuccessClient(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

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
        
        setSuccessClient({
          name: formData.companyName,
          contact: formData.contactPerson
        });
        setSuccessMessage("Client added successfully!");
      
        fetchClients();
        setTimeout(() => {
          setView("list");
        }, 2000);
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
      {/* Success Alert Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between animate-in fade-in slide-in-from-top">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <p className="text-green-800 font-semibold">{successMessage}</p>
              {successClient && (
                <p className="text-green-700 text-sm">
                  {successClient.name} ({successClient.contact}) has been added to your clients
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              setSuccessMessage("");
              setSuccessClient(null);
            }}
            className="text-green-600 hover:text-green-800"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Error Alert Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-600" size={24} />
            <p className="text-red-800">{error}</p>
          </div>
          <button
            onClick={() => setError("")}
            className="text-red-600 hover:text-red-800"
          >
            <X size={20} />
          </button>
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
          isLoading={isLoading}
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