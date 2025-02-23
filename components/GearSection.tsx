"use client"

import { useState } from "react"
import { Camera, ExternalLink } from 'lucide-react'
import { Dialog, DialogContent } from "@/components/ui/dialog"

// 임시 장비 데이터
const gearSetups = [
  {
    id: 1,
    title: "Primary Photography",
    items: [
      { 
        name: "Sony A7M3", 
        category: "Camera Body",
        url: "https://www.bhphotovideo.com/c/product/1394217-REG/sony_ilce_7m3_alpha_a7_iii_mirrorless.html",
        site: "B&H Photo"
      },
      { 
        name: "SELP2870", 
        category: "Lens",
        url: "https://www.bhphotovideo.com/c/product/1029860-REG/sony_sel2870_28_70mm_f_3_5_5_6_fe_lens.html",
        site: "B&H Photo"
      },
      { name: "SEL85F18", category: "Lens" },
      { name: "Godox V860II", category: "Flash" },
    ],
  },
  {
    id: 2,
    title: "Primary Videography",
    items: [
      { name: "Sony A7S III", category: "Camera Body" },
      { name: "SEL24105G", category: "Lens" },
      { name: "RODE VideoMic Pro+", category: "Microphone" },
      { name: "DJI RS 2", category: "Gimbal" },
    ],
  },
  {
    id: 3,
    title: "Mobile Photography",
    items: [
      { name: "iPhone 13 Pro", category: "Camera" },
      { name: "Moment Wide Lens", category: "Lens" },
      { name: "DJI OM 5", category: "Gimbal" },
    ],
  },
  {
    id: 4,
    title: "Landscape Photography",
    items: [
      { name: "Canon EOS R5", category: "Camera Body" },
      { name: "RF 15-35mm f/2.8L IS USM", category: "Lens" },
      { name: "RF 24-70mm f/2.8L IS USM", category: "Lens" },
      { name: "Gitzo Traveler Tripod", category: "Tripod" },
    ],
  },
]

const GearSection = () => {
  const [selectedSetup, setSelectedSetup] = useState<typeof gearSetups[0] | null>(null)

  return (
    <section className="py-16 border-t border-zinc-800">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold">My Gear</h2>
            <p className="text-sm text-zinc-400">Equipment I use for photography and videography</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {gearSetups.map((setup) => (
            <button
              key={setup.id}
              onClick={() => setSelectedSetup(setup)}
              className="group p-4 rounded-lg bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 
                transition-all duration-200 text-left"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="w-4 h-4 text-zinc-500" />
                  <span className="text-xs text-zinc-400">{setup.items.length} items</span>
                </div>
                <h3 className="text-base font-medium group-hover:text-blue-400 transition-colors">
                  {setup.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedSetup} onOpenChange={() => setSelectedSetup(null)}>
        <DialogContent className="max-w-lg bg-zinc-900/95 border-zinc-800 backdrop-blur-sm">
          <div className="relative">
            <h3 className="text-xl font-semibold mb-6">{selectedSetup?.title}</h3>
            <div className="grid gap-4">
              {selectedSetup?.items.map((item, index) => (
                <a 
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50 
                    hover:border-blue-500/30 hover:bg-blue-500/5 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-zinc-400">{item.category}</span>
                    </div>
                    {item.url && (
                      <div className="flex items-center gap-2 text-zinc-400">
                        <span className="text-sm">{item.site}</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default GearSection
