import { ArrowLeft, Mail, Phone, Briefcase, Building2 } from 'lucide-react';

const EmployeeDetails = ({ employee, onBack }) => {
  // Dummy client data for the selected employee
  const assignedClients = [
    { id: 1, name: 'ABC Corporation', status: 'Active Client' },
    { id: 2, name: 'Tech Innovation', status: 'Active Client' },
    { id: 3, name: 'Global Systems', status: 'Active Client' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Employee Details</h2>
            <p className="text-sm text-gray-600">View employee information and assigned clients</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Employee Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center mb-6">
                {/* Avatar */}
                <div className="w-24 h-24 bg-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-semibold mb-4">
                  {employee.initials}
                </div>
                
                {/* Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{employee.name}</h3>
                
                {/* Status Badge */}
                <span
                  className={`px-4 py-1 rounded-full text-xs font-medium ${
                    employee.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {employee.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 pt-6 border-t border-gray-100">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 mb-1">Email</div>
                    <div className="text-sm font-medium text-gray-800 truncate">{employee.email}</div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 mb-1">Phone</div>
                    <div className="text-sm font-medium text-gray-800">{employee.phone}</div>
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 mb-1">Role</div>
                    <div className="text-sm font-medium text-gray-800">{employee.role}</div>
                  </div>
                </div>

                {/* Clients Count */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 mb-1">Total Clients</div>
                    <div className="text-sm font-medium text-gray-800">{assignedClients.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Assigned Clients */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">
                  Assigned Clients ({assignedClients.length})
                </h3>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assignedClients.map((client) => (
                    <div
                      key={client.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-cyan-500 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-800 mb-1 truncate">{client.name}</h4>
                          <p className="text-xs text-gray-500">{client.status}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {assignedClients.length === 0 && (
                  <div className="text-center py-12">
                    <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No clients assigned yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;