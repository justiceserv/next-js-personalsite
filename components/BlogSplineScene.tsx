"use client"

import type React from "react"
import { useEffect, useRef } from "react"

// namespace 대신 interface 직접 선언
interface SplineViewerElement extends HTMLElement {
    "loading-anim-type"?: string
    url?: string
}

declare global {
    interface HTMLElementTagNameMap {
        "spline-viewer": SplineViewerElement
    }
}

interface BlogSplineSceneProps {
    className?: string
}

const BlogSplineScene: React.FC<BlogSplineSceneProps> = ({ className }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const script = document.createElement("script")
        script.type = "module"
        script.src = "https://unpkg.com/@splinetool/viewer@1.9.69/build/spline-viewer.js"
        document.body.appendChild(script)

        const addStyleToShadowRoot = () => {
            const viewer = document.querySelector("spline-viewer")
            if (viewer && viewer.shadowRoot) {
                const style = document.createElement("style")
                style.textContent = `
                    #logo, [href*="spline.design"], .spline-watermark {
                        display: none !important;
                        opacity: 0 !important;
                        visibility: hidden !important;
                    }
                    canvas {
                        width: 100% !important;
                        height: 100% !important;
                        opacity: 1 !important;
                        object-fit: cover !important;
                    }
                `
                viewer.shadowRoot.appendChild(style)
            }
        }

        const observer = new MutationObserver(() => addStyleToShadowRoot())
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
        <div ref={containerRef} className={`absolute inset-0 ${className}`}>
            {/* @ts-expect-error Non Typescript Component */}
            <spline-viewer
                loading-anim-type="none"
                url="https://prod.spline.design/xOaXjFf2mLTx70RR/scene.splinecode"
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    opacity: "1",
                }}
            />
        </div>
    )
}

export default BlogSplineScene

