import Navbar from "@/components/Navbar"
import ClientWrapper from "@/components/ClientWrapper"
import GalleryHero from "@/components/GalleryHero"
import GearSection from "@/components/GearSection"
import PhotoGallery from "@/components/PhotoGallery"

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <GalleryHero />
      <div className="py-8">
        <GearSection />
        <PhotoGallery />
      </div>
      <ClientWrapper />
    </main>
  )
}

