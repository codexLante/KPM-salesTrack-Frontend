const StatCard = ({ title, value, borderColor, valueColor, bgColor, color, Icon }) => {
  return (
    <div className={`bg-white rounded-lg p-6 border-l-4 ${borderColor} w-full flex justify-between items-center`}>
      <div>
        <div className="text-gray-600 mb-2">{title}</div>
        <div className={`text-4xl font-light ${color || valueColor}`}>{value}</div>
      </div>
      {Icon && (
        <div className={`p-3 rounded-full ${bgColor} ${color}`}>
          <Icon className="h-8 w-8" />
        </div>
      )}
    </div>
  );
};

export default StatCard;
