import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Guhyun Chung - Personal Website",
  description: "Software Engineer, Amateur Racer, and Technology Enthusiast",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>{children}</body>
      <script async={true}
          dangerouslySetInnerHTML={{
            __html: `
              const removeSplineLogo = () => {
                const logo = document.querySelector('#logo');
                if (logo) logo.remove();
              };
              
              // DOM이 로드된 후 실행
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', removeSplineLogo);
              } else {
                removeSplineLogo();
              }
              
              // MutationObserver를 사용하여 동적으로 추가되는 로고도 제거
              const observer = new MutationObserver((mutations) => {
                mutations.forEach(() => {
                  const logo = document.querySelector('#logo');
                  if (logo) logo.remove();
                });
              });
              
              observer.observe(document.body, {
                childList: true,
                subtree: true
              });
            `,
          }}
        />
    </html>
  )
}

