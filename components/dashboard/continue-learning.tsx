import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play } from "lucide-react"

const currentCourses = [
  {
    title: "Hiragana & Katakana Mastery",
    chapter: "Chapter 8: Dakuten Characters",
    progress: 72,
    lessons: "18 / 25 lessons",
  },
  {
    title: "Essential Grammar N4",
    chapter: "Chapter 3: Te-form Verbs",
    progress: 34,
    lessons: "8 / 24 lessons",
  },
  {
    title: "Conversational Japanese",
    chapter: "Chapter 1: Self Introduction",
    progress: 12,
    lessons: "3 / 20 lessons",
  },
]

export function ContinueLearning() {
  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Continue Learning</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {currentCourses.map((course) => (
          <div
            key={course.title}
            className="flex flex-col gap-3 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{course.title}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{course.chapter}</p>
              <div className="mt-3 flex items-center gap-3">
                <Progress value={course.progress} className="h-2 flex-1" />
                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  {course.lessons}
                </span>
              </div>
            </div>
            <Button asChild size="sm" className="mt-3 rounded-lg sm:mt-0">
              <Link href="/dashboard/lessons">
                <Play className="mr-1 h-3.5 w-3.5" />
                Resume
              </Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
