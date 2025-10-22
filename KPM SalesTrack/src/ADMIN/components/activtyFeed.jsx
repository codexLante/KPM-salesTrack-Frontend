import { UserPlus, Calendar, CheckCircle, TrendingUp } from 'lucide-react';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'client',
      icon: UserPlus,
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-500',
      title: 'New client added',
      description: 'Tech Solutions Ltd - assigned to Eugene mwite',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'meeting',
      icon: Calendar,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500',
      title: 'Meeting completed',
      description: 'Global Enterprises - Follow-up scheduled',
      time: '5 hours ago'
    },
    {
      id: 3,
      type: 'task',
      icon: CheckCircle,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500',
      title: 'Task completed',
      description: 'Erica muthoni completed client proposal',
      time: '1 day ago'
    },
    {
      id: 4,
      type: 'achievement',
      icon: TrendingUp,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
      title: 'Sales target achieved',
      description: 'Eva Mwaki reached monthly quota',
      time: '2 days ago'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const IconComponent = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`p-2 rounded-full ${activity.iconBg} flex-shrink-0`}>
                <IconComponent className={`h-5 w-5 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{activity.title}</p>
                <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 py-2 text-cyan-500 hover:bg-cyan-50 rounded-lg transition-colors font-medium text-sm">
        View All Activity
      </button>
    </div>
  );
};

export default ActivityFeed;