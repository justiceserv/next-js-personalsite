import Navbar from "@/components/Navbar"
import ClientWrapper from "@/components/ClientWrapper"
import InfrastructureHero from "@/components/InfrastructureHero"
import ServerList from "@/components/ServerList"
import OngoingIssues from "@/components/OngoingIssues"

export default function InfrastructurePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <InfrastructureHero />
      <ServerList />
      <OngoingIssues />
      <ClientWrapper />
    </main>
  )
}

