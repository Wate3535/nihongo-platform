"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  Clock,
  Flame,
  Target,
} from "lucide-react"

export function ProgressCards() {
  const [stats, setStats] = useState<any[]>([
    {
      label: "Tugatilgan darslar",
      value: "...",
      subtitle: "Yuklanmoqda",
      icon: BookOpen,
      color:
        "text-primary bg-primary/10",
    },
    {
      label: "O‘qish ketma-ketligi",
      value: "...",
      subtitle: "Yuklanmoqda",
      icon: Flame,
      color:
        "text-chart-5 bg-chart-5/10",
    },
    {
      label: "O‘qilgan soatlar",
      value: "...",
      subtitle: "Yuklanmoqda",
      icon: Clock,
      color:
        "text-chart-3 bg-chart-3/10",
    },
    {
      label: "JLPT maqsadi",
      value: "...",
      subtitle: "Yuklanmoqda",
      icon: Target,
      color:
        "text-accent bg-accent/10",
    },
  ])

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    // ⚡ parallel
    const [
      userRes,
      profileRes,
      lessonsRes,
    ] = await Promise.all([
      supabase
        .from("users")
        .select("level")
        .eq("id", user.id)
        .maybeSingle(),

      supabase
        .from("profiles")
        .select(
          "completed_lessons"
        )
        .eq("id", user.id)
        .maybeSingle(),

      supabase
        .from("lessons")
        .select("*", {
          count: "exact",
          head: true,
        }),
    ])

    const completed =
      profileRes.data
        ?.completed_lessons || 0

    const total =
      lessonsRes.count || 0

    const studyHours =
      Math.floor(
        completed * 0.25
      )

    const streak =
      Math.max(
        1,
        Math.floor(
          completed / 3
        )
      )

    const level =
      userRes.data?.level ||
      "N5"

    const percent =
      total > 0
        ? Math.round(
            (completed /
              total) *
              100
          )
        : 0

    setStats([
      {
        label:
          "Tugatilgan darslar",
        value: completed,
        subtitle: `${total} ta darsdan`,
        icon: BookOpen,
        color:
          "text-primary bg-primary/10",
      },
      {
        label:
          "O‘qish ketma-ketligi",
        value: streak,
        subtitle:
          "ketma-ket kun",
        icon: Flame,
        color:
          "text-chart-5 bg-chart-5/10",
      },
      {
        label:
          "O‘qilgan soatlar",
        value: studyHours,
        subtitle:
          "real progress",
        icon: Clock,
        color:
          "text-chart-3 bg-chart-3/10",
      },
      {
        label:
          "JLPT maqsadi",
        value: level,
        subtitle: `${percent}% tayyor`,
        icon: Target,
        color:
          "text-accent bg-accent/10",
      },
    ])
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(
        (stat, index) => (
          <motion.div
            key={stat.label}
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            whileHover={{
              scale: 1.03,
              y: -3,
            }}
            transition={{
              duration: 0.22,
              delay:
                index *
                0.04,
            }}
          >
            <Card className="border border-border bg-card shadow-sm hover:shadow-xl transition-all rounded-2xl">
              <CardContent className="flex items-start gap-4 p-6">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <p className="text-[15px] font-medium text-muted-foreground">
                    {stat.label}
                  </p>

                  <p className="mt-1 text-3xl font-extrabold tracking-tight text-foreground">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {stat.subtitle}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      )}
    </div>
  )
}