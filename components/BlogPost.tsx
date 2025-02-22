/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ChevronLeft, Share2 } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import ShareModal from "./ShareModal"

interface Author {
  name: string
  avatar: string
  role: string
}

interface Post {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  readingTime: string
  category: string
  author: Author
  coverImage: string
  tags: string[]
}

interface BlogPostProps {
  post: Post
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const [activeSection, setActiveSection] = useState("")
  const [toc, setToc] = useState<{ id: string; title: string; level: number }[]>([])
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  useEffect(() => {
    // 목차 생성 로직
    const headings = post.content.match(/#{1,3} .+/g) || []
    const tocItems = headings.map((heading) => {
      const level = heading.match(/^#+/)?.[0].length || 1
      const title = heading.replace(/^#+\s/, "")
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      return { id, title, level }
    })
    setToc(tocItems)
  }, [post.content])

  // 스크롤 감지 로직
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    const headings = document.querySelectorAll("h1[id], h2[id], h3[id]")
    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [post.content])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: currentUrl,
      })
    } else {
      setIsShareModalOpen(true)
    }
  }

  return (
    <article className="min-h-screen bg-zinc-950">
      {/* ShareModal 추가 */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={post.title}
        url={currentUrl}
      />
      
      {/* 헤더 섹션 */}
      <header className="pt-40 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
          <div className="max-w-4xl mx-auto">
            {/* 뒤로가기 & 공유 버튼 */}
            <div className="flex items-center justify-between mb-8">
              <Link 
                href="/blog" 
                className="flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Blog
              </Link>
              <button
                className="flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </button>
            </div>

            {/* 메타데이터 */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                  {post.category}
                </span>
                <span className="flex items-center text-zinc-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  {post.date}
                </span>
                <span className="flex items-center text-zinc-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readingTime}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
              <p className="text-xl text-zinc-400">{post.excerpt}</p>
            </div>
          </div>
        </div>
      </header>

      {/* 커버 이미지 - 여백 및 크기 조정 */}
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px] -mb-96 relative z-10">
        <div className="relative h-[400px] md:h-[700px] rounded-2xl overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-950/0 to-zinc-950/90" />
        </div>
      </div>

      {/* 본문 - 여백 조정 */}
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px] pt-96 pb-32">
        <div className="max-w-4xl mx-auto flex gap-32">
          {/* 메인 콘텐츠 */}
          <div className="flex-1">
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={{
                  h1: ({ node: _node, ...props }) => (
                    <h1
                      id={props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                      className="text-3xl font-bold mt-8 mb-4"
                      {...props}
                    />
                  ),
                  h2: ({ node: _node, ...props }) => (
                    <h2
                      id={props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                      className="text-2xl font-bold mt-8 mb-4"
                      {...props}
                    />
                  ),
                  h3: ({ node: _node, ...props }) => (
                    <h3
                      id={props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                      className="text-xl font-bold mt-6 mb-3"
                      {...props}
                    />
                  ),
                  p: ({ node: _node, ...props }) => (
                    <p className="my-4 text-zinc-300" {...props} />
                  ),
                  ul: ({ node: _node, ...props }) => (
                    <ul className="my-4 list-disc list-inside space-y-2" {...props} />
                  ),
                  li: ({ node: _node, ...props }) => (
                    <li className="text-zinc-300" {...props} />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* 태그 섹션 */}
            <div className="mt-20 pt-10 border-t border-zinc-800">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-zinc-900 text-zinc-400 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 목차 사이드바 - 위치 및 스타일 조정 */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-[calc(2.5rem)] pt-12">
              <h4 className="text-sm font-medium mb-3">Table of Contents</h4>
              <nav className="space-y-0.5">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`
                      block py-1 text-sm transition-colors
                      ${item.level === 1 ? "pl-0" : item.level === 2 ? "pl-3" : "pl-5"}
                      ${activeSection === item.id ? "text-blue-400" : "text-zinc-400 hover:text-white"}
                    `}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogPost

