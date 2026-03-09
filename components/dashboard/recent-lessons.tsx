import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock } from "lucide-react"

const recentLessons = [
  { title: "Dakuten & Handakuten", duration: "12 min", completed: true, date: "Today" },
  { title: "Particle wa vs ga", duration: "18 min", completed: true, date: "Today" },
  { title: "Counting Objects", duration: "15 min", completed: false, date: "Yesterday" },
  { title: "Adjective Conjugation", duration: "20 min", completed: true, date: "Yesterday" },
  { title: "Restaurant Vocabulary", duration: "10 min", completed: true, date: "2 days ago" },
]

export function RecentLessons() {
  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Recent Lessons</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {recentLessons.map((lesson) => (
          <div
            key={lesson.title}
            className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
              {lesson.completed ? (
                <CheckCircle2 className="h-4 w-4 text-chart-3" />
              ) : (
                <Clock className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-foreground">{lesson.title}</p>
              <p className="text-xs text-muted-foreground">
                {lesson.duration} &middot; {lesson.date}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
