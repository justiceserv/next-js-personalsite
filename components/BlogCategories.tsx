"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const categories = [
  { id: "all", name: "All Posts" },
  { id: "tech", name: "Technology" },
  { id: "esports", name: "Esports" },
  { id: "development", name: "Development" },
  { id: "management", name: "Management" },
  { id: "life", name: "Life & Career" },
]

const BlogCategories = () => {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="relative px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap"
            >
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-zinc-800 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={`relative z-10 ${activeCategory === category.id ? "text-white" : "text-zinc-400"}`}>
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogCategories

