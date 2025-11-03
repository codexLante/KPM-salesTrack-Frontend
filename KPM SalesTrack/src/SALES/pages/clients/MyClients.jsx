import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ClientsHeader from "./ClientsHeader";
import ClientsSearchBar from "./ClientsSearchBar";
import ClientsTable from "./ClientsTable";
import AddClientForm from "./AddClientForm";
import ClientDetails from "./ClientDetails";
import { Modal } from "../../components/modal";

export default function ClientManagement() {
  const navigate = useNavigate();
  const [view, setView] = useState("list");
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null); 

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const showModal = (title, message, type = 'success', actions = []) => {
    setModal({ title, message, type, actions });
  };
  const closeModal = () => setModal(null);

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
        const clientsData = res?.data?.clients || res?.data || [];
        setClients(clientsData);
      })
      .catch((e) => {
        console.log(e);
        const errorMsg = e.response?.data?.error || "Failed to load clients";
        if (e.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          showModal("Session Expired", "Your session has expired. Please log in again.", "error", [
             { label: "Login", onClick: () => navigate("/"), primary: true }
          ]);
        } else {
             setError(errorMsg); 
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
        const successTitle = "Client Added Successfully!";
        const successMessage = `${formData.companyName} (${formData.contactPerson}) has been added to your clients.`;
        showModal(successTitle, successMessage, "success", [
          { label: "View Clients", onClick: () => { setView("list"); closeModal(); }, primary: true }
        ]);
        
        fetchClients();
        setView("list");
      })
      .catch((e) => {
        console.log(e);
        const errorMsg = e.response?.data?.error || "Failed to add client";
        showModal("Creation Failed", errorMsg, "error");
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
      const errorMsg = e.response?.data?.error || "Failed to load client details";
      showModal("Error", errorMsg, "error");
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
      {/* 4. RENDER MODAL */}
      {modal && <Modal {...modal} onClose={closeModal} />}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-red-600 h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
            <p className="text-red-800">{error}</p>
          </div>
          <button
            onClick={() => setError("")}
            className="text-red-600 hover:text-red-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
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
            upcomingMeetings: selectedClient.upcomingMeetings,
            pastMeetings: selectedClient.pastMeetings
          }}
          onBack={() => setView("list")}
          onScheduleMeeting={handleScheduleMeeting}
        />
      )}
    </div>
  );
}