"use client"

import Link from "next/link"
import { Monitor, Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const MiniDashboard = dynamic(() => import("./MiniDashboard"), { ssr: false })

const Footer = () => {
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system")

  useEffect(() => {
    // 테마 변경 로직 구현
    const root = window.document.documentElement
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.toggle("dark", systemTheme === "dark")
    } else {
      root.classList.toggle("dark", theme === "dark")
    }
  }, [theme])

  const footerLinks = {
    Learn: [
      { name: "Blog", href: "/blog" },
      { name: "Resume", href: "/resume" },
      { name: "Gallery", href: "/gallery" },
    ],
    Projects: [
      { name: "Infrastructure", href: "/infrastructure" },
      { name: "Motorsports", href: "/motorsports" },
      { name: "Contact", href: "/contact" },
    ],
    Resources: [
      { name: "Documentation", href: "/docs" },
      { name: "GitHub", href: "https://github.com" },
      { name: "LinkedIn", href: "https://linkedin.com" },
    ],
  }

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white">{category}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1 md:max-w-[300px] w-full">
            <MiniDashboard />
          </div>
        </div>
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-zinc-800 pt-8">
          <p className="text-sm text-zinc-400">© {new Date().getFullYear()} Guhyun Chung. All rights reserved.</p>
          <div className="flex items-center gap-2 rounded-full border border-zinc-700 p-1">
            <button
              onClick={() => setTheme("system")}
              className={`rounded-full p-1.5 ${
                theme === "system" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`rounded-full p-1.5 ${
                theme === "light" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sun className="h-4 w-4" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`rounded-full p-1.5 ${
                theme === "dark" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Moon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

