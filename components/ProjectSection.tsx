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

  // 프로젝트 배열을 확장하여 양 끝에 추가 프로젝트를 배치
  const projectsToShow = [...projects.slice(-3), ...projects, ...projects.slice(0, 3)]

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
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
    setIsTransitioning(true)
    if (direction === "next") {
      setCurrentIndex((prev) => (prev + 3) % projects.length)
    } else {
      setCurrentIndex((prev) => (prev - 3 + projects.length) % projects.length)
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

        <div className="relative mx-[-2rem]">
          <div className="overflow-hidden px-8">
            <div
              ref={sliderRef}
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${currentIndex * 33.33}% - ${currentIndex * 1.5}rem))`,
              }}
            >
              {projectsToShow.map((project, index) => (
                <div key={index} style={{ width: "calc(33.33% - 1rem)" }} className="flex-shrink-0">
                  <a
                    href={project.link}
                    className="group relative flex flex-col bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors"
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
                      <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{project.description}</p>
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

          {/* Navigation Buttons */}
          <button
            onClick={() => slideProjects("prev")}
            className="absolute left-8 top-1/2 -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full p-2 transition-colors"
            aria-label="Previous projects"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => slideProjects("next")}
            className="absolute right-8 top-1/2 -translate-y-1/2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full p-2 transition-colors"
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

