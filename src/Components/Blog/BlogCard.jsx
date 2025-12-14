import React from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const BlogCard = ({ post }) => {
  return (
    <div className="group">
      
      {/* Image */}
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden rounded-lg">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
        />
      </Link>

      {/* Meta */}
      <p className="text-sm text-blue-600 mt-4">
        {post.author} • {post.date}
      </p>

      {/* Title */}
      <Link
        to={`#/blog/${post.slug}`}
        className="flex items-center justify-between gap-2 mt-2"
      >
        <h3 className="text-lg font-semibold group-hover:underline">
          {post.title}
        </h3>
        <FiArrowUpRight className="text-gray-500" />
      </Link>

      {/* Excerpt */}
      <p className="text-gray-600 text-sm mt-2">
        {post.excerpt}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-xs font-medium ${tag.color}`}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
