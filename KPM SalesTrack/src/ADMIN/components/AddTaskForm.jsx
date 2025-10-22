import { ArrowLeft } from 'lucide-react';
import Input from './Input';
import Select from './Select';
import Button from './Button';

const AddTaskForm = ({ formData, setFormData, onAdd, onCancel, employees }) => {
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
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Assign New Task</h2>
          <p className="text-gray-600">Create and assign a task to a team member</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h3 className="text-xl font-semibold text-cyan-600 mb-2">Task Information</h3>
        <p className="text-gray-600 mb-6">Enter the details of the new task below</p>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g. Product Demo Screening"
          />
          <Select
            label="Assign To"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleInputChange}
            options={[
              { value: '', label: 'Select employee' },
              ...employees.map(emp => ({
                value: emp.id.toString(),
                label: `${emp.name} - ${emp.role}`
              }))
            ]}
            placeholder="Choose employee"
          />
          <Input
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleInputChange}
          />
          <Input
            label="Client (optional)"
            name="client"
            value={formData.client}
            onChange={handleInputChange}
            placeholder="e.g. Redbox Groupa"
          />
        </div>

        {/* Full-width Description */}
        <div className="mt-6">
          <Input
            label="Task Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe task details, objectives, and any important information"
            multiline
            rows={5}
          />
        </div>

        {/* Full-width Status */}
        <div className="mt-6">
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            options={[
              { value: '', label: 'Select status' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Completed', label: 'Completed' }
            ]}
            placeholder="Choose status"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-10 pt-6 border-t border-gray-200">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={onAdd} className="flex-1">
            Assign Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
