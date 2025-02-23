"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface Issue {
  id: string
  title: string
  severity: "critical" | "high" | "medium" | "low"
  status: "investigating" | "identified" | "monitoring" | "resolved"
  services: string[]
  startTime: string
  description: string
}

const issues: Issue[] = [
  {
    id: "1",
    title: "High latency in EU region",
    severity: "high",
    status: "investigating",
    services: ["API Gateway", "CDN"],
    startTime: "2024-02-23T10:30:00Z",
    description: "Users in EU region experiencing increased latency. Investigation ongoing.",
  },
  {
    id: "2",
    title: "Database replication lag",
    severity: "medium",
    status: "identified",
    services: ["PostgreSQL"],
    startTime: "2024-02-23T09:15:00Z",
    description: "Increased replication lag detected between primary and secondary nodes.",
  },
  {
    id: "3",
    title: "Cache hit ratio degradation",
    severity: "low",
    status: "monitoring",
    services: ["Redis", "CDN"],
    startTime: "2024-02-23T08:45:00Z",
    description: "Cache hit ratio dropped below threshold. Monitoring for improvement.",
  },
]

const OngoingIssues = () => {
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null)

  const getSeverityColor = (severity: Issue["severity"]) => {
    switch (severity) {
      case "critical":
        return "text-red-500"
      case "high":
        return "text-orange-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-blue-500"
      default:
        return "text-zinc-500"
    }
  }

  const getStatusColor = (status: Issue["status"]) => {
    switch (status) {
      case "investigating":
        return "text-orange-500"
      case "identified":
        return "text-yellow-500"
      case "monitoring":
        return "text-blue-500"
      case "resolved":
        return "text-green-500"
      default:
        return "text-zinc-500"
    }
  }

  const getTimeDiff = (startTime: string) => {
    const diff = new Date().getTime() - new Date(startTime).getTime()
    const minutes = Math.floor(diff / 1000 / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Ongoing Issues</h2>
            <p className="text-sm text-zinc-400">Current alerts and maintenance</p>
          </div>
        </div>

        <div className="space-y-4">
          {issues.map((issue) => (
            <motion.div
              key={issue.id}
              className="border border-zinc-800 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-4 h-4 ${getSeverityColor(issue.severity)}`} />
                      <h3 className="font-medium">{issue.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`font-medium ${getStatusColor(issue.status)}`}>
                        {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                      </span>
                      <span className="text-zinc-400">
                        <Clock className="w-3 h-3 inline-block mr-1" />
                        {getTimeDiff(issue.startTime)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {issue.services.map((service) => (
                      <span key={service} className="px-2 py-1 text-xs bg-zinc-800 text-zinc-300 rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {expandedIssue === issue.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-zinc-800 p-4 text-sm text-zinc-400"
                >
                  <p className="mb-4">{issue.description}</p>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition-colors">
                      Subscribe to Updates
                    </button>
                    {issue.status === "resolved" && (
                      <span className="flex items-center text-green-500">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Resolved
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OngoingIssues

