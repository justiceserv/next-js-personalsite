import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import ProjectSection from "@/components/ProjectSection"
import StatsSection from "@/components/StatsSection"
import ClientWrapper from "@/components/ClientWrapper"
import CompanyLogos from "@/components/CompanyLogos"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <HeroSection />
      <CompanyLogos />
      <StatsSection />
      <ProjectSection />
      <ClientWrapper />
    </main>
  )
}

