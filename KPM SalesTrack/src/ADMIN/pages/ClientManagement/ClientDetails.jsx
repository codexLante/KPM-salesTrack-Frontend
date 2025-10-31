import { ArrowLeft, Building2, User, Mail, Phone, MapPin, Calendar, FileText } from 'lucide-react';

const ClientDetails = ({ client, onBack, employees }) => {
  const assignedEmployee = (employees || []).find(emp => emp.id === client.assignedTo); 

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
            <h2 className="text-2xl font-bold text-gray-800">Client Details</h2>
            <p className="text-sm text-gray-600">{client.companyName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left & Center */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Company Overview Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{client.companyName}</h3>
                  <p className="text-sm text-gray-600">{client.industry}</p>
                </div>
              </div>

              {/* Date Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Last Contact</div>
                    <div className="text-sm font-medium text-gray-800">{client.lastContact || 'Oct 16, 2024'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Upcoming Meeting</div>
                    <div className="text-sm font-medium text-gray-800">{client.upcomingMeeting || 'Nov 20, 2024'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Contact Person */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 mb-1">Contact Person</div>
                      <div className="text-sm font-medium text-gray-800">{client.contactPerson}</div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 mb-1">Email</div>
                      <div className="text-sm font-medium text-gray-800 truncate" title={client.email}>{client.email}</div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 mb-1">Phone</div>
                      <div className="text-sm font-medium text-gray-800">{client.phone}</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-500 mb-1">Location</div>
                      <div className="text-sm font-medium text-gray-800">{client.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right */}
          <div className="space-y-6">
            
            {/* Assigned Employee Card */}
            {assignedEmployee && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800">Assigned Employee</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {assignedEmployee.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800">{assignedEmployee.name}</div>
                      <div className="text-xs text-gray-500">{assignedEmployee.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes Card */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Notes</h3>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 bg-cyan-500 rounded-full flex-shrink-0"></span>
                    <span className="text-sm text-gray-700">Key account, quarterly reviews scheduled</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 bg-cyan-500 rounded-full flex-shrink-0"></span>
                    <span className="text-sm text-gray-700">High priority client requiring regular check-ins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 mt-2 bg-cyan-500 rounded-full flex-shrink-0"></span>
                    <span className="text-sm text-gray-700">Looking to expand service package next quarter</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;