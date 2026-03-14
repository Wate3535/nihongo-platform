"use client"

type VideoPlayerProps = {
  title: string
  videoId: string
}

export function VideoPlayer({ title, videoId }: VideoPlayerProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-foreground/95">

      {/* Video qismi */}
      <div className="relative aspect-video w-full bg-black">
        <iframe
          className="absolute left-0 top-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

    </div>
  )
}