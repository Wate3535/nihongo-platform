import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Clock, Flame, Target } from "lucide-react"

const stats = [
  {
    label: "Lessons Completed",
    value: "47",
    subtitle: "of 200 total",
    icon: BookOpen,
    color: "text-primary bg-primary/10",
  },
  {
    label: "Study Streak",
    value: "12",
    subtitle: "days in a row",
    icon: Flame,
    color: "text-chart-5 bg-chart-5/10",
  },
  {
    label: "Hours Studied",
    value: "86",
    subtitle: "this month",
    icon: Clock,
    color: "text-chart-3 bg-chart-3/10",
  },
  {
    label: "JLPT Goal",
    value: "N3",
    subtitle: "68% ready",
    icon: Target,
    color: "text-accent bg-accent/10",
  },
]

export function ProgressCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border border-border bg-card">
          <CardContent className="flex items-start gap-4 p-5">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
