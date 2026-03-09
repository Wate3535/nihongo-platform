import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const skills = [
  { name: "Reading (Hiragana/Katakana)", progress: 82, color: "bg-primary" },
  { name: "Kanji Recognition", progress: 38, color: "bg-accent" },
  { name: "Grammar", progress: 54, color: "bg-chart-3" },
  { name: "Listening Comprehension", progress: 65, color: "bg-chart-4" },
  { name: "Speaking & Pronunciation", progress: 45, color: "bg-chart-5" },
  { name: "Vocabulary", progress: 71, color: "bg-primary" },
]

export function SkillProgress() {
  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Skill Progress</CardTitle>
        <p className="text-sm text-muted-foreground">
          Your proficiency across different areas of Japanese
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{skill.name}</span>
              <span className="text-sm font-medium text-muted-foreground">{skill.progress}%</span>
            </div>
            <Progress value={skill.progress} className="h-2.5" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
