"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

import { ProgressCards } from "@/components/dashboard/progress-cards"
import { ContinueLearning } from "@/components/dashboard/continue-learning"
import { RecentLessons } from "@/components/dashboard/recent-lessons"

export default function DashboardPage() {

  const router = useRouter()

  // 🔥 TIMER STATE
  const [seconds, setSeconds] = useState(0)

  // 🔥 TIMER START
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // ⏱ FORMAT
  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    checkAccess()
  }, [])

  const checkAccess = async () => {

    const { data: authData } = await supabase.auth.getUser()

    if (!authData?.user) {
      router.push("/login")
      return
    }

    const { data: profile } = await supabase
      .from("users")
      .select("paid")
      .eq("id", authData.user.id)
      .maybeSingle()

    if (!profile?.paid) {
      router.push("/tolov")
    }
  }

  return (
    <div className="mx-auto max-w-6xl">

      {/* 🔥 HEADER + TIMER */}
      <div className="mb-8 flex items-start justify-between">

        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Xush kelibsiz
          </h1>

          <p className="mt-1 text-muted-foreground">
            Bu hafta o‘qish jarayoningiz
          </p>
        </div>

      </div>

      <ProgressCards />

      <div className="mt-8 grid gap-8 lg:grid-cols-5">

        <div className="lg:col-span-3">
          <ContinueLearning />
        </div>

        <div className="lg:col-span-2">
          <RecentLessons />
        </div>

      </div>

    </div>
  )
}