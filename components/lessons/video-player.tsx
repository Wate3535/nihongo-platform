"use client"

import { useState } from "react"
import { Play, Pause, Volume2, Maximize, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export function VideoPlayer({ title }: { title: string }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState([32])

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-foreground/95">

      {/* Video qismi */}
      <div className="relative flex aspect-video items-center justify-center bg-foreground/95">
        <div className="text-center">
          <p className="text-lg font-medium text-primary-foreground/60">
            {title}
          </p>

          <button
            onClick={() => setPlaying(!playing)}
            className="mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
            aria-label={playing ? "Videoni to‘xtatish" : "Videoni boshlash"}
          >
            {playing ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="ml-1 h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Boshqaruv tugmalari */}
      <div className="flex items-center gap-4 bg-foreground px-4 py-3">

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-background hover:bg-background/10 hover:text-background"
          onClick={() => setPlaying(!playing)}
          aria-label={playing ? "To‘xtatish" : "Boshlash"}
        >
          {playing ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        <div className="flex-1">
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="cursor-pointer"
          />
        </div>

        <span className="shrink-0 text-xs text-background/60">
          3:24 / 10:45
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-background hover:bg-background/10 hover:text-background"
          aria-label="Ovoz"
        >
          <Volume2 className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-background hover:bg-background/10 hover:text-background"
          aria-label="Sozlamalar"
        >
          <Settings className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-background hover:bg-background/10 hover:text-background"
          aria-label="To‘liq ekran"
        >
          <Maximize className="h-4 w-4" />
        </Button>

      </div>
    </div>
  )
}