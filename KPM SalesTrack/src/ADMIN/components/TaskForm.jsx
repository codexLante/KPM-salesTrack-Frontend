import { FaArrowLeft } from 'react-icons/fa';
import Input from './Input';
import Select from './Select';

const AddTaskForm = ({ formData, setFormData, onAdd, onCancel, employees }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onCancel}
          className="w-12 h-12 border-2 border-cyan-500 rounded-lg flex items-center justify-center hover:bg-cyan-50 transition-colors"
        >
          <FaArrowLeft className="w-5 h-5 text-cyan-500" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Assign New Tasks</h2>
          <p className="text-gray-600">Create and assign a task to a team member</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-1">Task Details</h3>
          <p className="text-sm text-gray-600">Fill in the information below to create a new task</p>
        </div>

        <div className="space-y-6">
          {/* Task Title */}
          <Input
            label="Task Title :"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter task title"
          />

          {/* Assign To */}
          <Select
            label="Assign To:"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleInputChange}
            options={[
              { value: '', label: 'Select Employee' },
              ...employees.map(emp => ({
                value: emp.id.toString(),
                label: `${emp.name} - ${emp.role}`
              }))
            ]}
          />

          {/* Due Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Due date:
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Client (Optional) */}
          <Input
            label="Client(optional)"
            name="client"
            value={formData.client}
            onChange={handleInputChange}
            placeholder="Enter client name if the task is related to a client"
          />

          {/* Task Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Task Description :
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe task details, objectives, and any important information"
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-10 pt-6 border-t border-gray-200">
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
            Assign Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;