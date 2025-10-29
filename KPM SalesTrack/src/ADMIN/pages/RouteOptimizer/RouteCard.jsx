import { FaClock, FaCheckCircle, FaTimes, FaRedo } from 'react-icons/fa';
import { RouteMeetingStop } from './RouteMeetingStop';

export const RouteCard = ({ 
  route, 
  onAccept, 
  onReject, 
  onReoptimize 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Route Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b border-blue-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-gray-800">
                Optimized Route - {new Date(route.date).toLocaleDateString()}
              </h2>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                route.status === 'suggested' ? 'bg-orange-100 text-orange-700' :
                route.status === 'accepted' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }`}>
                {route.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">Sales Person: {route.salesPerson}</p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
            <FaClock className="text-green-600" />
            <span className="text-green-700 font-semibold">{route.timeSaved} time saved</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-600">
          <span>{route.distance} • {route.duration}</span>
        </div>
      </div>

      {/* Meeting Stops */}
      <div className="p-6">
        <div className="space-y-4">
          {route.meetings.map((meeting, index) => (
            <RouteMeetingStop
              key={meeting.id}
              meeting={meeting}
              index={index}
              isLast={index === route.meetings.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      {route.status === 'suggested' && (
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <button
            onClick={() => onReoptimize(route.id)}
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <FaRedo />
            Re-optimize
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => onReject(route.id)}
              className="px-6 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
            >
              <FaTimes />
              Reject
            </button>
            <button
              onClick={() => onAccept(route.id)}
              className="px-6 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FaCheckCircle />
              Accept & Send to Salesperson
            </button>
          </div>
        </div>
      )}

      {route.status === 'accepted' && (
        <div className="bg-green-50 px-6 py-4 flex items-center justify-center border-t border-green-200">
          <div className="flex items-center gap-2 text-green-700">
            <FaCheckCircle />
            <span className="font-medium">Route accepted and sent to {route.salesPerson}</span>
          </div>
        </div>
      )}

      {route.status === 'rejected' && (
        <div className="bg-red-50 px-6 py-4 flex items-center justify-center border-t border-red-200">
          <div className="flex items-center gap-2 text-red-700">
            <FaTimes />
            <span className="font-medium">Route rejected</span>
          </div>
        </div>
      )}
    </div>
  );
};