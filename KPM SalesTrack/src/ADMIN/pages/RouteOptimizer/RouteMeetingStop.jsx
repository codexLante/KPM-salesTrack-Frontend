import { FaMapMarkerAlt } from 'react-icons/fa';

function RouteMeetingStop ({ meeting, index, isLast }){
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
          {index + 1}
        </div>
        {!isLast && (
          <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
        )}
      </div>

      <div className="flex-1 pt-2">
        <h3 className="font-semibold text-gray-800 mb-1">{meeting.company}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <FaMapMarkerAlt className="text-gray-400" />
          <span>{meeting.address}</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-blue-600 font-medium">{meeting.time}</span>
          <span className="text-gray-500">{meeting.duration}</span>
        </div>
      </div>
    </div>
  );
};

export {RouteMeetingStop}