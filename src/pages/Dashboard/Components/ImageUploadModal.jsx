import React from 'react';
import { RxCross1 } from 'react-icons/rx';

const ImageUploadModal = ({ onClose, onFileSelect }) => {
  return (
    <div className="fixed inset-0 bg-[#12161fc5] bg-opacity-50 backdrop-blur-sm  bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <RxCross1 size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center">Choose Upload Method</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* File upload */}
          <label
            htmlFor="file-upload-gallery"
            className="border p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100"
          >
            📁 Upload from Files
            <input
              type="file"
              accept="image/*"
              id="file-upload-gallery"
              onChange={(e) => {
                onFileSelect(e);
                onClose();
              }}
              className="hidden"
            />
          </label>

          {/* Camera capture */}
          <label
            htmlFor="file-upload-camera"
            className="border p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100"
          >
            📷 Take Photo
            <input
              type="file"
              accept="image/*"
              capture="environment"
              id="file-upload-camera"
              onChange={(e) => {
                onFileSelect(e);
                onClose();
              }}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
