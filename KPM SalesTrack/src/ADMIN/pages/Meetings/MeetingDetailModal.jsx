import { X, MapPin, Clock, User, Calendar } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function MeetingDetailModal({ meeting, onClose }) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const modalContent = (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Meeting Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* View Mode */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{meeting.company}</h3>
                <p className="text-sm text-gray-600">{meeting.salesPerson}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Calendar size={20} className="text-gray-600" />
                <div>
                  <p className="text-xs text-gray-600">Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(meeting.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Clock size={20} className="text-gray-600" />
                <div>
                  <p className="text-xs text-gray-600">Time</p>
                  <p className="font-semibold text-gray-900">{meeting.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg md:col-span-2">
                <MapPin size={20} className="text-gray-600" />
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="font-semibold text-gray-900">{meeting.location}</p>
                </div>
              </div>
            </div>

            {meeting.notes && (
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Notes</p>
                <p className="text-gray-600">{meeting.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
