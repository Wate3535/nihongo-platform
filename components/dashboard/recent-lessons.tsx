"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { CheckCircle2 } from "lucide-react"

export function RecentLessons() {
  const [lessons, setLessons] = useState<any[]>([
    {
      id: 1,
      title: "Yuklanmoqda...",
      duration: "...",
      date: "...",
    },
  ])

  useEffect(() => {
    loadRecent()
  }, [])

  async function loadRecent() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data: progressRows } =
      await supabase
        .from("progress")
        .select(
          "lesson_id, created_at"
        )
        .eq("user_id", user.id)
        .eq("completed", true)
        .order("created_at", {
          ascending: false,
        })
        .limit(5)

    if (!progressRows) {
      setLessons([])
      return
    }

    const ids = progressRows.map(
      (item) => item.lesson_id
    )

    const { data: lessonRows } =
      await supabase
        .from("lessons")
        .select(
          "id, title, duration"
        )
        .in("id", ids)

    const map = new Map()

    ;(lessonRows || []).forEach(
      (lesson) => {
        map.set(
          lesson.id,
          lesson
        )
      }
    )

    const finalData = progressRows.map(
      (item) => {
        const lesson =
          map.get(
            item.lesson_id
          )

        return {
          id: item.lesson_id,
          title:
            lesson?.title ||
            "Dars",
          duration:
            lesson?.duration ||
            "10 daqiqa",
          date: formatDate(
            item.created_at
          ),
        }
      }
    )

    setLessons(finalData)
  }

  function formatDate(
    dateStr: string
  ) {
    const now = new Date()
    const date = new Date(dateStr)

    const diff = Math.floor(
      (now.getTime() -
        date.getTime()) /
        (1000 *
          60 *
          60 *
          24)
    )

    if (diff === 0)
      return "Bugun"
    if (diff === 1)
      return "Kecha"

    return `${diff} kun oldin`
  }

  return (
    <Card className="border border-border bg-card rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          Oxirgi o‘rganilgan darslar
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {lessons.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Hali dars
            tugatilmagan
          </p>
        )}

        {lessons.map(
          (
            lesson,
            index
          ) => (
            <motion.div
              key={
                lesson.id +
                index
              }
              initial={{
                opacity: 0,
                x: 14,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              whileHover={{
                scale: 1.02,
                x: 3,
              }}
              transition={{
                duration: 0.18,
                delay:
                  index *
                  0.04,
              }}
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-secondary transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>

              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold text-foreground">
                  {lesson.title}
                </p>

                <p className="text-xs text-muted-foreground">
                  {
                    lesson.duration
                  }{" "}
                  ·{" "}
                  {
                    lesson.date
                  }
                </p>
              </div>
            </motion.div>
          )
        )}
      </CardContent>
    </Card>
  )
}