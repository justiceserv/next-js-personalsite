/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "@/components/Navbar"
import ClientWrapper from "@/components/ClientWrapper"
import BlogPost from "@/components/BlogPost"
import RelatedPosts from "@/components/RelatedPosts"

// 임시 데이터 - 실제로는 DB나 CMS에서 가져와야 함
const post = {
  id: 1,
  title: "The Future of Web Development: 2024 and Beyond",
  excerpt: "Exploring the latest trends and technologies shaping the future of web development, from AI-powered tools to WebAssembly and Edge Computing.",
  content: `
# Introduction

The web development landscape is constantly evolving, with new technologies and methodologies emerging at a rapid pace. As we move through 2024, several key trends are shaping the future of web development.

## AI-Powered Development Tools

Artificial Intelligence is revolutionizing the way we write code. From intelligent code completion to automated testing, AI tools are becoming an integral part of the development workflow.

### Key Benefits
- Increased productivity
- Reduced errors
- Faster debugging
- Automated code optimization

## The Rise of WebAssembly

WebAssembly (Wasm) continues to gain traction, enabling high-performance applications in the browser. This technology bridges the gap between web and native applications.

### Use Cases
- Complex calculations
- Gaming
- Video processing
- 3D rendering

## Edge Computing and the JAMstack

The combination of Edge Computing and the JAMstack architecture is creating faster, more resilient web applications. This approach brings computation closer to the end user, reducing latency and improving performance.
  `,
  date: "2024-02-17",
  readingTime: "5 min read",
  category: "Development",
  author: {
    name: "Guhyun Chung",
    avatar: "/avatar.jpg",
    role: "Full Stack Developer"
  },
  coverImage: "/images/temp-blog-cover.jpg",
  tags: ["Web Development", "AI", "WebAssembly", "Edge Computing"]
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
type Params = Promise<{ slug: string }>

interface PageProps {
  params: Params
  searchParams: SearchParams
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  return {
    title: post.title,
    description: post.excerpt,
  }
}

const BlogPostPage = async ({ params, searchParams }: PageProps) => {
  const { slug } = await params
  const resolvedSearchParams = await searchParams
  // 나중에 slug와 searchParams를 사용하여 실제 포스트를 가져올 예정

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <BlogPost post={post} />
      <RelatedPosts currentPostId={post.id} />
      <ClientWrapper />
    </main>
  )
}

export default BlogPostPage

