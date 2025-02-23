"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const photos = [
  "/images/Image-1.jpg",
  "/images/Image-2.jpg",
  "/images/Image-3.jpg",
  "/images/Image-4.jpg",
]

const GalleryHero = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[55vh] min-h-[500px] overflow-hidden pt-16">
      {/* 오버레이 - 배경색상만 유지 */}
      <div className="absolute inset-0 bg-zinc-950" />

      {/* 콘텐츠 */}
      <div className="relative h-full">
        <div className="container mx-auto px-6 md:px-12 max-w-[1400px] h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-8 items-center">
            {/* 왼쪽: 텍스트 */}
            <div className="space-y-4">
              <div className="space-y-3">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                  My Photographs
                </h1>
                <p className="text-base text-zinc-300 max-w-lg">
                  A collection of moments captured through my lens.
                </p>
                <div className="pt-2 flex flex-col gap-2 text-sm text-zinc-400">
                  <p>© 2024 All rights reserved.</p>
                  <p>
                    Interested in using these photos?{" "}
                    <a href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                      Contact me
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* 오른쪽: 사진 스택 */}
            <div className="relative h-[350px] w-full max-w-[400px] mx-auto pb-12">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out
                    ${index === currentPhotoIndex ? "opacity-100 translate-y-0 rotate-0" : 
                      index < currentPhotoIndex ? "opacity-0 -translate-y-full rotate-12" : 
                      "opacity-100 translate-y-6 rotate-3"}`}
                  style={{
                    zIndex: photos.length - index,
                  }}
                >
                  <div className="relative h-full w-full rounded-lg overflow-hidden border border-zinc-800">
                    <Image
                      src={photo}
                      alt={`Gallery photo ${index + 1}`}
                      fill
                      className="object-cover brightness-100"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-zinc-950/30" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GalleryHero 