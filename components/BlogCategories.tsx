"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const categories = [
  "All",
  "Development",
  "Design",
  "AI",
  "Career",
  "Tech News"
]

const BlogCategories = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sticky top-12 bg-zinc-950/80 backdrop-blur-md z-20 border-b border-zinc-800">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        {/* 모바일 드롭다운 */}
        <div className="md:hidden py-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-zinc-900 rounded-lg border border-zinc-800"
          >
            <span className="text-sm font-medium">{activeCategory}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
          
          {isOpen && (
            <div className="absolute left-6 right-6 mt-2 py-2 bg-zinc-900 rounded-lg border border-zinc-800 shadow-lg">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category)
                    setIsOpen(false)
                  }}
                  className={`
                    w-full text-left px-4 py-2 text-sm transition-colors
                    ${activeCategory === category 
                      ? "text-blue-400 bg-blue-500/10" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 데스크톱 카테고리 */}
        <div className="hidden md:block py-4">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors
                  ${activeCategory === category 
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
                    : "text-zinc-400 hover:text-white"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogCategories

