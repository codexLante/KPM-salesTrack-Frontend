import { ArrowLeft } from 'lucide-react';
import Input from './Input';
import Select from './Select';
import Button from './Button';

const AddEmployeeForm = ({ formData, setFormData, onAdd, onCancel }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
          <h2 className="text-3xl font-bold mb-2">Add New Employee</h2>
          <p className="text-gray-600">Fill in the details to add a new team member</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-8">
        <h3 className="text-xl font-bold mb-2">Employee information</h3>
        <p className="text-gray-600 mb-8">Enter the details of the new employee below</p>

        <div className="space-y-6">
          <Input
            label="Full Name :"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />

          <Input
            label="Email address:"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <Input
            label="Phone number :"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
          />

          <Select
            label="Role :"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            options={[
              { value: '', label: 'Select role' },
              { value: 'Sales rep', label: 'Sales rep' },
              { value: 'Sales Manager', label: 'Sales Manager' }
            ]}
          />

          <Select
            label="Status:"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            options={[
              { value: '', label: 'Select status' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]}
          />
        </div>

        <div className="flex gap-4 mt-8">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={onAdd} className="flex-1">
            Add Employee
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;