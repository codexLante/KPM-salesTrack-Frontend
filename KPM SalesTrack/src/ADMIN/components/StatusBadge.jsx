
const StatusBadge = ({ status }) => {
  const isActive = status === 'active';
  return (
    <span
      className={`px-6 py-2 rounded-full text-white text-sm font-medium inline-block ${
        isActive ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
};

export default StatusBadge;