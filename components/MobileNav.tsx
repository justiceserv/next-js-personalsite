"use client"

import { useState } from "react"
import { Menu, X, Search, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Logo from "./Logo"

interface MobileNavProps {
  navItems: {
    name: string
    href: string
  }[]
}

const MobileNav = ({ navItems }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 right-0 h-[80vh] bg-zinc-950 border-b border-zinc-800 z-50"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-2 px-4 border-b border-zinc-800">
                  <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                    <Logo />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="p-4">
                    <div className="relative mb-6">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full h-9 bg-zinc-900 text-sm font-normal rounded-lg pl-4 pr-10
                          border border-zinc-800 focus:border-blue-500 focus:outline-none
                          transition-all duration-200"
                      />
                      <Search className="absolute right-3 top-2.5 h-4 w-4 text-zinc-400" />
                    </div>

                    <div className="space-y-1">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`
                            block px-4 py-2 rounded-lg text-[15px] font-medium transition-colors
                            ${pathname === item.href 
                              ? "bg-blue-600/10 text-blue-500" 
                              : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"}
                          `}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-zinc-800">
                  <div className="flex items-center gap-x-2">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <button className="flex-1 h-9 text-[13px] font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNav 