import React from 'react';

const PopupModal = ({ title, message, onClose, icon = '⚠️', confirmText = 'Okay, Got It' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000cc] backdrop-blur-sm">
      <div className="bg-[#1a1d24] text-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-yellow-400 text-xl">{icon}</span>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>

        <p className="text-sm text-gray-300 mb-4">{message}</p>

        <button
          onClick={onClose}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
