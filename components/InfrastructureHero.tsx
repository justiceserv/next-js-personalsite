"use client"

import { useState, useEffect, useRef } from "react"

const InfrastructureHero = () => {
  const [serverInfo, setServerInfo] = useState({
    name: "Unknown",
    ping: 0,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.type = "module"
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.69/build/spline-viewer.js"
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    const fetchServerInfo = () => {
      setServerInfo({
        name: "Production-01",
        ping: Math.floor(Math.random() * 100),
      })
    }

    fetchServerInfo()
    const interval = setInterval(fetchServerInfo, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[400px] border-b border-zinc-800 overflow-hidden">
      {" "}
      {/* 높이를 400px로 증가 */}
      {/* Spline Background */}
      <div className="absolute inset-0">
        {/* @ts-expect-error Non Typescript Component */}
        <spline-viewer
          loading-anim-type="none"
          url="https://prod.spline.design/xOaXjFf2mLTx70RR/scene.splinecode"
          className="w-full h-full"
        />
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
      </div>
      {/* Content */}
      <div className="relative h-full container mx-auto px-6 md:px-12 max-w-[1400px]">
        <div className="h-full flex flex-col justify-center pt-24 pb-16">
          {" "}
          {/* 상하단 패딩도 함께 증가 */}
          <div ref={containerRef} className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-3">Infrastructure</h1> {/* 제목 크기 증가 및 마진 조정 */}
            <p className="text-base text-zinc-400 mb-6">
              {" "}
              {/* 설명 텍스트 크기 증가 및 마진 조정 */}
              Brief Dashboard of my IT Infrastructure & AS401450 Pluxcon Network
            </p>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-3 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <span className="text-sm font-medium text-zinc-300">Connected to {serverInfo.name}</span>
                <span className="text-xs text-zinc-500 border-l border-zinc-700 pl-3">
                  {serverInfo.ping}ms
                </span>
                <div className={`w-1.5 h-1.5 rounded-full ${serverInfo.ping < 50 ? 'bg-green-500' : serverInfo.ping < 100 ? 'bg-yellow-500' : 'bg-red-500'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfrastructureHero

