import { ArrowLeft, Building2, User, Mail, Phone, MapPin, Calendar, FileText } from 'lucide-react';

const ClientDetails = ({ client, onBack, employees }) => {

  const assignedEmployee = (employees || []).find(emp => emp.id === client.assignedTo); 

  return (
    <div className="animate-in fade-in slide-in-from-left-2 duration-300">
      
      {/* Header with Back Button */}
      <div className="flex items-center gap-5 pb-8 border-b border-gray-100 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 border-2 border-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-50 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-cyan-500" />
        </button>
        <div>
          {/* Main Page Title - Use bold font for clear hierarchy */}
          <h2 className="text-3xl font-bold text-gray-800">Client Details</h2>
          <p className="text-sm text-gray-500">Complete information for {client.companyName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Client Info & Contacts */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Company Header Card */}
          <div className="bg-white rounded-xl shadow-sm p-8 border-l-4 border-cyan-500">
            
            {/* Company Info */}
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{client.companyName}</h3>
                <div className="flex items-center gap-2 text-gray-500">
                  <User className="w-4 h-4" />
                
                  <span className="text-sm">Industry:</span>
                  <span className="font-medium text-gray-700">{client.industry}</span>
                </div>
              </div>
            </div>

            {/* Date Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 mx-auto mb-2 text-cyan-600" />
                <div className="text-xs text-gray-500">Last Contact</div>
                {/* Value font is slightly lighter */}
                <div className="font-medium text-gray-700">{client.lastContact || 'Oct 16'}</div> 
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 mx-auto mb-2 text-cyan-600" />
                <div className="text-xs text-gray-500">Upcoming Meeting</div>
                {/* Value font is slightly lighter */}
                <div className="font-medium text-gray-700">{client.upcomingMeeting || 'Nov 20'}</div> 
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center gap-2 mb-6 border-b pb-4">
              <User className="w-5 h-5 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-800">Contact & Location</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Contact Person Card */}
              <div className="p-4 rounded-lg border border-blue-100 bg-blue-50 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Contact Person</div>
                  <div className="font-medium text-gray-700">{client.contactPerson}</div>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-4 rounded-lg border border-cyan-100 bg-cyan-50 flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-200 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium text-gray-700">{client.email}</div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded-lg border border-cyan-100 bg-cyan-50 flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-200 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium text-gray-700">{client.phone}</div>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-lg border border-orange-100 bg-orange-50 flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Location</div>
                  <div className="font-medium text-gray-700">{client.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Employee & Notes */}
        <div className="space-y-8">
          
          {/* Assigned Employee Card */}
          {assignedEmployee && (
            <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-emerald-400">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Assigned Employee</h3>
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-medium text-lg">
                  {assignedEmployee.initials}
                </div>
                <div>
                  <div className="font-medium text-gray-700">{assignedEmployee.name}</div>
                  <div className="text-sm text-gray-500">{assignedEmployee.role}</div>
                </div>
              </div>
            </div>
          )}

          {/* Notes Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4 border-b pb-4">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-bold text-gray-800">Key Notes</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-cyan-500 rounded-full flex-shrink-0"></span>
                <span className="text-sm text-gray-700">Key account, quarterly reviews scheduled</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-cyan-500 rounded-full flex-shrink-0"></span>
                <span className="text-sm text-gray-700">High priority client requiring regular check-ins.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 mt-1 bg-cyan-500 rounded-full flex-shrink-0"></span>
                <span className="text-sm text-gray-700">Looking to expand service package next quarter.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;