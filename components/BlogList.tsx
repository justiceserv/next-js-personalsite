"use client"

import BlogPost from "./BlogPost"

const posts = [
  {
    id: 1,
    title: "The Future of Web Development: 2024 and Beyond",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development, from AI-powered tools to WebAssembly and Edge Computing.",
    content: "",
    date: "2024-02-17",
    readingTime: "5 min read",
    category: "Development",
    author: {
      name: "Guhyun Chung",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    coverImage: "/images/temp-blog-cover.jpg",
    tags: ["Web Development", "AI", "WebAssembly"]
  },
  {
    id: 2,
    title: "Building High-Performance Esports Teams",
    excerpt: "Lessons learned from managing professional gaming teams and creating winning team cultures.",
    content: "",
    date: "2024-02-14",
    readingTime: "7 min read",
    category: "Esports",
    author: {
      name: "Guhyun Chung",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    coverImage: "/images/temp-blog-cover.jpg",
    tags: ["Esports", "Management", "Team Building"]
  },
  {
    id: 3,
    title: "Optimizing React Applications for Scale",
    excerpt: "Best practices and techniques for building performant React applications that can handle millions of users.",
    content: "",
    date: "2024-02-10",
    readingTime: "6 min read",
    category: "Development",
    author: {
      name: "Guhyun Chung",
      avatar: "/avatar.jpg",
      role: "Full Stack Developer"
    },
    coverImage: "/images/temp-blog-cover.jpg",
    tags: ["React", "Performance", "Web Development"]
  }
]

const BlogList = () => {
  return (
    <div className="container mx-auto px-6 md:px-12 max-w-[1400px] py-12">
      <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default BlogList 