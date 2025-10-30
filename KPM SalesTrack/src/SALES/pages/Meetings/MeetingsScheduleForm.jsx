import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import LocationSearch from "../../../contexts/locationsearch";

export default function MeetingsScheduleForm({ 
  clients, 
  selectedClient, 
  setSelectedClient,
  onBackToList, 
  onSubmit, 
  isLoading 
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
        companyName: selectedClient.company_name,
        contactPerson: selectedClient.contact_person,
        location: selectedClient.address
      }));
    }
  }, [selectedClient]);

  const handleClientSelect = (e) => {
    const clientId = parseInt(e.target.value);
    console.log('Selected client ID:', clientId);
    console.log('Available clients:', clients);
    const client = clients.find(c => c.id === clientId);
    console.log('Found client:', client);
    setSelectedClient(client || null);
  };

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

  const handleLocationSelect = (location) => {
    setFormData(prev => ({
      ...prev,
      location: location.properties.label,
      coordinates: location.geometry.coordinates
    }));
    if (errors.location) {
      setErrors(prev => ({
        ...prev,
        location: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedClient) newErrors.companyName = "Please select a company";
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
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBackToList}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Schedule Meeting</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        
        {/* Company Name Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Company *
          </label>
          <select
            value={selectedClient?.id || ""}
            onChange={handleClientSelect}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">
              {clients.length === 0 ? 'No clients available' : 'Select a company'}
            </option>
            {clients.map(client => {
              console.log('Client option:', client);
              return (
                <option key={client.id} value={client.id}>
                  {client.company_name || 'N/A'}
                </option>
              );
            })}
          </select>
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
          )}
        </div>

        {/* Contact Person - Auto-filled */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Person *
          </label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
            placeholder="Auto-filled from selected company"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            disabled={!selectedClient}
          />
          {errors.contactPerson && (
            <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>
          )}
        </div>

        {/* Meeting Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meeting Type *
          </label>
          <select
            name="meetingType"
            value={formData.meetingType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">Select meeting type</option>
            <option value="in-person">In-Person</option>
            <option value="video-call">Video Call</option>
            <option value="phone-call">Phone Call</option>
            <option value="follow-up">Follow-up</option>
          </select>
          {errors.meetingType && (
            <p className="text-red-500 text-sm mt-1">{errors.meetingType}</p>
          )}
        </div>

        {/* Date and Time Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time *
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">{errors.time}</p>
            )}
          </div>
        </div>

        {/* Location with Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <LocationSearch
            onSelect={handleLocationSelect}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
          {formData.location && (
            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <span className="font-medium">Selected:</span> {formData.location}
              </p>
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Add any additional notes about this meeting"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onBackToList}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Scheduling..." : "Schedule Meeting"}
          </button>
        </div>
      </form>
    </div>
  );
}