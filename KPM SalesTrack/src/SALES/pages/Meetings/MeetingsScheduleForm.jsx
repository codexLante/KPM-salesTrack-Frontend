import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import LocationSearch from "../../../contexts/locationsearch";

export default function MeetingsScheduleForm({
  onBackToList,
  onSubmit,
  isLoading,
  clients,
  selectedClient,
  setSelectedClient
}) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    meetingType: "",
    date: "",
    time: "",
    location: "",
    coordinates: null,
    notes: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedClient) {
      setFormData(prev => ({
        ...prev,
        companyName: selectedClient.companyName,
        contactPerson: selectedClient.contactPerson
      }));
    }
  }, [selectedClient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required";
    if (!formData.meetingType) newErrors.meetingType = "Meeting type is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        companyName: "",
        contactPerson: "",
        meetingType: "",
        date: "",
        time: "",
        location: "",
        coordinates: null,
        notes: ""
      });
      setSelectedClient(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBackToList} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Schedule Meeting</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        
        {/* Company Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
          <select
            value={selectedClient?.id || ""}
            onChange={(e) => {
              const client = clients.find(c => c.id === parseInt(e.target.value));
              setSelectedClient(client);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a company</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.companyName}
              </option>
            ))}
          </select>
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
        </div>

        {/* Contact Person (auto-filled) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
          />
          {errors.contactPerson && <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>}
        </div>

        {/* Meeting Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type *</label>
          <select
            name="meetingType"
            value={formData.meetingType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select meeting type</option>
            <option value="in-person">In-Person</option>
            <option value="video-call">Video Call</option>
            <option value="phone-call">Phone Call</option>
            <option value="follow-up">Follow-up</option>
          </select>
          {errors.meetingType && <p className="text-red-500 text-sm mt-1">{errors.meetingType}</p>}
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
          </div>
        </div>

        {/* Location with LocationSearch */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
          <LocationSearch
            onSelect={(location) => {
              setFormData(prev => ({
                ...prev,
                location: location.properties.label,
                coordinates: location.geometry.coordinates
              }));
              if (errors.location) {
                setErrors(prev => ({ ...prev, location: "" }));
              }
            }}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          {formData.location && (
            <p className="text-gray-600 text-sm mt-2">Selected: {formData.location}</p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows="4"
            placeholder="Add any additional notes"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onBackToList}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Scheduling..." : "Schedule Meeting"}
          </button>
        </div>
      </form>
    </div>
  );
}
