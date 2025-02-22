"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
}

const projects: Project[] = [
  {
    title: "Esports Team Management System",
    description:
      "Comprehensive platform for managing professional esports teams, including player analytics, scrim scheduling, and performance tracking.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    link: "/projects/esports-management",
  },
  {
    title: "Tournament Broadcasting Tool",
    description:
      "Real-time broadcasting overlay system for esports tournaments, featuring live statistics and automatic score updates.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "WebSocket", "Node.js", "Redis"],
    link: "/projects/broadcast-tool",
  },
  {
    title: "Player Analytics Dashboard",
    description:
      "Advanced analytics platform providing insights into player performance, team statistics, and game strategy analysis.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Vue.js", "Python", "TensorFlow", "AWS"],
    link: "/projects/analytics-dashboard",
  },
]

const ProjectSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  // 무한 슬라이드를 위해 앞뒤로 프로젝트 복제
  const extendedProjects = [...projects, ...projects, ...projects]

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        // 끝에 도달했을 때 자연스럽게 처음으로 돌아가기
        if (currentIndex >= projects.length) {
          setCurrentIndex(0)
        } else if (currentIndex < 0) {
          setCurrentIndex(projects.length - 1)
        }
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isTransitioning, currentIndex])

  const slideProjects = (direction: "next" | "prev") => {
    if (isTransitioning) return
    setIsTransitioning(true)
    if (direction === "next") {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  return (
    <section className="relative z-10 py-24 bg-zinc-950">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
            <p className="mt-2 text-zinc-400">Some of the projects I&apos;ve worked on</p>
          </div>
          <a
            href="/projects"
            className="group flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex + projects.length) * 33.333}%)`,
              }}
            >
              {extendedProjects.map((project, index) => (
                <div 
                  key={index} 
                  className="w-1/3 flex-shrink-0 px-3"
                >
                  <a
                    href={project.link}
                    className="group relative flex flex-col bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors h-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs font-medium bg-zinc-800 text-zinc-400 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => slideProjects("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 text-white rounded-full p-3 backdrop-blur-sm border border-zinc-800 shadow-lg transition-all hover:scale-110 z-10"
            aria-label="Previous projects"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => slideProjects("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-zinc-900/80 hover:bg-zinc-800 text-white rounded-full p-3 backdrop-blur-sm border border-zinc-800 shadow-lg transition-all hover:scale-110 z-10"
            aria-label="Next projects"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProjectSection

