import React from "react";
import BlogCard from "./BlogCard";

const BlogGrid = ({ posts }) => {
  return (
    <section className="py-20 mt-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Page Title */}
        <h1 className="text-4xl sm:text-7xl font-BeniRegular font-extrabold uppercase mb-12">
          All Blog Posts
        </h1>

        {/* Grid */}
        <div className="grid font-Inter grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogGrid;
