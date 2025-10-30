import { useState } from "react";
import { ArrowLeft, Briefcase } from "lucide-react";
import LocationSearch from "../../../contexts/locationsearch";

export default function AddClientForm({ onBack, onSubmit }) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    location: "",
    coordinates: null,
    notes: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
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
        email: "",
        phone: "",
        location: "",
        coordinates: null,
        notes: ""
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 p-3 border-2 border-teal-400 rounded-lg hover:bg-teal-50 transition-colors"
      >
        <ArrowLeft className="text-teal-400" size={24} />
      </button>

      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Add a client</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-3">
          <Briefcase className="text-blue-500 mt-1" size={24} />
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Client Information</h2>
            <p className="text-gray-600">Fill in the information below to add a client</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: "Company Name", name: "companyName", type: "text", placeholder: "Enter Company Name" },
          { label: "Contact Person", name: "contactPerson", type: "text", placeholder: "Enter Contact Person's Name" },
          { label: "Email Address", name: "email", type: "email", placeholder: "Enter Email Address" },
          { label: "Phone Number", name: "phone", type: "tel", placeholder: "e.g. +254 712654537" }
        ].map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block text-gray-900 font-semibold mb-2">{label}:</label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        {/* Location with LocationSearch */}
        <div>
          <label className="block text-gray-900 font-semibold mb-2">Location:</label>
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
          <label className="block text-gray-900 font-semibold mb-2">Notes:</label>
          <textarea
            name="notes"
            placeholder="Add notes"
            value={formData.notes}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Add Client
          </button>
        </div>
      </form>
    </div>
  );
}
