"use client"

import { useState, useEffect } from "react"
import { Server } from "lucide-react"

type ServerInfo = {
  name: string
  status: "online" | "offline"
  latency: number
}

const ServerStatus = () => {
  const [serverInfo, setServerInfo] = useState<ServerInfo>({
    name: "Unknown",
    status: "offline",
    latency: 0,
  })

  useEffect(() => {
    const fetchServerInfo = async () => {
      // 실제 구현에서는 이 부분을 서버에서 정보를 가져오는 API 호출로 대체해야 합니다.
      // 여기서는 예시로 랜덤한 값을 생성합니다.
      const mockServerInfo: ServerInfo = {
        name: "Production-01",
        status: Math.random() > 0.1 ? "online" : "offline",
        latency: Math.floor(Math.random() * 100),
      }
      setServerInfo(mockServerInfo)
    }

    fetchServerInfo()
    const interval = setInterval(fetchServerInfo, 30000) // 30초마다 업데이트

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center space-x-2 text-sm">
      <Server className="h-4 w-4" />
      <span className="font-medium">{serverInfo.name}</span>
      <span
        className={`inline-block w-2 h-2 rounded-full ${
          serverInfo.status === "online" ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <span className="text-zinc-400">{serverInfo.latency}ms</span>
    </div>
  )
}

export default ServerStatus

