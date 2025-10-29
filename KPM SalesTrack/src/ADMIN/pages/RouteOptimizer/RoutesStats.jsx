import { FaRoute, FaClock, FaCheckCircle } from 'react-icons/fa';

function RouteStats ({ totalRoutes, suggestedCount, acceptedCount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Routes</p>
            <p className="text-3xl font-bold text-gray-800">{totalRoutes}</p>
            <p className="text-xs text-gray-500 mt-1">Generated routes</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <FaRoute className="text-blue-600 text-xl" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Suggested</p>
            <p className="text-3xl font-bold text-orange-600">{suggestedCount}</p>
            <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <FaClock className="text-orange-600 text-xl" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Accepted</p>
            <p className="text-3xl font-bold text-green-600">{acceptedCount}</p>
            <p className="text-xs text-gray-500 mt-1">Sent to salespersons</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheckCircle className="text-green-600 text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
export {RouteStats}