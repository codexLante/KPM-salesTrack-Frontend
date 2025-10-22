import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Input from './Input';
import Select from './Select';
import Button from './Button';

const AddClientForm = ({ formData, setFormData, onAdd, onCancel, employees }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const employeeOptions = [
    { value: '', label: 'Select employee' },
    ...employees.map(emp => ({
      value: emp.id,
      label: emp.name
    }))
  ];

  const industryOptions = [
    { value: '', label: 'Select industry' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onCancel}
          className="w-12 h-12 border-2 border-cyan-500 rounded flex items-center justify-center hover:bg-cyan-50"
        >
          <ArrowLeft className="w-6 h-6 text-cyan-500" />
        </button>
        <div>
          <h2 className="text-3xl font-bold mb-2">Add New Client</h2>
          <p className="text-gray-600">Fill in the details to add a new client</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-8">
        <h3 className="text-xl font-bold mb-2">Client Information</h3>
        <p className="text-gray-600 mb-8">Enter the details of the new client below</p>

        <div className="space-y-6">
          <Input
            label="Company Name:"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
          />

          <Input
            label="Contact Person:"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
          />

          <Input
            label="Email Address:"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <Input
            label="Phone Number:"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
          />

          <Input
            label="Location:"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g. Nairobi, Kilimani"
          />

          <Select
            label="Industry:"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            options={industryOptions}
          />

          <Select
            label="Assign to Employee:"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleInputChange}
            options={employeeOptions}
          />
        </div>

        <div className="flex gap-4 mt-8">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={onAdd} className="flex-1">
            Add Client
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddClientForm;