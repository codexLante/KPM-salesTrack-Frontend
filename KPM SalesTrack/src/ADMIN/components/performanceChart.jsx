const PerformanceChart = () => {
  const data = [
    { month: 'Jan', meetings: 40, newClients: 28 },
    { month: 'Feb', meetings: 48, newClients: 32 },
    { month: 'Mar', meetings: 42, newClients: 28 },
    { month: 'Apr', meetings: 52, newClients: 38 },
    { month: 'May', meetings: 50, newClients: 35 },
    { month: 'Jun', meetings: 60, newClients: 42 }
  ];

  const maxValue = Math.max(...data.map(d => Math.max(d.meetings, d.newClients)));

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1">Client Growth & Meetings</h3>
        <p className="text-gray-600 text-sm">New Clients and meetings comparison over 6 months</p>
      </div>

      <div className="relative h-80">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-500">
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="absolute left-12 right-0 top-0 bottom-8 flex items-end justify-around gap-4">
          {data.map((item, index) => {
            const meetingsHeight = (item.meetings / maxValue) * 100;
            const clientsHeight = (item.newClients / maxValue) * 100;
            
            return (
              <div key={index} className="flex-1 flex items-end justify-center gap-2 relative group">
                {/* New Clients Bar */}
                <div className="flex-1 relative">
                  <div 
                    className="bg-emerald-400 rounded-t hover:bg-emerald-500 transition-all cursor-pointer"
                    style={{ height: `${clientsHeight}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      New Clients: {item.newClients}
                    </div>
                  </div>
                </div>

                {/* Meetings Bar */}
                <div className="flex-1 relative">
                  <div 
                    className="bg-cyan-400 rounded-t hover:bg-cyan-500 transition-all cursor-pointer"
                    style={{ height: `${meetingsHeight}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Meetings: {item.meetings}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="absolute left-12 right-0 bottom-0 flex justify-around">
          {data.map((item, index) => (
            <span key={index} className="text-xs text-gray-600 flex-1 text-center">
              {item.month}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-cyan-400 rounded"></div>
          <span className="text-sm text-gray-600">Meetings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-400 rounded"></div>
          <span className="text-sm text-gray-600">New Clients</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;