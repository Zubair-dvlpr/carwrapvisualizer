import React from 'react'
import BlogGrid from '../../Components/Blog/BlogGrid';


const blogPosts = [
  {
    title: "Processing napkins in epoxy",
    slug: "processing-napkins-epoxy",
    image: "https://picsum.photos/409/719",
    author: "Alec Whitten",
    date: "1 Jan 2026",
    excerpt:
      "Like to know the secrets of transforming a 2–14 team into a 3x Super Bowl winning Dynasty?",
    tags: [
      { label: "Leadership", color: "bg-blue-100 text-blue-600" },
      { label: "Management", color: "bg-purple-100 text-purple-600" },
    ],
  },
  {
    title: "Making Christmas with epoxy",
    slug: "making-christmas-epoxy",
    image: "https://picsum.photos/410/720",
    author: "Demi Wilkinson",
    date: "1 Jan 2026",
    excerpt:
      "Mental models are simple expressions of complex processes or relationships.",
    tags: [
      { label: "Product", color: "bg-blue-100 text-blue-600" },
      { label: "Research", color: "bg-purple-100 text-purple-600" },
      { label: "Frameworks", color: "bg-orange-100 text-orange-600" },
    ],
  },
  {
    title: "Bending epoxy casting resin",
    slug: "bending-epoxy-casting-resin",
    image: "https://picsum.photos/400/700",
    author: "Candice Wu",
    date: "1 Jan 2026",
    excerpt:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    tags: [
      { label: "Design", color: "bg-blue-100 text-blue-600" },
      { label: "Research", color: "bg-purple-100 text-purple-600" },
    ],
  },
];

const Blog = () => {
  return (
    <div className='pb-96'>
      <BlogGrid posts={blogPosts} />;
    </div>
  )
}

export default Blog
