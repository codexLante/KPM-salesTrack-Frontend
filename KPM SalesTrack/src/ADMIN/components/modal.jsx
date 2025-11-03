import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Modal = ({ title, message, onClose, type = "success", actions = [] }) => {
  const isSuccess = type === "success";
  const bgColor = isSuccess ? "bg-green-50" : "bg-red-50";
  const textColor = isSuccess ? "text-green-900" : "text-red-900";
  const borderColor = isSuccess ? "border-green-300" : "border-red-300";
  const Icon = isSuccess ? CheckCircle : AlertCircle;


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const modalContent = (
    <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full border ${borderColor} overflow-hidden`}>
        {/* Header */}
        <div className={`px-6 py-4 flex items-center gap-3 ${bgColor}`}>
          <Icon size={28} className={isSuccess ? "text-green-600" : "text-red-600"} />
          <h2 className={`text-lg font-bold ${textColor}`}>{title}</h2>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <p className="text-gray-700 text-center mb-6">{message}</p>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            {actions.length > 0 ? (
              actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.onClick}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    action.primary
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {action.label}
                </button>
              ))
            ) : (
              <button
                onClick={onClose}
                className="px-8 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
export {Modal}