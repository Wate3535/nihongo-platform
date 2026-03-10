"use client"

import { ProgressCards } from "@/components/dashboard/progress-cards"
import { ContinueLearning } from "@/components/dashboard/continue-learning"
import { RecentLessons } from "@/components/dashboard/recent-lessons"

export default function DashboardPage() {

  return (
    <div className="mx-auto max-w-6xl">

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Xush kelibsiz
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