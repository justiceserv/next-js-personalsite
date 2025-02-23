import BlogSplineScene from "./BlogSplineScene"

const BlogHero = () => {
  return (
    <section className="relative h-[50vh] md:h-[70vh] min-h-[400px] md:min-h-[600px] overflow-hidden border-b border-zinc-800">
      {/* Spline 배경 */}
      <div className="absolute inset-0">
        <BlogSplineScene className="w-full h-full" />
      </div>

      {/* 오버레이 - 모바일에서 더 진하게 */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/50 to-zinc-950/90 md:from-zinc-950/40 md:via-zinc-950/30 md:to-zinc-950/90" />

      {/* 콘텐츠 */}
      <div className="relative h-full">
        <div className="container mx-auto px-6 md:px-12 max-w-[1400px] h-full">
          <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto text-center">
            <div className="space-y-4 md:space-y-6">
              <p className="text-sm text-blue-500 font-medium tracking-wide uppercase drop-shadow-lg">Blog</p>
              <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-2 md:mb-4 drop-shadow-lg">Stories & Insights</h1>
              <p className="text-base md:text-xl text-zinc-200 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                Exploring technology, development, and the future of digital innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogHero

