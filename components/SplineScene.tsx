"use client"

import type React from "react"

import { useEffect, useRef } from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "loading-anim-type"?: string
        url?: string
      }
    }
  }
}

export default function SplineScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Spline 스크립트 로드
    const script = document.createElement("script")
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.69/build/spline-viewer.js"
    script.type = "module"
    document.body.appendChild(script)

    // Shadow DOM이 로드된 후 스타일 적용
    const addStyleToShadowRoot = () => {
      const viewer = document.querySelector('spline-viewer')
      if (viewer && viewer.shadowRoot) {
        const style = document.createElement('style')
        style.textContent = `
          #logo, [href*="spline.design"], .spline-watermark {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
          }
        `
        viewer.shadowRoot.appendChild(style)
      }
    }

    // MutationObserver로 spline-viewer 요소 감시
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        addStyleToShadowRoot()
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      document.body.removeChild(script)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full">
      <spline-viewer
        loading-anim-type="none"
        url="https://prod.spline.design/CmlpEfKDaYiH0OTm/scene.splinecode"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}

