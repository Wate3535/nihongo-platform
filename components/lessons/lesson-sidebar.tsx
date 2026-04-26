'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CheckCircle2,
  PlayCircle,
  ClipboardList,
  Lock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Lesson } from "@/types/lesson"

interface LessonSidebarProps {
  lessons: Lesson[]
  activeId: number
  onSelect: (lesson: Lesson) => void
  category: string
  onOpenTest?: (index: number) => void
  tests?: number[]
  passedTests?: number[]
}

const getCategoryTitle = (category: string) => {
  const titles: Record<string, string> = {
    alphabet: "Alifbo kursi",
    kanji: "Kanji kursi",
    grammar: "Grammatika kursi",
    vocabulary: "So‘z boyligi kursi",
    listening: "Tinglab tushunish kursi",
    reading: "O‘qib tushunish kursi",
  }

  return titles[category] || `${category} kursi`
}

export function LessonSidebar({
  lessons,
  activeId,
  onSelect,
  category,
  onOpenTest,
  tests = [],
  passedTests = [],
}: LessonSidebarProps) {
  const completedCount = lessons.filter((l) => l.completed).length

  return (
    <Card className="border border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-foreground">
          {getCategoryTitle(category)}
        </CardTitle>

        <p className="text-xs text-muted-foreground">
          {completedCount} / {lessons.length} ta dars tugatilgan
        </p>
      </CardHeader>

      <CardContent className="px-2 pb-2">
        <ScrollArea className="h-[500px]">
          <div className="flex flex-col gap-1 px-1">

            {lessons.map((lesson, index) => {
              const showTest = tests.includes(lesson.id)

              const prevCompleted =
                index === 0 ? true : lessons[index - 1]?.completed

              const testUnlocked =
                lesson.completed && prevCompleted

              const testPassed =
                passedTests.includes(lesson.id)

              return (
                <div key={lesson.id}>
                  {/* LESSON */}
                  <button
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
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <PlayCircle
                          className={cn(
                            "h-5 w-5",
                            activeId === lesson.id
                              ? "text-primary"
                              : "text-muted-foreground"
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

                  {/* TEST */}
                  {showTest && (
                    <button
                      onClick={() => {
                        if (!testUnlocked) {
                          alert("Sizda hali tugatilmagan dars bor")
                          return
                        }

                        onOpenTest?.(index)
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors text-foreground hover:bg-secondary"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                        {testPassed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <ClipboardList className="h-5 w-5 text-primary" />
                        )}
                      </span>

                      <div className="flex items-center gap-2 flex-1">
                        <span>📝 Test</span>

                        {!testUnlocked && !testPassed && (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </button>
                  )}
                </div>
              )
            })}

          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}