import { ArrowLeft, Calendar } from "lucide-react";

export default function MeetingsScheduleForm({
  onBackToList,
  meetingForm,
  onFormChange,
  onSubmit
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBackToList}
        className="mb-6 p-3 border-2 border-teal-400 rounded-lg hover:bg-teal-50 transition-colors"
      >
        <ArrowLeft className="text-teal-400" size={24} />
      </button>

      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Schedule Meeting</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-3">
          <Calendar className="text-blue-500 mt-1" size={24} />
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">New meeting</h2>
            <p className="text-gray-600">Fill in the information below to schedule a meeting</p>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-900 font-semibold mb-2">Company Name:</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            value={meetingForm.companyName}
            onChange={(e) => onFormChange({ ...meetingForm, companyName: e.target.value })}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-900 font-semibold mb-2">Contact person:</label>
          <input
            type="text"
            placeholder="Enter Contact Persons name"
            value={meetingForm.contactPerson}
            onChange={(e) => onFormChange({ ...meetingForm, contactPerson: e.target.value })}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-900 font-semibold mb-2">Meeting Type:</label>
          <select
            value={meetingForm.meetingType}
            onChange={(e) => onFormChange({ ...meetingForm, meetingType: e.target.value })}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a meeting type</option>
            <option value="In-Office">In-Office</option>
            <option value="Virtual">Virtual</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-900 font-semibold mb-2">Date:</label>
            <input
              type="date"
              placeholder="mm/dd/yy"
              value={meetingForm.date}
              onChange={(e) => onFormChange({ ...meetingForm, date: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-900 font-semibold mb-2">Time:</label>
            <input
              type="time"
              value={meetingForm.time}
              onChange={(e) => onFormChange({ ...meetingForm, time: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-900 font-semibold mb-2">Location:</label>
          <input
            type="text"
            placeholder="Enter clients location"
            value={meetingForm.location}
            onChange={(e) => onFormChange({ ...meetingForm, location: e.target.value })}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-900 font-semibold mb-2">Notes:</label>
          <textarea
            placeholder="Add notes for what to archive in your meeting"
            value={meetingForm.notes}
            onChange={(e) => onFormChange({ ...meetingForm, notes: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBackToList}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Schedule Meeting
          </button>
        </div>
      </form>
    </div>
  );
}
