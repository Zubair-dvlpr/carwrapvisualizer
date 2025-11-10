import React, { useState, useEffect } from "react";
import { createUserPostAPIFn } from "../../../redux/features/Studio/studioFus";
import { useDispatch } from "react-redux";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaRedditAlien,
  FaWhatsapp,
  FaTelegramPlane,
  FaInstagram,
  FaDownload,
} from "react-icons/fa";

export default function ShareModal({ images, onClose }) {
  const dispatch = useDispatch();
  const [localImages, setLocalImages] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setLocalImages([...images]);
    setIsMobile(/android|iphone|ipad|mobile/i.test(navigator.userAgent));
  }, [images]);

  // ✅ Remove an image
  const handleDelete = (index) => {
    if (localImages.length <= 1) return;
    setLocalImages(localImages.filter((_, i) => i !== index));
  };

  // ✅ Download a single image
  const handleDownload = async (url, index) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `carwrap-${index + 1}.jpg`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Download failed:", err);
      alert("❌ Failed to download image.");
    }
  };

  // ✅ Upload all remaining images
  const handleShare = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus(null);
    setPublicId(null);

    try {
      const res = await dispatch(
        createUserPostAPIFn({
          title,
          description: desc,
          selectedImages: localImages,
          onProgress: (p) => setUploadProgress(Math.min(p, 95)),
        })
      ).unwrap();

      setUploadProgress(100);
      setUploadStatus("success");
      setPublicId(res?.data?.publicId || null);
      setIsUploading(false);

      const publicUrl = `${window.location.origin}/post/${res?.data?.publicId}`;

      // Mobile native share
      if (isMobile && navigator.share) {
        navigator
          .share({
            title: title || "Car Wrap Visualizer Post",
            text: desc || "Check out my new wrap!",
            url: publicUrl,
          })
          .catch(() => {});
      }
    } catch (err) {
      console.error(err);
      setUploadStatus("error");
      setIsUploading(false);
    }
  };

  // ✅ Manual share (mobile fallback)
  const manualShare = () => {
    const publicUrl = `${window.location.origin}/post/${publicId}`;
    if (navigator.share) {
      navigator
        .share({
          title: title || "Car Wrap Visualizer Post",
          text: desc || "Check out my new wrap!",
          url: publicUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(publicUrl);
      alert("✅ Link copied to clipboard!");
    }
  };

  const getShareLinks = (link, msg, titleText) => ({
    facebook: `https://www.facebook.com/share.php?u=${link}`,
    twitter: `https://twitter.com/share?url=${link}&text=${msg}&hashtags=carwrap,visualizer`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
    reddit: `https://www.reddit.com/submit?url=${link}&title=${titleText}`,
    whatsapp: `https://api.whatsapp.com/send?text=${msg}: ${link}`,
    telegram: `https://t.me/share/url?url=${link}&text=${msg}`,
  });

  const statusMessage =
    uploadStatus === "success"
      ? "✅ Post uploaded successfully!"
      : uploadStatus === "error"
      ? "❌ Failed to upload post. Please try again."
      : null;

  const publicUrl = publicId
    ? `${window.location.origin}/post/${publicId}`
    : null;

  const social = getShareLinks(
    publicUrl || "",
    encodeURIComponent(desc || "Check out my wrap!"),
    encodeURIComponent(title || "Car Wrap Visualizer Post")
  );

  return (
    <div
      className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl mx-2 md:mx-0  p-6 relative animate-fadeIn">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Share Your Post
        </h2>

        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <textarea
          placeholder="Write a description..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 h-24 resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* ✅ Multi-Image Preview with Download Button */}
        <div className="flex flex-wrap gap-3 mb-5 justify-center">
          {localImages.map((img, i) => (
            <div
              key={i}
              className="relative rounded-lg overflow-hidden border border-gray-300"
            >
              <img
                src={img}
                alt={`preview-${i}`}
                className="w-24 h-24 object-cover rounded-md"
              />
              {/* ❌ Delete */}
              {localImages.length > 1 && (
                <button
                  onClick={() => handleDelete(i)}
                  className="absolute top-1 right-1 bg-white text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-gray-200"
                >
                  ✕
                </button>
              )}
              {/* 📥 Download */}
              <button
                onClick={() => handleDownload(img, i)}
                title="Download Image"
                className="absolute bottom-1 right-1 bg-white text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-gray-200"
              >
                <FaDownload size={10} />
              </button>
            </div>
          ))}
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-indigo-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {/* Status */}
        {statusMessage && (
          <div
            className={`text-center font-medium mb-4 ${
              uploadStatus === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {statusMessage}
          </div>
        )}

        {/* ✅ Social Media Links */}
        {uploadStatus === "success" && publicId && (
          <div className="text-center mb-5 space-y-3">
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-indigo-600 font-semibold underline hover:text-indigo-800 transition"
            >
              🔗 View Public Post
            </a>

            {!isMobile && (
              <div className="flex justify-center gap-4 mt-3">
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700"
                >
                  <FaFacebookF />
                </a>
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-sky-400 rounded-full text-white hover:bg-sky-500"
                >
                  <FaTwitter />
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-700 rounded-full text-white hover:bg-blue-800"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href={social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-green-500 rounded-full text-white hover:bg-green-600"
                >
                  <FaWhatsapp />
                </a>
                <a
                  href={social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-sky-500 rounded-full text-white hover:bg-sky-600"
                >
                  <FaTelegramPlane />
                </a>
                <a
                  href={social.reddit}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-orange-500 rounded-full text-white hover:bg-orange-600"
                >
                  <FaRedditAlien />
                </a>
                {/* ✅ Instagram: copy link instead */}
                <a
                  onClick={() => {
                    navigator.clipboard.writeText(publicUrl);
                    alert(
                      "✅ Link copied! Open Instagram and paste it into your story or bio."
                    );
                  }}
                  className="p-2 bg-pink-500 rounded-full text-white hover:bg-pink-600 cursor-pointer"
                  title="Copy link for Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            )}

            {isMobile && (
              <button
                onClick={manualShare}
                className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-500 hover:to-pink-400 text-white font-semibold py-2 rounded-lg shadow-md transition-all"
              >
                📤 Share This Post
              </button>
            )}
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isUploading}
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-60"
          >
            Close
          </button>

          {!uploadStatus && (
            <button
              onClick={handleShare}
              disabled={isUploading}
              className={`px-4 py-2 rounded-md text-white ${
                isUploading
                  ? "bg-indigo-300"
                  : "bg-indigo-500 hover:bg-indigo-600"
              }`}
            >
              {isUploading ? `Uploading ${uploadProgress}%` : "Share Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
