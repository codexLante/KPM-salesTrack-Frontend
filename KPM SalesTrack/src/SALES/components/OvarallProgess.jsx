import ProgressCircle from "./ProgressCircle";

export default function OverallProgress({ percentage }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 p-8">
      <div className="flex items-center space-x-3 mb-8">
        <svg className="text-blue-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
        <h2 className="text-xl font-bold text-gray-900">Overall Weekly Progress</h2>
      </div>

      <div className="flex justify-center">
        <ProgressCircle percentage={percentage} />
      </div>
    </div>
  );
}