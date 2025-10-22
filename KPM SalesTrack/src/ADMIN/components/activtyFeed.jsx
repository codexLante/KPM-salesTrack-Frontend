import { FaChartLine } from 'react-icons/fa';

const ActivityFeed = () => {
  const activities = [
    { user: 'John Smith', action: 'Completed meeting with ABC Corp', time: '10 mins ago' },
    { user: 'John Smith', action: 'Completed meeting with Corp', time: '2 mins ago' }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-cyan-400">
      <div className="flex items-center gap-2 mb-4">
        <FaChartLine className="text-cyan-400 text-xl" />
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
              <span className="text-cyan-600 font-semibold">JS</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;