"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Github, Linkedin } from "lucide-react"
import MobileNav from "./MobileNav"

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-white">
    <path
      fill="currentColor"
      d="M18.69 2.319a3.868 3.868 0 0 0-3.108 1.547l-.759 1.007a1.658 1.658 0 0 1-1.313.656H0V21.68h5.296a3.87 3.87 0 0 0 3.108-1.547l.759-1.006a1.656 1.656 0 0 1 1.313-.657H24V2.319zm1.108 11.949h-5.66a3.87 3.87 0 0 0-3.108 1.547l-.759 1.007a1.658 1.658 0 0 1-1.313.656H4.202V9.731h5.661a3.868 3.868 0 0 0 3.107-1.547l.759-1.006a1.658 1.658 0 0 1 1.313-.657h4.771z"
    />
  </svg>
)

const Navbar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Blog", href: "/blog" },
    { name: "Resume", href: "/resume" },
    { name: "Gallery", href: "/gallery" },
    { name: "Infrastructure", href: "/infrastructure" },
    { name: "Motorsports", href: "/motorsports" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className={`
        w-full
        ${isScrolled ? "md:container md:mx-auto md:max-w-[1400px]" : ""}
      `}>
        <div className={`
          transition-all duration-300 ease-in-out
          ${isScrolled 
            ? "md:mt-2 md:bg-zinc-950/80 md:backdrop-blur-md md:shadow-lg md:rounded-lg bg-zinc-950" 
            : "bg-zinc-950"
          }
          border-b border-zinc-800/50
        `}>
          <nav className={`
            px-6
            ${isScrolled 
              ? "md:px-6 md:px-12" 
              : "md:container md:mx-auto md:px-12 md:max-w-[1400px]"
            }
          `}>
            <div className="flex h-12 items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="flex items-center mr-6">
                  <Logo />
                </Link>

                <div className="hidden md:flex space-x-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-colors
                        ${pathname === item.href ? "text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"}
                      `}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className={`
                        h-7 bg-zinc-900 text-[13px] font-normal rounded-md pl-3 pr-8
                        border border-zinc-800 focus:border-primary-400 focus:outline-none
                        transition-all duration-300 ease-in-out
                        ${isSearchFocused ? "w-48" : "w-28"}
                      `}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                    <Search className="absolute right-2 top-1.5 h-4 w-4 text-zinc-400" />
                  </div>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-7 w-7 rounded-md border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-7 w-7 rounded-md border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <button className="group h-7 px-4 text-[13px] font-medium rounded-md bg-blue-600 border border-blue-600 hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-200 ease-in-out">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white group-hover:from-blue-400 group-hover:to-blue-600 transition-all duration-200 ease-in-out">
                      Login
                    </span>
                  </button>
                </div>
                <MobileNav navItems={navItems} />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
