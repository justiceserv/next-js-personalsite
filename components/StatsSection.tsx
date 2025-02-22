"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Terminal, GitBranch, Code, Star, GitFork, Clock, Activity, Zap } from "lucide-react"

const StatsSection = () => {
  const [contributions, setContributions] = useState<number[][]>([])

  useEffect(() => {
    const generateContributions = () => {
      const data = []
      for (let i = 0; i < 52; i++) {
        const week = []
        for (let j = 0; j < 7; j++) {
          week.push(Math.floor(Math.random() * 4))
        }
        data.push(week)
      }
      setContributions(data)
    }

    generateContributions()
  }, [])

  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        <div className="flex flex-col md:flex-row gap-8 min-h-[600px]">
          {/* Left Column */}
          <div className="md:w-[65%] flex flex-col gap-4">
            {/* Yearly Contributions */}
            <div className="border border-zinc-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Yearly Contributions</h2>
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <span>Less</span>
                  <div className="flex space-x-1">
                    {[0, 1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`w-2.5 h-2.5 rounded-sm ${
                          level === 0
                            ? "bg-zinc-800"
                            : level === 1
                            ? "bg-emerald-900"
                            : level === 2
                            ? "bg-emerald-700"
                            : "bg-emerald-500"
                        }`}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
              
              <div className="grid grid-cols-52 gap-0.5">
                {contributions.map((week, i) => (
                  <div key={i} className="grid grid-rows-7 gap-0.5">
                    {week.map((day, j) => (
                      <motion.div
                        key={`${i}-${j}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (i * 7 + j) * 0.0005 }}
                        className={`w-2.5 h-2.5 rounded-sm ${
                          day === 0
                            ? "bg-zinc-800"
                            : day === 1
                            ? "bg-emerald-900"
                            : day === 2
                            ? "bg-emerald-700"
                            : "bg-emerald-500"
                        }`}
                        title={`${day} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Most Active Repo - 높이 늘림 */}
            <div className="flex-1 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <GitBranch className="w-5 h-5 text-zinc-400" />
                <h3 className="text-lg font-medium">Most Active Repo</h3>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xl font-semibold">personal-website</p>
                    <p className="text-sm text-zinc-400 mt-1">Personal portfolio website built with Next.js</p>
                    <div className="flex items-center space-x-3 mt-3">
                      <span className="text-xs px-2 py-1 border border-zinc-800 rounded-full">TypeScript</span>
                      <span className="text-xs px-2 py-1 border border-zinc-800 rounded-full">Next.js</span>
                      <span className="text-xs px-2 py-1 border border-zinc-800 rounded-full">Tailwind</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 text-zinc-400">
                    <div className="text-right">
                      <p className="text-sm font-medium">847</p>
                      <p className="text-xs">commits</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">156</p>
                      <p className="text-xs">stars</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">24</p>
                      <p className="text-xs">PRs</p>
                    </div>
                  </div>
                </div>
                
                {/* 추가된 섹션들 */}
                <div className="border-t border-zinc-800 pt-6">
                  <h4 className="text-sm font-medium mb-4">Recent Commits</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-zinc-400">Add company logos section with infinite scroll</p>
                      <span className="text-xs text-zinc-500">2h ago</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-zinc-400">Implement dark mode toggle with system preference</p>
                      <span className="text-xs text-zinc-500">5h ago</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-zinc-400">Fix mobile navigation menu animation</p>
                      <span className="text-xs text-zinc-500">8h ago</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-zinc-800 pt-6">
                  <h4 className="text-sm font-medium mb-4">Contributors</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full border border-zinc-800" />
                    <div className="w-8 h-8 rounded-full border border-zinc-800" />
                    <div className="w-8 h-8 rounded-full border border-zinc-800" />
                    <span className="text-sm text-zinc-400">+2 more</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:w-[35%]">
            <div className="border border-zinc-800 rounded-xl p-6 h-full">
              <div className="flex items-center space-x-3 mb-8">
                <Terminal className="w-5 h-5 text-zinc-400" />
                <h3 className="text-lg font-medium">Contribution Stats</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-zinc-400">
                    <Code className="w-4 h-4" />
                    <span className="text-sm">Commits</span>
                  </div>
                  <p className="text-2xl font-bold">8.2</p>
                  <p className="text-xs text-zinc-500">daily average</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-zinc-400">
                    <Activity className="w-4 h-4" />
                    <span className="text-sm">Contributions</span>
                  </div>
                  <p className="text-2xl font-bold">2,847</p>
                  <p className="text-xs text-zinc-500">this year</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-zinc-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Streak</span>
                  </div>
                  <p className="text-2xl font-bold">342</p>
                  <p className="text-xs text-zinc-500">days</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-zinc-400">
                    <GitBranch className="w-4 h-4" />
                    <span className="text-sm">Repositories</span>
                  </div>
                  <p className="text-2xl font-bold">127</p>
                  <p className="text-xs text-zinc-500">contributed</p>
                </div>
              </div>

              {/* 추가 통계 */}
              <div className="space-y-4 border-t border-zinc-800 pt-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-zinc-400">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">Stars Earned</span>
                  </div>
                  <p className="text-lg font-semibold">1.2k</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-zinc-400">
                    <GitFork className="w-4 h-4" />
                    <span className="text-sm">Total Forks</span>
                  </div>
                  <p className="text-lg font-semibold">486</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-zinc-400">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">Lines Changed</span>
                  </div>
                  <p className="text-lg font-semibold">142.5k</p>
                </div>
              </div>

              {/* 최근 활동 시간대 */}
              <div className="border-t border-zinc-800 mt-6 pt-6">
                <h4 className="text-sm font-medium mb-4">Active Hours</h4>
                <div className="h-24 flex items-end space-x-1">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const height = Math.random() * 100;
                    return (
                      <div
                        key={i}
                        className="flex-1 bg-emerald-500/20 hover:bg-emerald-300 rounded-sm transition-all duration-300 cursor-pointer group relative"
                        style={{
                          height: `${height}%`,
                        }}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                          <div className="bg-zinc-800 text-zinc-200 text-xs px-2 py-1 rounded shadow-lg">
                            {`${i}:00 - ${i + 1}:00`}
                            <br />
                            {`${Math.round(height)}% activity`}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-2 text-xs text-zinc-500">
                  <span>12 AM</span>
                  <span>12 PM</span>
                  <span>11 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection

