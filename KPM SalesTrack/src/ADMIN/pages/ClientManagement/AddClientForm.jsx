import { ArrowLeft } from 'lucide-react';
import Input from '../../components/Input';
import Select from '../../components/Select';
import LocationSearch from '../../../contexts/locationsearch';

const AddClientForm = ({ formData, setFormData, onAdd, onCancel, employees }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const employeeOptions = Array.isArray(employees)
    ? employees.map(emp => ({
        value: emp.id.toString(),
        label: `${emp.name} - ${emp.role}`
      }))
    : [];

  return (
    <div className="max-w-4xl mx-auto font-sans">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onCancel}
          className="w-12 h-12 border-2 border-cyan-500 rounded-lg flex items-center justify-center hover:bg-cyan-50 transition duration-200"
        >
          <ArrowLeft className="w-6 h-6 text-cyan-500" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Add New Client</h2>
          <p className="text-gray-600">Fill in the details to add a new client</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
        <h3 className="text-xl font-semibold text-cyan-600 mb-2">Client Information</h3>
        <p className="text-gray-600 mb-6">Enter the details of the new client below</p>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="e.g. Tech Solutions Ltd"
          />
          <Input
            label="Contact Person"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
            placeholder="e.g. John Doe"
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="e.g. john@techsolutions.com"
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="e.g. +254712345678"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <LocationSearch
              onSelect={(location) => {
                setFormData(prev => ({
                  ...prev,
                  location: location.properties.label,
                  coordinates: location.geometry.coordinates
                }));
              }}
            />
            {formData.location && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: <span className="font-medium">{formData.location}</span>
              </p>
            )}
          </div>
          <Input
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            placeholder="e.g. Technology"
          />
        </div>

        {/* Full-width Select */}
        <div className="mt-6">
          <Select
            label="Assign To"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleInputChange}
            options={[
              { value: '', label: 'Select employee' },
              ...employeeOptions
            ]}
            placeholder="Choose employee"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-10 pt-6 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onAdd}
            className="flex-1 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-200 transform hover:scale-[1.02]"
          >
            Add Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClientForm;
