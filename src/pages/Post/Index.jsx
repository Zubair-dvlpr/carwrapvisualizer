import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPublicPostAPIFn } from "../../redux/features/Studio/studioFus";
import { FaExpand, FaCompress } from "react-icons/fa";
import InstagramCarousel from "../CarFillPage/Components/InstagramCarousel";

export default function Post() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // 🔍 New fullscreen variables
  const viewerRef = useRef(null);
  const [isViewerFull, setIsViewerFull] = useState(false);

  // Toggle fullscreen mode
  const toggleViewerMode = () => {
    if (!isViewerFull) {
      if (viewerRef.current?.requestFullscreen) {
        viewerRef.current.requestFullscreen();
      }
      setIsViewerFull(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsViewerFull(false);
    }
  };

  // Listen for Escape or manual exit
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") setIsViewerFull(false);
    };
    const handleChange = () => {
      setIsViewerFull(Boolean(document.fullscreenElement));
    };
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("fullscreenchange", handleChange);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await dispatch(getPublicPostAPIFn(id)).unwrap();
        setPost(res?.data);
      } catch (err) {
        setError("Post not found or deleted");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, dispatch]);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#0b0f1a] text-gray-300">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mb-4"></div>
        <p className="text-sm tracking-wide">Loading post...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#0b0f1a] text-red-500">
        <h1 className="text-xl font-semibold mb-2">❌ Error</h1>
        <p>{error}</p>
      </div>
    );

  const imageUrls =
    post?.images?.map((img) => img.url || img.Location).filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex flex-col items-center justify-start py-12 px-4">
      <div className="max-w-3xl w-full bg-[#1a1f2e] rounded-2xl shadow-2xl overflow-hidden border border-[#2a3145] animate-fadeIn">
        {/* 🖼️ Image Viewer Section */}
        <div
          className="relative flex flex-col justify-center items-center bg-[#000]"
          ref={viewerRef}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0b0f1a]">
              <div className="animate-pulse w-24 h-24 bg-gray-700/40 rounded-full"></div>
            </div>
          )}

          {imageUrls.length > 0 ? (
            <div className="" onLoad={() => setImageLoaded(true)}>
              <InstagramCarousel images={imageUrls} aspect="square" />
            </div>
          ) : (
            <div className="p-8 text-center text-gray-400">
              No images available for this post.
            </div>
          )}

          {/* 🔘 Fullscreen Buttons */}
          {!isViewerFull && imageUrls.length > 0 && (
            <button
              onClick={toggleViewerMode}
              className="absolute bottom-4 right-4 bg-black/60 text-white p-3 rounded-full shadow-lg hover:bg-black/80 transition"
              title="Enlarge"
            >
              <FaExpand size={18} />
            </button>
          )}

          {isViewerFull && (
            <button
              onClick={toggleViewerMode}
              className="absolute top-4 right-4 bg-black/60 text-white p-3 rounded-full shadow-lg hover:bg-black/80 transition z-50"
              title="Exit Fullscreen"
            >
              <FaCompress size={18} />
            </button>
          )}
        </div>

        {/* 🧾 Post Info */}
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-white mb-2 leading-tight">
            {post.title}
          </h1>

          <p className="text-gray-400 text-sm mb-6 border-b border-gray-700 pb-4">
            {new Date(post.createdAt).toLocaleDateString()} • Public Post
          </p>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {post.description}
          </p>
        </div>
      </div>
    </div>
  );
}
