import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock } from "lucide-react"

const recentLessons = [
  { title: "Dakuten va Handakuten", duration: "12 daqiqa", completed: true, date: "Bugun" },
  { title: "Wa va Ga yuklamalari", duration: "18 daqiqa", completed: true, date: "Bugun" },
  { title: "Narsalarni sanash", duration: "15 daqiqa", completed: false, date: "Kecha" },
  { title: "Sifatlarning o‘zgarishi", duration: "20 daqiqa", completed: true, date: "Kecha" },
  { title: "Restoran so‘zlari", duration: "10 daqiqa", completed: true, date: "2 kun oldin" },
]

export function RecentLessons() {
  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">
          Oxirgi o‘rganilgan darslar
        </CardTitle>
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
              <p className="truncate text-sm font-medium text-foreground">
                {lesson.title}
              </p>

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