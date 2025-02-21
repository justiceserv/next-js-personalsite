"use client"

import { useEffect, useRef } from "react"
import Image from 'next/image'

const CompanyLogos = () => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollContent = scrollContainer.firstElementChild as HTMLElement
    if (!scrollContent) return

    const scrollAnimation = () => {
      if (scrollContainer.scrollLeft >= scrollContent.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += 0.5
      }
    }

    const animationId = setInterval(scrollAnimation, 30)

    return () => clearInterval(animationId)
  }, [])

  const logos = [
    {
      src: "/logos/Cloudflare_Logo.svg",
      alt: "Cloudflare",
    },
    {
      src: "/logos/4096_rect.svg",
      alt: "4096",
    },
    {
      src: "/logos/NetEase_Logo.svg",
      alt: "NetEase Games",
    },
    {
      src: "/logos/Blizzard_Ent_Logo.svg",
      alt: "Blizzard Entertainment",
    },
    {
      src: "/logos/PUBG_Studios.svg",
      alt: "PUBG Studios",
    },
    {
      src: "/logos/Ubisoft_Logo.svg",
      alt: "Ubisoft",
    },
    {
      src: "/logos/BlastTV_Logo.svg",
      alt: "BLAST TV",
    },
    {
      src: "/logos/Daejeon_Logo.webp",
      alt: "Daejeon",
    },
  ]

  return (
    <section className="relative bg-zinc-950/50 py-14">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px] pt-0 pb-32">
        <h3 className="text-sm font-medium mb-12 text-center text-white">Worked With</h3>
        <div className="relative">
          {/* Left gradient overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
          
          <div className="overflow-hidden" ref={scrollRef}>
            <div className="flex animate-scroll whitespace-nowrap">
              {[...logos, ...logos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 px-12">
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    width={120}
                    height={32}
                    className="h-8 w-auto object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right gradient overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}

export default CompanyLogos

