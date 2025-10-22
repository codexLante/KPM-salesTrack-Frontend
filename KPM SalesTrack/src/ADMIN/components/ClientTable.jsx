import React from 'react';
import { Building2, MapPin } from 'lucide-react';

const ClientTable = ({ clients, onClientClick, employees }) => {
  const getAssignedEmployee = (employeeId) => {
    return employees.find(emp => emp.id === employeeId);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-4 px-6 font-semibold">Client</th>
            <th className="text-left py-4 px-6 font-semibold">Contact Person</th>
            <th className="text-left py-4 px-6 font-semibold">Email</th>
            <th className="text-left py-4 px-6 font-semibold">Phone</th>
            <th className="text-left py-4 px-6 font-semibold">Location</th>
            <th className="text-left py-4 px-6 font-semibold">Assigned to</th>
            <th className="text-left py-4 px-6 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            const assignedEmployee = getAssignedEmployee(client.assignedTo);
            return (
              <tr key={client.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-white">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{client.companyName}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm">
                    <div className="font-medium">{client.contactPerson}</div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-gray-600">{client.email}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="font-medium">{client.phone}</span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{client.location}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  {assignedEmployee && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {assignedEmployee.initials}
                      </div>
                      <span className="font-medium">{assignedEmployee.name}</span>
                    </div>
                  )}
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => onClientClick(client)}
                    className="px-4 py-2 border-2 border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-50 transition-colors"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;