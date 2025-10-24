import { Mail, Phone } from 'lucide-react';
import StatusBadge from './StatusBadge';

const EmployeeTable = ({ employees, onEmployeeClick }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Phone</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Role</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Clients</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr 
                key={employee.id} 
                className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onEmployeeClick(employee)}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                      {employee.initials}
                    </div>
                    <span className="font-medium text-sm">{employee.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600 text-sm truncate max-w-[180px]" title={employee.email}>
                      {employee.email}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-sm whitespace-nowrap">{employee.phone}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-medium">{employee.role}</span>
                </td>
                <td className="py-3 px-4">
                  <StatusBadge status={employee.status} />
                </td>
                <td className="py-3 px-4">
                  <span className="text-lg font-medium text-cyan-500">{employee.clients}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;