import type React from "react"
import Link from "next/link"
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image"

// 임시 데이터
const relatedPosts = [
  {
    id: 2,
    title: "Building High-Performance Esports Teams",
    excerpt: "Lessons learned from managing professional gaming teams and creating winning team cultures.",
    date: "2024-02-14",
    category: "Esports",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Optimizing React Applications for Scale",
    excerpt:
      "Best practices and techniques for building performant React applications that can handle millions of users.",
    date: "2024-02-10",
    category: "Development",
    image: "/placeholder.svg?height=400&width=600",
  },
]

const RelatedPosts = ({ currentPostId: _currentPostId }: { currentPostId: number }) => {
  return (
    <section className="py-16 border-t border-zinc-800">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group">
              <article className="h-full p-6 bg-zinc-900/50 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                      {post.category}
                    </span>
                    <span className="text-zinc-400">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-zinc-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 line-clamp-2">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedPosts

