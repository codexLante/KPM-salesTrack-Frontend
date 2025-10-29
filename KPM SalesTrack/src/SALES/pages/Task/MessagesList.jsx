import { MessageCircle, Clock } from "lucide-react";

export function MessagesList({ messages }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <MessageCircle className="text-teal-400" size={24} />
        <h2 className="text-xl font-bold text-gray-900">Messages</h2>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`bg-white rounded-lg p-6 border-2 transition-all ${
              message.unread 
                ? "border-blue-300 bg-blue-50" 
                : "border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {message.sender.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{message.sender}</h3>
                  <p className="text-sm text-gray-500">{message.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>{message.time}</span>
              </div>
            </div>
            <p className="text-gray-700">{message.message}</p>
            {message.unread && (
              <span className="inline-block mt-3 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                New
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}