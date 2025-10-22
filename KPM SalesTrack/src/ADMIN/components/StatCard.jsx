
const StatCard = ({ title, value, borderColor, valueColor }) => {
  return (
    <div className={`bg-white rounded-lg p-6 border-l-4 ${borderColor}`}>
      <div className="text-gray-600 mb-2">{title}</div>
      <div className={`text-4xl font-light ${valueColor}`}>{value}</div>
    </div>
  );
};

export default StatCard;