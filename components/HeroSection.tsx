"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import SplineScene from "./SplineScene"

const HeroSection = () => {
  const [destination, setDestination] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.width * dpr
      canvas.height = canvas.height * dpr
      ctx.scale(dpr, dpr)

      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"

      drawGrid()
    }

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const GRID_SIZE = 60
      const GRID_COLOR = "rgba(51, 153, 255, 0.15)"

      // 수직선
      for (let x = 0; x < canvas.width; x += GRID_SIZE) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.strokeStyle = GRID_COLOR
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // 수평선
      for (let y = 0; y < canvas.height; y += GRID_SIZE) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.strokeStyle = GRID_COLOR
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // 대각선 효과
      ctx.beginPath()
      for (let x = 0; x < canvas.width; x += GRID_SIZE) {
        for (let y = 0; y < canvas.height; y += GRID_SIZE) {
          ctx.moveTo(x, y)
          ctx.lineTo(x + GRID_SIZE / 2, y + GRID_SIZE / 2)
        }
      }
      ctx.strokeStyle = "rgba(51, 153, 255, 0.1)"
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    init()
    window.addEventListener("resize", init)
    return () => window.removeEventListener("resize", init)
  }, [])

  return (
    <div className="relative bg-zinc-950">
      <div className="h-[calc(100vh-16rem)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-950/95 to-zinc-950/90" />

        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="md:w-1/2 space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Guhyun Chung</h1>
                <p className="text-base text-zinc-400 font-medium max-w-lg">
                  Full Stack Developer &amp; Esports General Manager
                </p>
              </div>

              <div className="space-y-8">
                <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
                  Bridging technology and competitive gaming through innovative solutions. Focused on creating impactful
                  digital experiences that push the boundaries of what&apos;s possible in tech and esports.
                </p>

                <div className="flex items-center space-x-3">
                  <div className="relative flex-1 max-w-[240px]">
                    <input
                      type="text"
                      placeholder="Resume Destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full h-8 bg-zinc-900/50 text-sm rounded-md pl-3 pr-16
                             border border-zinc-800 focus:border-blue-600 focus:outline-none
                             transition-colors"
                    />
                    <button
                      type="submit"
                      className="absolute right-1 top-1 h-6 px-2 text-xs font-medium rounded
                             bg-blue-600 text-white hover:bg-blue-700
                             transition-colors inline-flex items-center"
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Send
                    </button>
                  </div>
                  <span className="text-sm text-zinc-500">or</span>
                  <a
                    href="/contact"
                    className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 flex items-center justify-center">
              <div className="w-full h-[500px]">
                <SplineScene />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection

