"use client"

import { useState } from "react"
import Image from "next/image"

interface ServerInfo {
    id: string
    name: string
    location: string
    datacenter: string
    cpu: {
        model: string
        cores: number
        threads: number
    }
    ram: string
    storage: {
        type: string
        size: string
        model: string
    }[]
    status: "online" | "offline" | "maintenance"
    tags: string[]
    network: {
        capacity: string
        ixCapacity: string
        upstreams: string[]
        ixs: string[]
    }
    uptime: number
    networkUsage: number[]
}

const servers: ServerInfo[] = [
    {
        id: "1",
        name: "Web-01",
        location: "Toronto, CA",
        datacenter: "Equinix TR-2",
        cpu: {
            model: "Intel Xeon E5-2680 v4",
            cores: 14,
            threads: 28,
        },
        ram: "64 GB DDR4",
        storage: [
            { type: "SSD", size: "512 GB", model: "Samsung 970 PRO" },
            { type: "SSD", size: "1 TB", model: "Intel DC P4510" },
        ],
        status: "online",
        tags: ["Web", "Frontend"],
        network: {
            capacity: "10 Gbps",
            ixCapacity: "100 Gbps",
            upstreams: ["Cogent", "PCCW", "Arelion"],
            ixs: ["TorIX"],
        },
        uptime: 99.98,
        networkUsage: [65, 58, 62, 70, 55, 60, 63],
    },
    {
        id: "2",
        name: "DB-01",
        location: "Frankfurt, DE",
        datacenter: "Interxion FRA-1",
        cpu: {
            model: "Intel Xeon E5-2697 v4",
            cores: 18,
            threads: 36,
        },
        ram: "128 GB DDR4",
        storage: [
            { type: "NVMe", size: "1 TB", model: "Samsung 970 EVO" },
            { type: "NVMe", size: "2 TB", model: "Intel Optane 905P" },
        ],
        status: "online",
        tags: ["Database", "PostgreSQL"],
        network: {
            capacity: "10 Gbps",
            ixCapacity: "100 Gbps",
            upstreams: ["Telia", "Level3", "Cogent"],
            ixs: ["DE-CIX"],
        },
        uptime: 99.95,
        networkUsage: [78, 80, 75, 82, 79, 77, 81],
    },
    {
        id: "3",
        name: "Cache-01",
        location: "Singapore, SG",
        datacenter: "Digital Realty SIN-1",
        cpu: {
            model: "Intel Xeon E5-2680 v4",
            cores: 14,
            threads: 28,
        },
        ram: "32 GB DDR4",
        storage: [{ type: "SSD", size: "256 GB", model: "Samsung 860 EVO" }],
        status: "maintenance",
        tags: ["Cache", "Redis"],
        network: {
            capacity: "10 Gbps",
            ixCapacity: "100 Gbps",
            upstreams: ["SingTel", "Tata", "Telia"],
            ixs: ["SGIX"],
        },
        uptime: 99.9,
        networkUsage: [32, 35, 30, 33, 31, 34, 36],
    },
    {
        id: "4",
        name: "API-01",
        location: "London, UK",
        datacenter: "Telehouse North Two",
        cpu: {
            model: "Intel Xeon E5-2699 v4",
            cores: 22,
            threads: 44,
        },
        ram: "64 GB DDR4",
        storage: [
            { type: "SSD", size: "512 GB", model: "Samsung 860 PRO" },
            { type: "SSD", size: "1 TB", model: "Crucial MX500" },
        ],
        status: "online",
        tags: ["API", "Backend"],
        network: {
            capacity: "10 Gbps",
            ixCapacity: "100 Gbps",
            upstreams: ["BT", "Virgin", "Level3"],
            ixs: ["LINX"],
        },
        uptime: 99.99,
        networkUsage: [45, 48, 42, 46, 44, 47, 49],
    },
]

const ServerList = () => {
    const [selectedServer, setSelectedServer] = useState<(typeof servers)[0] | null>(null)

    const getStatusColor = (status: string) => {
        switch (status) {
            case "online":
                return "bg-green-500"
            case "offline":
                return "bg-red-500"
            case "maintenance":
                return "bg-yellow-500"
            default:
                return "bg-gray-500"
        }
    }

    return (
        <section className="pt-8 pb-16">
            <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
                <div className="flex items-center justify-between mb-6">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold">Server Infrastructure</h2>
                        <p className="text-sm text-zinc-400">Overview of our distributed server network</p>
                    </div>
                </div>

                <div className="flex gap-6">
                    <div className={`space-y-3 transition-all duration-300 ${selectedServer ? "w-1/3" : "w-full"}`}>
                        {servers.map((server) => (
                            <button
                                key={server.id}
                                className={`w-full p-4 rounded-lg bg-zinc-900/30 border text-left
                  ${selectedServer?.id === server.id
                                        ? "border-blue-500/30 bg-blue-500/5"
                                        : "border-zinc-800 hover:border-zinc-700"} 
                  transition-all duration-200`}
                                onClick={() => setSelectedServer(server)}
                            >
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`w-2 h-2 rounded-full ${getStatusColor(server.status)}`} />
                                            <h3 className="font-medium">{server.name}</h3>
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-sm text-zinc-400">{server.location}</p>
                                            <p className="text-xs text-zinc-500">{server.datacenter}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {server.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-0.5 text-xs rounded-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-400"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {selectedServer && (
                        <div className="flex-1">
                            <div className="rounded-lg bg-zinc-900/30 border border-zinc-800 p-6">
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-medium">{selectedServer.name}</h3>
                                        <p className="text-zinc-400">{selectedServer.location} · {selectedServer.datacenter}</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                                            <h4 className="text-sm text-zinc-400 mb-1">CPU</h4>
                                            <p className="font-medium">{selectedServer.cpu.model}</p>
                                            <p className="text-sm text-zinc-400 mt-1">
                                                {selectedServer.cpu.cores} cores, {selectedServer.cpu.threads} threads
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                                            <h4 className="text-sm text-zinc-400 mb-1">Memory</h4>
                                            <p className="font-medium">{selectedServer.ram}</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                                            <h4 className="text-sm text-zinc-400 mb-2">Storage</h4>
                                            <div className="space-y-1.5">
                                                {selectedServer.storage.map((drive, index) => (
                                                    <div key={index} className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium">
                                                                {drive.type} {drive.size}
                                                            </span>
                                                            <span className="text-xs text-zinc-500">({drive.model})</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-lg bg-zinc-800/50 border border-zinc-700/50 p-4 mb-6">
                                        <h4 className="font-medium mb-3">Network Configuration</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm text-zinc-400 mb-2">Upstreams</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedServer.network.upstreams.map((upstream, index) => (
                                                        <div key={index} className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800">
                                                            <Image
                                                                src={`/images/providers/${upstream.toLowerCase()}.svg`}
                                                                alt={upstream}
                                                                width={16}
                                                                height={16}
                                                                className="opacity-70"
                                                            />
                                                            <span className="text-sm">{upstream}</span>
                                                            <span className="text-xs text-zinc-500 border-l border-zinc-700 pl-3">
                                                                {selectedServer.network.capacity}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm text-zinc-400 mb-2">Internet Exchanges</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedServer.network.ixs.map((ix, index) => (
                                                        <div key={index} className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800">
                                                            <Image
                                                                src={`/images/ix/${ix.toLowerCase()}.svg`}
                                                                alt={ix}
                                                                width={16}
                                                                height={16}
                                                                className="opacity-70"
                                                            />
                                                            <span className="text-sm">{ix}</span>
                                                            <span className="text-xs text-zinc-500 border-l border-zinc-700 pl-3">
                                                                {selectedServer.network.ixCapacity}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                                            <h4 className="text-sm text-zinc-400 mb-3">System Uptime</h4>
                                            <div className="flex items-center justify-between">
                                                <div className="relative w-16 h-16">
                                                    <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
                                                        <circle
                                                            className="text-zinc-700/30 stroke-current"
                                                            strokeWidth="12"
                                                            cx="50"
                                                            cy="50"
                                                            r="40"
                                                            fill="transparent"
                                                        />
                                                        <circle
                                                            className="text-emerald-500 progress-ring__circle stroke-current"
                                                            strokeWidth="12"
                                                            strokeLinecap="round"
                                                            cx="50"
                                                            cy="50"
                                                            r="40"
                                                            fill="transparent"
                                                            strokeDasharray={`${2 * Math.PI * 40}`}
                                                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - selectedServer.uptime / 100)}`}
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="space-y-1 text-right">
                                                    <div className="text-2xl font-bold tabular-nums">{selectedServer.uptime}%</div>
                                                    <div className="text-sm text-zinc-400">Last 30 days</div>
                                                    <div className="text-xs text-zinc-500">Total downtime: 1h 23m</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                                            <h4 className="text-sm text-zinc-400 mb-3">Network Usage</h4>
                                            <div className="flex gap-6">
                                                <div className="flex-1 h-[72px]">
                                                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                                                        <g className="text-zinc-800">
                                                            {[0, 1, 2, 3].map((i) => (
                                                                <line
                                                                    key={i}
                                                                    x1="0"
                                                                    y1={i * 10}
                                                                    x2="100"
                                                                    y2={i * 10}
                                                                    strokeWidth="0.5"
                                                                    stroke="currentColor"
                                                                />
                                                            ))}
                                                        </g>
                                                        <polyline
                                                            points={selectedServer.networkUsage
                                                                .map((value, index) => `${(index / (selectedServer.networkUsage.length - 1)) * 100},${40 - (value / 100) * 40}`)
                                                                .join(" ")}
                                                            fill="none"
                                                            stroke="#22c55e"
                                                            strokeWidth="2"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="space-y-2">
                                                    <div>
                                                        <div className="text-xs text-zinc-400">Peak Usage</div>
                                                        <div className="text-sm font-medium tabular-nums">
                                                            {(Math.max(...selectedServer.networkUsage) / 10).toFixed(1)} Gbps
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-zinc-400">95th Percentile</div>
                                                        <div className="text-sm font-medium tabular-nums">
                                                            {(Math.floor(selectedServer.networkUsage.sort((a, b) => b - a)[Math.floor(selectedServer.networkUsage.length * 0.05)]) / 10).toFixed(1)} Gbps
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ServerList

