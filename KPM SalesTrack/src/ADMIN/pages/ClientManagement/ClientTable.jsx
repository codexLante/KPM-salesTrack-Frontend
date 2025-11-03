import { Building2, MapPin, Mail, Phone } from 'lucide-react';

const ClientTable = ({ clients, onClientClick, employees }) => {
  const getAssignedEmployee = (employeeId) => {
    if (!employees || !employeeId) {
      return null;
    }
    
    const numericId = Number(employeeId); 
    
    if (isNaN(numericId) || numericId <= 0) {
        return null; 
    }
    
    return employees.find(emp => emp.id === numericId);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left py-3 px-4 font-semibold text-sm">Client</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Contact Person</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Phone</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Location</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Assigned to</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => {
              const assignedEmployee = getAssignedEmployee(client.assignedTo);
              
              return (
                <tr key={client.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-sm">{client.companyName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-sm">{client.contactPerson}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-600 text-sm truncate max-w-[180px]" title={client.email}>
                        {client.email}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="font-medium text-sm whitespace-nowrap">{client.phone}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="text-sm">{client.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {assignedEmployee ? (
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {assignedEmployee.initials}
                        </div>
                        <span className="font-medium text-sm truncate max-w-[120px]" title={assignedEmployee.name}>
                          {assignedEmployee.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onClientClick(client)}
                      className="px-3 py-1.5 border-2 border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-50 transition-colors font-medium text-sm whitespace-nowrap"
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
    </div>
  );
};

export default ClientTable;