"use client"

import BlogPost from "./BlogPost"

const posts = [
  {
    category: "Development",
    title: "The Future of Web Development: 2024 and Beyond",
    description: "Exploring the latest trends and technologies shaping the future of web development, from AI-powered tools to WebAssembly and Edge Computing.",
    date: "2024-02-17",
    readTime: "5 min read"
  },
  {
    category: "Esports",
    title: "Building High-Performance Esports Teams",
    description: "Lessons learned from managing professional gaming teams and creating winning team cultures.",
    date: "2024-02-14",
    readTime: "7 min read"
  },
  {
    category: "Development",
    title: "Optimizing React Applications for Scale",
    description: "Best practices and techniques for building performant React applications that can handle millions of users.",
    date: "2024-02-10",
    readTime: "6 min read"
  }
]

const BlogList = () => {
  return (
    <div className="container mx-auto px-6 md:px-12 max-w-[1400px] py-12">
      <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <BlogPost key={index} {...post} />
        ))}
      </div>
    </div>
  )
}

export default BlogList 