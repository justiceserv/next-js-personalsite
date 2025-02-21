"use client"

import { useEffect, useRef } from "react"

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
      src: "https://cdn.prod.website-files.com/6793f5bd8158c3d139f4b7a6/67941f364f95e86b907a031a_Cloudflare_Logo.svg",
      alt: "Cloudflare",
    },
    {
      src: "https://cdn.prod.website-files.com/6793f5bd8158c3d139f4b7a6/679419e0ea571dd52398273d_4096_rect.svg",
      alt: "4096",
    },
    {
      src: "https://cdn.prod.website-files.com/6793f5bd8158c3d139f4b7a6/67940bb5ecf3e86864ae704d_netease-games-logo-brandlogos.net_2c92375l0.svg",
      alt: "NetEase Games",
    },
    {
      src: "https://cdn.prod.website-files.com/6793f5bd8158c3d139f4b7a6/67940c46d144d49b1755f34c_blizzard_ent_logo.svg",
      alt: "Blizzard Entertainment",
    },
    {
      src: "https://cdn.prod.website-files.com/6793f5bd8158c3d139f4b7a6/67940d1f97780011603bd217_PUBG_Studios.svg",
      alt: "PUBG Studios",
    },
    {
      src: "https://cdn.prod.website-files.com/6793f5bd8158c3d139f4b7a6/67940dc70e9c9c1a7788c91c_Ubisoft_Logo.svg",
      alt: "Ubisoft",
    },
    {
      src: "https://cdn.prod.website-files.com/6793f5bd8158c3d139f4b7a6/67940f40b24733bac1dc0aae_Blast_Tv_Logo.svg",
      alt: "BLAST TV",
    },
    {
      src: "https://cdn.prod.website-files.com/6793f5bd8158c3d139f4b7a6/67941104be3c794a5b3128fd_be4d40e2d90d51f099818cbbca904e1e_Daejeon_Logo.webp",
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
                  <img
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    className="h-8 w-auto object-contain opacity-50 max-w-[120px] grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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

