"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function SkillProgress() {
  const [skills, setSkills] = useState<any[]>([])

  useEffect(() => {
    loadStats()

    const refresh = () => loadStats()

    window.addEventListener(
      "progressUpdated",
      refresh
    )

    return () => {
      window.removeEventListener(
        "progressUpdated",
        refresh
      )
    }
  }, [])

  async function loadStats() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const categories = [
      {
        name: "O‘qish (Hiragana/Katakana)",
        slug: "alphabet",
      },
      {
        name: "Kanji tanish",
        slug: "kanji",
      },
      {
        name: "Grammatika",
        slug: "grammar",
      },
      {
        name: "Tinglab tushunish",
        slug: "listening",
      },
      {
        name: "Gapirish va talaffuz",
        slug: "reading",
      },
      {
        name: "So‘z boyligi",
        slug: "vocabulary",
      },
    ]

    // FAST QUERY 1
    const { data: courses } = await supabase
      .from("courses")
      .select("id, slug")

    // FAST QUERY 2
    const { data: lessons } = await supabase
      .from("lessons")
      .select("id, course_id")

    // FAST QUERY 3
    const { data: progress } = await supabase
      .from("progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("completed", true)

    const courseMap = new Map()

    ;(courses || []).forEach((course) => {
      courseMap.set(course.slug, course.id)
    })

    const completedSet = new Set(
      (progress || []).map((p) => p.lesson_id)
    )

    const result = categories.map((cat) => {
      const courseId = courseMap.get(cat.slug)

      if (!courseId) {
        return {
          name: cat.name,
          progress: 0,
        }
      }

      const categoryLessons = (lessons || []).filter(
        (lesson) =>
          lesson.course_id === courseId
      )

      const total = categoryLessons.length

      if (total === 0) {
        return {
          name: cat.name,
          progress: 0,
        }
      }

      const completed =
        categoryLessons.filter((lesson) =>
          completedSet.has(lesson.id)
        ).length

      const percent = Math.round(
        (completed / total) * 100
      )

      return {
        name: cat.name,
        progress: percent,
      }
    })

    setSkills(result)
  }

  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">
          Ko‘nikmalar rivoji
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Yapon tilining turli yo‘nalishlari bo‘yicha darajangiz
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {skill.name}
              </span>

              <span className="text-sm font-medium text-muted-foreground">
                {skill.progress}%
              </span>
            </div>

            <Progress
              value={skill.progress}
              className="h-2.5"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}