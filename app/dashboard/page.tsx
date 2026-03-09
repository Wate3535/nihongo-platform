"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

import { ProgressCards } from "@/components/dashboard/progress-cards"
import { ContinueLearning } from "@/components/dashboard/continue-learning"
import { RecentLessons } from "@/components/dashboard/recent-lessons"

export default function DashboardPage() {

  const router = useRouter()

  useEffect(() => {

    async function checkAccess() {

      const { data: userData } = await supabase.auth.getUser()

      if (!userData.user) {
        router.push("/login")
        return
      }

      const { data } = await supabase
        .from("users")
        .select("paid")
        .eq("email", userData.user.email)
        .single()

      if (!data?.paid) {
        router.push("/tolov")
      }

    }

    checkAccess()

  }, [])

  return (
    <div className="mx-auto max-w-6xl">

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back
        </h1>

        <p className="mt-1 text-muted-foreground">
          Bu hafta o‘qish jarayoningiz
        </p>
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