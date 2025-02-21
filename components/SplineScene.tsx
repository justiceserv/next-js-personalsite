"use client";

import { useEffect, useRef } from "react";

export default function SplineScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.69/build/spline-viewer.js";
    script.type = "module";
    document.body.appendChild(script);

    const addStyleToShadowRoot = () => {
      const viewer = document.querySelector("spline-viewer");
      if (viewer && viewer.shadowRoot) {
        const style = document.createElement("style");
        style.textContent = `
          #logo, [href*="spline.design"], .spline-watermark {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
          }
        `;
        viewer.shadowRoot.appendChild(style);
      }
    };

    const observer = new MutationObserver(() => addStyleToShadowRoot());
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.body.removeChild(script);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      {/* @ts-expect-error Non Typescript Component */}
      <spline-viewer loading-anim-type="none" url="https://prod.spline.design/CmlpEfKDaYiH0OTm/scene.splinecode" />
    </div>
  );
}