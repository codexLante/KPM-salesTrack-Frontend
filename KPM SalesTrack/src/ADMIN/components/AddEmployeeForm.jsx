import { ArrowLeft } from 'lucide-react';
import Input from './Input';
import Select from './Select';
import Button from './Button';

const AddEmployeeForm = ({ formData, setFormData, onAdd, onCancel, isLoading }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Add New Employee</h2>
          <p className="text-gray-600">Fill in the details to add a new team member</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-semibold text-cyan-600 mb-2">Employee Information</h3>
        <p className="text-gray-600 mb-6">Enter the details of the new employee below</p>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="e.g. Jane Doe"
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="e.g. jane.doe@example.com"
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="e.g. +254712345678"
          />
          <Select
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            options={[
              { value: '', label: 'Select role' },
              { value: 'Sales rep', label: 'Sales rep' },
              { value: 'Sales Manager', label: 'Sales Manager' }
            ]}
            placeholder="Choose a role"
          />
        </div>

        {/* Full-width Select */}
        <div className="mt-6">
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            options={[
              { value: '', label: 'Select status' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]}
            placeholder="Choose status"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-10 pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            variant={isLoading ? 'secondary' : 'primary'}
            onClick={onAdd}
            className="flex-1"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Employee'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
