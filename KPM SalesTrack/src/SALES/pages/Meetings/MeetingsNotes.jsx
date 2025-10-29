import { Save } from "lucide-react";

export default function MeetingsNotes({ selectedMeeting, onNotesChange, onSave }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Meeting Discussion & Notes:</h3>
      <textarea
        placeholder="Write main points during the discussion you had"
        value={selectedMeeting.notes}
        onChange={(e) => onNotesChange(e.target.value)}
        rows={8}
        className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-6"
      />
      <button
        onClick={onSave}
        className="w-full bg-blue-500 text-white py-4 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center space-x-2"
      >
        <Save size={20} />
        <span>Save Meeting</span>
      </button>
    </div>
  );
}
