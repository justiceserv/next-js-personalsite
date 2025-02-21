"use client"

import { useEffect, useRef } from "react"

const GithubContributions = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const totalCommits = 2847 // 예시 데이터
  const averageDaily = Math.round(totalCommits / 365) // 연간 커밋을 365일로 나눔

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        const days = 365
        const cols = 53
        const rows = 7
        const cellSize = 10
        const cellGap = 2
        const cornerRadius = 2

        ctx.canvas.width = cols * (cellSize + cellGap)
        ctx.canvas.height = rows * (cellSize + cellGap)

        // 배경색 투명하게
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        for (let i = 0; i < days; i++) {
          const col = Math.floor(i / 7)
          const row = i % 7
          const x = col * (cellSize + cellGap)
          const y = row * (cellSize + cellGap)

          // Random contribution level (0-4)
          const level = Math.floor(Math.random() * 5)

          const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
            ctx.beginPath()
            ctx.moveTo(x + r, y)
            ctx.arcTo(x + w, y, x + w, y + h, r)
            ctx.arcTo(x + w, y + h, x, y + h, r)
            ctx.arcTo(x, y + h, x, y, r)
            ctx.arcTo(x, y, x + w, y, r)
            ctx.closePath()
          }

          ctx.fillStyle = [
            "#27272a", // zinc-800 for empty cells
            "#9be9a8",
            "#40c463",
            "#30a14e",
            "#216e39",
          ][level]

          roundRect(x, y, cellSize, cellSize, cornerRadius)
          ctx.fill()
        }
      }
    }
  }, [])

  return (
    <div className="grid grid-cols-[1fr,auto] gap-8 items-start">
      <div>
        <canvas ref={canvasRef} />
      </div>
      <div className="space-y-6 min-w-[200px]">
        <div className="space-y-2">
          <div className="text-sm text-zinc-400">Yearly Commits</div>
          <div className="text-3xl font-bold">{totalCommits.toLocaleString()}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-zinc-400">Average Daily</div>
          <div className="text-3xl font-bold">{averageDaily}</div>
        </div>
      </div>
    </div>
  )
}

export default GithubContributions

