import { useState } from "react";
import { ArrowLeft, Briefcase, Calendar, User, MapPin, Clock } from "lucide-react";

export default function ClientDetails({ client, onBack, onScheduleMeeting }) {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [notes, setNotes] = useState(client.notes || "");

  const handleSaveNotes = () => {
    alert("Notes saved successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-3 border-2 border-teal-400 rounded-lg hover:bg-teal-50 transition-colors"
          >
            <ArrowLeft className="text-teal-400" size={24} />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{client.companyName}</h1>
            <p className="text-gray-600 mt-1">Client Details and History</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab("past")}
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Past Meetings
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Notes
          </button>
        </div>
      </div>

      {/* Client Information Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Briefcase className="text-gray-600" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Client information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center space-x-3">
            <User className="text-gray-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Client</p>
              <p className="font-semibold text-gray-900">{client.companyName}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center space-x-3">
            <Calendar className="text-gray-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold text-gray-900">
                {new Date(client.dateAdded).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center space-x-3">
            <User className="text-teal-400" size={24} />
            <div>
              <p className="text-sm text-gray-600">Contact Person</p>
              <p className="font-semibold text-gray-900">{client.contactPerson}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex items-center space-x-3">
            <MapPin className="text-gray-600" size={24} />
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-semibold text-gray-900">{client.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-8 py-3 rounded-full font-semibold transition-colors ${
            activeTab === "upcoming"
              ? "bg-white text-gray-900 shadow-md"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          Upcoming Meetings
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-8 py-3 rounded-full font-semibold transition-colors ${
            activeTab === "past"
              ? "bg-white text-gray-900 shadow-md"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          Past Meetings
        </button>
        <button
          onClick={() => setActiveTab("notes")}
          className={`px-8 py-3 rounded-full font-semibold transition-colors ${
            activeTab === "notes"
              ? "bg-white text-gray-900 shadow-md"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          Notes
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "upcoming" && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          {client.upcomingMeetings && client.upcomingMeetings.length > 0 ? (
            <div className="space-y-4">
              {client.upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{meeting.type}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(meeting.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })} at {meeting.time}
                      </p>
                      <p className="text-sm text-gray-500">Duration: {meeting.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="mx-auto mb-4 text-gray-400" size={64} />
              <p className="text-gray-900 font-semibold mb-6">No scheduled Meeting</p>
              <button
                onClick={onScheduleMeeting}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
              >
                <span>+</span>
                <span>Schedule Meeting</span>
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "past" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Previous Meetings History</h3>
          {client.pastMeetings && client.pastMeetings.length > 0 ? (
            <div className="space-y-4">
              {client.pastMeetings.map((meeting) => (
                <div key={meeting.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {new Date(meeting.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center space-x-4 mt-1">
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {meeting.time}
                          </span>
                          <span>Duration: {meeting.duration}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {meeting.notes && (
                    <p className="text-gray-700 mt-2">{meeting.notes}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No past meetings with this client</p>
          )}
        </div>
      )}

      {activeTab === "notes" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Client Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this client..."
            rows={10}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            onClick={handleSaveNotes}
            className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Save Notes
          </button>
        </div>
      )}
    </div>
  );
}