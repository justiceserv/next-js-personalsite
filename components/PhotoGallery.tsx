"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

// 임시 사진 데이터
const photos = [
  {
    id: 1,
    title: "Central Park in Spring",
    description: "A peaceful morning at Central Park, capturing the interaction between people and their pets. The early spring atmosphere brings a unique warmth to the scene.",
    image: "/images/Image-1.jpg",
    camera: "Sony A7M3",
    lens: "SELP2870",
    location: "Central Park, New York",
    postProcessing: "Lightroom",
    jpegUrl: "#",
    rawUrl: "#",
  },
  // ... 더 많은 사진 추가
]

interface PhotoModalProps {
  photo: (typeof photos)[0]
  isOpen: boolean
  onClose: () => void
}

const PhotoModal = ({ photo, isOpen, onClose }: PhotoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-zinc-900/95 border-zinc-800 backdrop-blur-lg p-0 overflow-hidden">
        {/* 이미지 섹션 */}
        <div className="relative h-[600px] overflow-hidden">
          <Image 
            src={photo.image || "/placeholder.svg"} 
            alt={photo.title} 
            fill 
            className="object-cover"
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent" />
          <div className="absolute bottom-8 left-8 space-y-2 max-w-2xl">
            <h2 className="text-2xl font-semibold text-white">{photo.title}</h2>
            <p className="text-sm text-zinc-300">{photo.description}</p>
          </div>
        </div>

        <div className="p-8 pt-6 space-y-7">
          {/* 메타데이터 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30 backdrop-blur-sm">
              <div className="text-sm text-zinc-400">Camera</div>
              <div className="font-medium">{photo.camera}</div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30 backdrop-blur-sm">
              <div className="text-sm text-zinc-400">Lens</div>
              <div className="font-medium">{photo.lens}</div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30 backdrop-blur-sm">
              <div className="text-sm text-zinc-400">Location</div>
              <div className="font-medium">{photo.location}</div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30 backdrop-blur-sm">
              <div className="text-sm text-zinc-400">Post-processing</div>
              <div className="font-medium">{photo.postProcessing}</div>
            </div>
          </div>

          {/* 다운로드 버튼 */}
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1 py-2 bg-zinc-800/30 border-zinc-700/30 hover:bg-blue-500/10 hover:border-blue-500/30 
                hover:text-blue-400 transition-all duration-200"
              onClick={() => window.open(photo.jpegUrl, "_blank")}
            >
              <Download className="w-4 h-4 mr-2" />
              Download JPEG
            </Button>
            <Button 
              variant="outline"
              className="flex-1 py-3 bg-zinc-800/30 border-zinc-700/30 hover:bg-emerald-500/10 hover:border-emerald-500/30 
                hover:text-emerald-400 transition-all duration-200"
              onClick={() => window.open(photo.rawUrl, "_blank")}
            >
              <Download className="w-4 h-4 mr-2" />
              Download RAW
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[0] | null>(null)

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">Gallery</h2>
            <p className="text-sm text-zinc-400">A collection of my favorite shots</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group border border-zinc-800"
            >
              <Image
                src={photo.image || "/placeholder.svg"}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-sm font-medium text-white">{photo.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </section>
  )
}

export default PhotoGallery

