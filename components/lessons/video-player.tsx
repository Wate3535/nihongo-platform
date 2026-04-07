"use client"

type VideoPlayerProps = {
  title: string
  videoUrl: string
}

export function VideoPlayer({ title, videoUrl }: VideoPlayerProps) {

  console.log("VIDEO URL:", videoUrl)

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-foreground/95">

      <div className="relative aspect-video w-full bg-black">
       <video
  className="absolute left-0 top-0 h-full w-full"
  controls
  controlsList="nodownload noplaybackrate"
  disablePictureInPicture
  onContextMenu={(e) => e.preventDefault()}
>
  <source src={videoUrl} type="video/mp4" />
</video>
      </div>

    
    </div>
  )
}