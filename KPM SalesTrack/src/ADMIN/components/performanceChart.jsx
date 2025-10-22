
const PerformanceChart = () => {
  const monthlyData = [
    { month: 'Jan', value: 40 },
    { month: 'Feb', value: 65 },
    { month: 'March', value: 55 },
    { month: 'Apr', value: 75 },
    { month: 'May', value: 60 },
    { month: 'June', value: 70 },
    { month: 'July', value: 80 },
    { month: 'Aug', value: 90 }
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.value));

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Performance Overview</h3>
        <p className="text-sm text-gray-500">Monthly Sales Performance</p>
      </div>
      <div className="flex items-end justify-between h-64 gap-4">
        {monthlyData.map((data, index) => (
          <div key={index} className="flex flex-col items-center flex-1 gap-2">
            <div className="w-full bg-gray-100 rounded-t relative flex items-end" style={{ height: '200px' }}>
              <div
                className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                style={{ height: `${(data.value / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">{data.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceChart;