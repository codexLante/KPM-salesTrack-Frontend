import React from 'react';
import { ArrowLeft, Building2, User, Mail, Phone, MapPin, Calendar, FileText } from 'lucide-react';

const ClientDetails = ({ client, onBack, employees }) => {
  const assignedEmployee = employees.find(emp => emp.id === client.assignedTo);

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
          <h2 className="text-3xl font-bold mb-2">Client Details</h2>
          <p className="text-gray-600">Complete information about this client</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Client Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-8 border-l-4 border-cyan-400 mb-6">
            {/* Company Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center text-white">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{client.companyName}</h3>
                <div className="flex items-center gap-2 text-cyan-600">
                  <User className="w-4 h-4" />
                  <span className="font-medium">Industry</span>
                </div>
                <div className="font-semibold">{client.industry}</div>
              </div>
            </div>

            {/* Date Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Last contact</div>
                <div className="font-semibold">{client.lastContact || 'Oct 16'}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Upcoming Meeting</div>
                <div className="font-semibold">{client.upcomingMeeting || 'Nov 20'}</div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5" />
              <h3 className="text-xl font-bold">Contact Information</h3>
            </div>

            <div className="space-y-4">
              {/* Contact Person */}
              <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Contact Person</div>
                  <div className="font-semibold">{client.contactPerson}</div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-teal-50 rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-semibold">{client.email}</div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-teal-50 rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="font-semibold">{client.phone}</div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-orange-50 rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-300 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Location</div>
                  <div className="font-semibold">{client.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Notes & Assigned Employee */}
        <div>
          {/* Assigned Employee */}
          {assignedEmployee && (
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Assigned Employee</h3>
              <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-lg">
                <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  {assignedEmployee.initials}
                </div>
                <div>
                  <div className="font-semibold">{assignedEmployee.name}</div>
                  <div className="text-sm text-gray-600">{assignedEmployee.role}</div>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="bg-cyan-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5" />
              <h3 className="text-lg font-bold">Notes</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 mt-1">•</span>
                <span className="text-gray-700">Key account, quarterly reviews scheduled</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 mt-1">•</span>
                <span className="text-gray-700">High priority client</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-600 mt-1">•</span>
                <span className="text-gray-700">Regular follow-ups required</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;