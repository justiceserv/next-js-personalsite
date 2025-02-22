"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BlogPostProps {
  category: string
  title: string
  description: string
  date: string
  readTime: string
}

const BlogPost = ({ category, title, description, date, readTime }: BlogPostProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5"
    >
      <Link href="#" className="block">
        {/* 썸네일 이미지 */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src="/placeholder.svg"
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
          <span className="absolute bottom-4 left-4 px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-400 text-sm rounded-full">
            {category}
          </span>
        </div>

        {/* 콘텐츠 */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-3 text-zinc-100 group-hover:text-blue-400 transition-colors line-clamp-2">
            {title}
          </h2>
          
          <p className="text-zinc-400 text-sm line-clamp-2 mb-4 group-hover:text-zinc-300 transition-colors">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readTime}
              </span>
            </div>
            <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default BlogPost 