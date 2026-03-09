import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const certificates = [
  {
    title: "Hiragana Mastery",
    date: "December 2025",
    status: "earned" as const,
  },
  {
    title: "Katakana Mastery",
    date: "January 2026",
    status: "earned" as const,
  },
  {
    title: "N5 Grammar Foundations",
    date: "In Progress",
    status: "in-progress" as const,
  },
  {
    title: "N4 Certification Prep",
    date: "Locked",
    status: "locked" as const,
  },
]

export function Certificates() {
  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Certificates</CardTitle>
        <p className="text-sm text-muted-foreground">
          Milestones you have earned on your learning journey
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {certificates.map((cert) => (
          <div
            key={cert.title}
            className="flex items-center gap-4 rounded-xl border border-border bg-background p-4"
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                cert.status === "earned"
                  ? "bg-primary/10 text-primary"
                  : cert.status === "in-progress"
                    ? "bg-chart-4/10 text-chart-4"
                    : "bg-secondary text-muted-foreground"
              }`}
            >
              <Award className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{cert.title}</p>
              <p className="text-xs text-muted-foreground">{cert.date}</p>
            </div>
            {cert.status === "earned" ? (
              <Button variant="ghost" size="icon" className="shrink-0" aria-label="Download certificate">
                <Download className="h-4 w-4" />
              </Button>
            ) : (
              <Badge
                variant="secondary"
                className={`shrink-0 rounded-full ${
                  cert.status === "in-progress" ? "bg-chart-4/10 text-chart-4" : ""
                }`}
              >
                {cert.status === "in-progress" ? "In Progress" : "Locked"}
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
