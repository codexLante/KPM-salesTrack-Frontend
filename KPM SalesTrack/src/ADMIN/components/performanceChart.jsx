const PerformanceChart = () => {
  const data = [
    { month: 'Jan', meetings: 65, newClients: 50 },
    { month: 'Feb', meetings: 72, newClients: 58 },
    { month: 'Mar', meetings: 68, newClients: 52 },
    { month: 'Apr', meetings: 78, newClients: 62 },
    { month: 'May', meetings: 75, newClients: 58 },
    { month: 'Jun', meetings: 80, newClients: 68 }
  ];

  const maxValue = 80; 

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1">Client Growth & Meetings</h3>
        <p className="text-gray-600 text-sm">New Clients and meetings comparison over 6 months</p>
      </div>

      <div className="h-96 flex flex-col">
        {/* Chart Container */}
        <div className="flex-1 flex">
          {/* Y-axis */}
          <div className="w-12 flex flex-col justify-between text-sm text-gray-500 pr-2">
            <span>80</span>
            <span>60</span>
            <span>40</span>
            <span>20</span>
            <span>0</span>
          </div>

          {/* Bars Container */}
          <div className="flex-1 flex items-end justify-between gap-2 border-l border-b border-gray-200 pb-2 pl-4">
            {data.map((item, index) => {
              const meetingsHeight = (item.meetings / maxValue) * 100;
              const clientsHeight = (item.newClients / maxValue) * 100;
              
              return (
                <div key={index} className="flex-1 flex items-end justify-center gap-1 group relative">
                  {/* New Clients Bar (Green) */}
                  <div 
                    className="w-full bg-emerald-400 rounded-t hover:bg-emerald-500 transition-colors cursor-pointer relative"
                    style={{ height: `${clientsHeight}%`, minHeight: '4px' }}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      New Clients: {item.newClients}
                    </div>
                  </div>

                  {/* Meetings Bar (Cyan) */}
                  <div 
                    className="w-full bg-cyan-400 rounded-t hover:bg-cyan-500 transition-colors cursor-pointer relative"
                    style={{ height: `${meetingsHeight}%`, minHeight: '4px' }}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      Meetings: {item.meetings}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* X-axis Labels */}
        <div className="flex mt-2">
          <div className="w-12"></div>
          <div className="flex-1 flex justify-between pl-4 pr-2">
            {data.map((item, index) => (
              <span key={index} className="text-sm text-gray-600 flex-1 text-center">
                {item.month}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-cyan-400 rounded"></div>
          <span className="text-sm text-gray-600 font-medium">Meetings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-400 rounded"></div>
          <span className="text-sm text-gray-600 font-medium">New Clients</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;