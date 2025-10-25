export default function ProgressCircle({ percentage }) {
  const circumference = 2 * Math.PI * 100; // radius = 100
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-64 h-64">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="128"
          cy="128"
          r="100"
          stroke="#E5E7EB"
          strokeWidth="20"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="128"
          cy="128"
          r="100"
          stroke="#3B82F6"
          strokeWidth="20"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold text-blue-600">{percentage}%</span>
        <span className="text-gray-600 font-medium mt-2">Completed</span>
      </div>
    </div>
  );
}