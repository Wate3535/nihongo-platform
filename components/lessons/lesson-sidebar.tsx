'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle2, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Lesson } from "@/types/lesson"

interface LessonSidebarProps {
  lessons: Lesson[]
  activeId: number
  onSelect: (lesson: Lesson) => void
}

export function LessonSidebar({ lessons, activeId, onSelect }: LessonSidebarProps) {
  return (
    <Card className="border border-border bg-card">

      <CardHeader className="pb-3">
        <CardTitle className="text-base text-foreground">
          Hiragana va Katakana kursi
        </CardTitle>

        <p className="text-xs text-muted-foreground">
          {lessons.filter((l) => l.completed).length} / {lessons.length} ta dars tugatilgan
        </p>
      </CardHeader>

      <CardContent className="px-2 pb-2">
        <ScrollArea className="h-[420px]">

          <div className="flex flex-col gap-1 px-1">

            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => onSelect(lesson)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                  activeId === lesson.id
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-secondary"
                )}
              >

                <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                  {lesson.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-chart-3" />
                  ) : (
                    <PlayCircle
                      className={cn(
                        "h-5 w-5",
                        activeId === lesson.id ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                  )}
                </span>

                <span className="flex-1 truncate">
                  {lesson.title}
                </span>

                <span className="shrink-0 text-xs text-muted-foreground">
                  {lesson.duration}
                </span>

              </button>
            ))}

          </div>

        </ScrollArea>
      </CardContent>

    </Card>
  )
}