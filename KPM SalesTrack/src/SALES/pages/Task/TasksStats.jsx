import { Clock, CheckCircle, MessageCircle } from "lucide-react";

export function TasksStats({ pending, completed, messages }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-600 text-sm">Pending Tasks</p>
          <Clock className="text-blue-500" size={32} />
        </div>
        <p className="text-4xl font-bold text-gray-900">{pending}</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-600 text-sm">completed</p>
          <CheckCircle className="text-green-500" size={32} />
        </div>
        <p className="text-4xl font-bold text-gray-900">{completed}</p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-600 text-sm">New messages</p>
          <MessageCircle className="text-teal-400" size={32} />
        </div>
        <p className="text-4xl font-bold text-gray-900">{messages}</p>
      </div>
    </div>
  );
}
