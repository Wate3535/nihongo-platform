"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play } from "lucide-react"

export function ContinueLearning() {
  const [courses, setCourses] = useState<any[]>([
    {
      title: "Yuklanmoqda...",
      slug: "#",
      completed: "...",
      total: "...",
      progress: 0,
    },
  ])

  useEffect(() => {
    loadCourses()
  }, [])

  async function loadCourses() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    // ⚡ parallel fetch
    const [
      courseRes,
      lessonRes,
      progressRes,
    ] = await Promise.all([
      supabase
        .from("courses")
        .select(
          "id, title, slug"
        ),

      supabase
        .from("lessons")
        .select(
          "id, course_id"
        ),

      supabase
        .from("progress")
        .select("lesson_id")
        .eq("user_id", user.id)
        .eq("completed", true),
    ])

    const dbCourses =
      courseRes.data || []

    const lessons =
      lessonRes.data || []

    const progress =
      progressRes.data || []

    const completedSet = new Set(
      progress.map(
        (p) => p.lesson_id
      )
    )

    const result = dbCourses
      .map((course) => {
        const courseLessons =
          lessons.filter(
            (l) =>
              l.course_id ===
              course.id
          )

        const total =
          courseLessons.length

        const completed =
          courseLessons.filter(
            (l) =>
              completedSet.has(
                l.id
              )
          ).length

        const percent =
          total > 0
            ? Math.round(
                (completed /
                  total) *
                  100
              )
            : 0

        return {
          title: course.title,
          slug: course.slug,
          completed,
          total,
          progress: percent,
        }
      })
      .filter(
        (item) =>
          item.completed > 0
      )
      .sort(
        (a, b) =>
          b.progress -
          a.progress
      )
      .slice(0, 3)

    setCourses(result)
  }

  return (
    <Card className="border border-border bg-card rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">
          O‘qishni davom ettirish
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {courses.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Hali dars
            boshlanmagan
          </p>
        )}

        {courses.map(
          (
            course,
            index
          ) => {
            const active =
              index === 0

            return (
              <motion.div
                key={
                  course.slug
                }
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  scale: 1.02,
                  y: -3,
                }}
                transition={{
                  duration: 0.2,
                  delay:
                    index *
                    0.04,
                }}
                className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between transition-all hover:shadow-xl ${
                  active
                    ? "border-green-500 bg-green-500/5"
                    : "border-border bg-background"
                }`}
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {
                      course.title
                    }
                  </h3>

                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {
                      course.completed
                    }{" "}
                    ta
                    tugatilgan
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <Progress
                      value={
                        course.progress
                      }
                      className="h-2 flex-1"
                    />

                    <span className="shrink-0 text-xs font-medium text-muted-foreground">
                      {
                        course.total
                      }{" "}
                      ta
                      darsdan{" "}
                      {
                        course.completed
                      }{" "}
                      tasi
                    </span>
                  </div>
                </div>

                <Button
                  asChild
                  size="sm"
                  className={`mt-3 rounded-lg sm:mt-0 transition-all hover:scale-105 ${
                    active
                      ? "bg-green-600 hover:bg-green-700"
                      : ""
                  }`}
                >
                  <Link
                    href={`/dashboard/lessons/${course.slug}`}
                  >
                    <Play className="mr-1 h-3.5 w-3.5" />
                    Davom
                    ettirish
                  </Link>
                </Button>
              </motion.div>
            )
          }
        )}
      </CardContent>
    </Card>
  )
}