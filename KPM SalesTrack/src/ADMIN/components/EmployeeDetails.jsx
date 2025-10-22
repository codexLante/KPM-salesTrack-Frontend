import React from 'react';
import { ArrowLeft, Mail, Phone, Briefcase } from 'lucide-react';

const EmployeeDetails = ({ employee, onBack }) => {
  // Dummy client data for the selected employee
  const assignedClients = [
    { id: 1, name: 'ABC Corporation', status: 'Active Client' },
    { id: 2, name: 'Tech Innovation', status: 'Active Client' },
    { id: 3, name: 'Global Systems', status: 'Active Client' }
  ];

  return (
    <div>
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-12 h-12 border-2 border-cyan-500 rounded flex items-center justify-center hover:bg-cyan-50"
        >
          <ArrowLeft className="w-6 h-6 text-cyan-500" />
        </button>
        <div>
          <h2 className="text-3xl font-bold mb-2">Employee Details</h2>
          <p className="text-gray-600">View employee information and assigned clients</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Employee Info */}
        <div className="bg-white rounded-lg p-8 border-l-4 border-cyan-400">
          <div className="flex flex-col items-center mb-8">
            {/* Avatar */}
            <div className="w-32 h-32 bg-cyan-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
              {employee.initials}
            </div>
            
            {/* Name */}
            <h3 className="text-2xl font-bold mb-3">{employee.name}</h3>
            
            {/* Status Badge */}
            <span
              className={`px-8 py-2 rounded-full text-white text-sm font-medium ${
                employee.status === 'active' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {employee.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-4">
            {/* Email Card */}
            <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Email</div>
                <div className="font-semibold">{employee.email}</div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-teal-50 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Phone</div>
                <div className="font-semibold">{employee.phone}</div>
              </div>
            </div>

            {/* Role Card */}
            <div className="bg-teal-50 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Role</div>
                <div className="font-semibold">{employee.role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Assigned Clients */}
        <div>
          <div className="bg-cyan-50 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-bold">Assigned Clients({assignedClients.length})</h3>
          </div>

          <div className="space-y-4">
            {assignedClients.map((client) => (
              <div
                key={client.id}
                className="bg-blue-50 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h4 className="text-lg font-bold mb-2">{client.name}</h4>
                <p className="text-gray-600">{client.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;