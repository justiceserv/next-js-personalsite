import BlogHero from "@/components/BlogHero"
import BlogPosts from "@/components/BlogPosts"
import BlogCategories from "@/components/BlogCategories"
import Navbar from "@/components/Navbar"
import ClientWrapper from "@/components/ClientWrapper"

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <BlogHero />
      <BlogCategories />
      <BlogPosts />
      <ClientWrapper />
    </main>
  )
}

