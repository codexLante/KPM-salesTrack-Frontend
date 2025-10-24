import { ArrowLeft, Calendar, User, Clock, MapPin } from "lucide-react";

export default function MeetingsDetails({ selectedMeeting, onBackToList }) {
  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={onBackToList}
        className="mb-6 p-3 border-2 border-teal-400 rounded-lg hover:bg-teal-50 transition-colors"
      >
        <ArrowLeft className="text-teal-400" size={24} />
      </button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Meetings Details</h1>
        <p className="text-gray-600 text-lg mt-2">
          {selectedMeeting.client} - {selectedMeeting.meetingType}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="text-blue-500" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Meeting information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center space-x-3">
            <User className="text-gray-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Client</p>
              <p className="font-semibold text-gray-900">{selectedMeeting.client}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center space-x-3">
            <Calendar className="text-gray-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold text-gray-900">
                {new Date(selectedMeeting.date).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center space-x-3">
            <Calendar className="text-gray-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Meeting Type</p>
              <p className="font-semibold text-gray-900">{selectedMeeting.meetingType}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center space-x-3">
            <Clock className="text-gray-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="font-semibold text-gray-900">{selectedMeeting.time}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center space-x-3">
            <User className="text-teal-400" size={24} />
            <div>
              <p className="text-sm text-gray-600">Contact Person</p>
              <p className="font-semibold text-gray-900">{selectedMeeting.contactPerson}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center space-x-3">
            <MapPin className="text-gray-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-semibold text-gray-900">{selectedMeeting.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
