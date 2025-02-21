"use client"

import { useState, useEffect } from "react"
import { Server, Clock, Cpu, Activity } from "lucide-react"
import CircularProgress from "./CircularProgress"
import BlinkingStatusIndicator from "./BlinkingStatusIndicator"

type ServerInfo = {
  name: string
  status: "online" | "offline"
  cpu: number
  uptime: number
  ping: number
  network: number // Mbps
}

const MiniDashboard = () => {
  const [serverInfo, setServerInfo] = useState<ServerInfo>({
    name: "Unknown",
    status: "offline",
    cpu: 0,
    uptime: 0,
    ping: 0,
    network: 0,
  })

  useEffect(() => {
    const fetchServerInfo = async () => {
      // 실제 구현에서는 이 부분을 서버에서 정보를 가져오는 API 호출로 대체해야 합니다.
      const mockServerInfo: ServerInfo = {
        name: "Production-01",
        status: Math.random() > 0.1 ? "online" : "offline",
        cpu: Math.floor(Math.random() * 100),
        uptime: Math.floor(Math.random() * 100),
        ping: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 1000), // 0-1000 Mbps
      }
      setServerInfo(mockServerInfo)
    }

    fetchServerInfo()
    const interval = setInterval(fetchServerInfo, 30000)
    return () => clearInterval(interval)
  }, [])

  const networkPercentage = Math.min(Math.round((serverInfo.network / 1000) * 100), 100)

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 shadow-lg">
      <h3 className="text-sm font-semibold text-white mb-4">Connected To:</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Server className="h-4 w-4 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-300">{serverInfo.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-xs ${serverInfo.status === "online" ? "text-green-500" : "text-red-500"}`}>
              {serverInfo.ping}ms
            </span>
            <BlinkingStatusIndicator status={serverInfo.status} />
          </div>
        </div>
        <div className="flex items-start justify-between space-x-2">
          <div className="flex flex-col items-center">
            <CircularProgress percentage={serverInfo.uptime} color="text-green-500" />
            <div className="mt-2 flex items-center text-xs text-zinc-400">
              <Clock className="h-3 w-3 mr-1" />
              Uptime
            </div>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgress percentage={serverInfo.cpu} color="text-blue-500" />
            <div className="mt-2 flex items-center text-xs text-zinc-400">
              <Cpu className="h-3 w-3 mr-1" />
              CPU
            </div>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgress percentage={networkPercentage} color="text-purple-500" />
            <div className="mt-2 flex items-center text-xs text-zinc-400">
              <Activity className="h-3 w-3 mr-1" />
              {serverInfo.network} Mbps
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniDashboard

