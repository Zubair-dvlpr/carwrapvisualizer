import React, { useState } from "react";
import ShareModal from "./ShareModal";

export default function CreatePost() {
  const [generatedImages, setGeneratedImages] = useState([
    // sample placeholders – replace with generated images
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/160"
  ]);
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 w-full max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-semibold text-gray-700 mb-3 text-center">
        Create Post
      </h2>

      <textarea
        placeholder="Write here..."
        className="w-full h-32 border border-gray-300 rounded-lg p-3 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>

      {/* Generated Images Preview */}
      {generatedImages.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-4">
          {generatedImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="generated"
              className="w-20 h-20 object-cover rounded-md border border-gray-200"
            />
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-5">
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
          Cancel
        </button>

        {generatedImages.length > 0 && (
          <button
            onClick={() => setIsShareOpen(true)}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
          >
            Share
          </button>
        )}

        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Publish
        </button>
      </div>

      {/* Modal */}
      {isShareOpen && (
        <ShareModal
          images={generatedImages}
          setImages={setGeneratedImages}
          onClose={() => setIsShareOpen(false)}
        />
      )}
    </div>
  );
}
