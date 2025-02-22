import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Calendar, Clock } from "lucide-react"

// 임시 데이터
const posts = [
  {
    id: 1,
    title: "The Future of Web Development: 2024 and Beyond",
    excerpt:
      "Exploring the latest trends and technologies shaping the future of web development, from AI-powered tools to WebAssembly.",
    date: "2024-02-17",
    category: "Development",
    image: "/placeholder.svg?height=400&width=600",
    readingTime: "5 min read",
  },
  {
    id: 2,
    title: "Building High-Performance Esports Teams",
    excerpt: "Lessons learned from managing professional gaming teams and creating winning team cultures.",
    date: "2024-02-14",
    category: "Esports",
    image: "/placeholder.svg?height=400&width=600",
    readingTime: "7 min read",
  },
  {
    id: 3,
    title: "Optimizing React Applications for Scale",
    excerpt:
      "Best practices and techniques for building performant React applications that can handle millions of users.",
    date: "2024-02-10",
    category: "Development",
    image: "/placeholder.svg?height=400&width=600",
    readingTime: "6 min read",
  },
  {
    id: 4,
    title: "The Evolution of Game Development",
    excerpt: "How game development has changed over the years and where it's heading.",
    date: "2024-02-08",
    category: "Development",
    readingTime: "8 min read",
  },
  {
    id: 5,
    title: "Managing Remote Development Teams",
    excerpt: "Strategies for effective remote team management in software development.",
    date: "2024-02-05",
    category: "Management",
    readingTime: "5 min read",
  },
  {
    id: 6,
    title: "The Impact of AI on Esports",
    excerpt: "How artificial intelligence is transforming the competitive gaming landscape.",
    date: "2024-02-03",
    category: "Esports",
    readingTime: "6 min read",
  },
]

const BlogPosts = () => {
  const featuredPosts = posts.slice(0, 3)
  const latestPosts = posts.slice(3)

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        {/* Featured Posts - 카드형 */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {featuredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group">
              <article className="h-full bg-zinc-900/50 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="relative h-48">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm mb-4">
                    <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full">{post.category}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-zinc-300 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-400 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-zinc-500 gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Latest Posts - 리스트형 */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold">Latest Posts</h2>
          <div className="space-y-6">
            {latestPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group block">
                <article className="p-6 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full">{post.category}</span>
                        <span className="text-zinc-500">{post.date}</span>
                        <span className="text-zinc-500">{post.readingTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold group-hover:text-zinc-300 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-zinc-400 line-clamp-2">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogPosts

