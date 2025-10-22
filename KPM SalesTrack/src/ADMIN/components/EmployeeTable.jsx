import { Mail, Phone } from 'lucide-react';
import StatusBadge from './StatusBadge';

const EmployeeTable = ({ employees }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-4 px-6 font-semibold">Name</th>
            <th className="text-left py-4 px-6 font-semibold">Email</th>
            <th className="text-left py-4 px-6 font-semibold">Phone number</th>
            <th className="text-left py-4 px-6 font-semibold">Role</th>
            <th className="text-left py-4 px-6 font-semibold">Status</th>
            <th className="text-left py-4 px-6 font-semibold">clients</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {employee.initials}
                  </div>
                  <span className="font-medium">{employee.name}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{employee.email}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{employee.phone}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="font-medium">{employee.role}</span>
              </td>
              <td className="py-4 px-6">
                <StatusBadge status={employee.status} />
              </td>
              <td className="py-4 px-6">
                <span className="text-2xl font-light text-cyan-500">{employee.clients}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;