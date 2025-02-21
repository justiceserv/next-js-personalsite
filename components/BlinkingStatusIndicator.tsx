"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface BlinkingStatusIndicatorProps {
  status: "online" | "offline"
}

const BlinkingStatusIndicator: React.FC<BlinkingStatusIndicatorProps> = ({ status }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={`inline-block w-2 h-2 rounded-full transition-opacity duration-300 ${
        status === "online" ? "bg-green-500" : "bg-red-500"
      } ${isVisible ? "opacity-100" : "opacity-50"}`}
    />
  )
}

export default BlinkingStatusIndicator

