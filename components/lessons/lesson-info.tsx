'use client';

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface LessonInfoProps {
  title: string
  lessonNumber: number
  totalLessons: number
  onPrevious?: () => void
  onNext?: () => void
}

export function LessonInfo({ title, lessonNumber, totalLessons, onPrevious, onNext }: LessonInfoProps) {
  return (
    <div className="mt-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            {lessonNumber}-dars / {totalLessons}
          </p>

          <h2 className="mt-1 text-xl font-bold text-foreground">
            {title}
          </h2>

          <p className="mt-2 leading-relaxed text-muted-foreground">
            Ushbu darsda siz har bir belgining to‘g‘ri yozilish tartibi va talaffuzini o‘rganasiz.
            Eng yaxshi natijaga erishish uchun video bilan birga yozishni mashq qiling.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg bg-transparent"
            disabled={!onPrevious}
            onClick={onPrevious}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Oldingi
          </Button>

          <Button
            size="sm"
            className="rounded-lg"
            disabled={!onNext}
            onClick={onNext}
          >
            Keyingi
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

      </div>
    </div>
  )
}