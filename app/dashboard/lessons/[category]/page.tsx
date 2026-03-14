"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { VideoPlayer } from "@/components/lessons/video-player"
import { LessonSidebar } from "@/components/lessons/lesson-sidebar"
import { LessonInfo } from "@/components/lessons/lesson-info"
import { LessonComments } from "@/components/lessons/lesson-comments"
import { Lesson } from "@/types/lesson"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const lessonsData: Lesson[] = [
  {
    id: 1,
    title: "Introduction",
    duration: "8:30",
    videoId: "IlCYZVl1jTY",
    completed: true,
  },
  {
    id: 2,
    title: "2-dars",
    duration: "12:15",
    videoId: "xi9OPwHIE8o",
    completed: true,
  },
  {
    id: 3,
    title: "3-dars",
    duration: "10:45",
    videoId: "OlMYdT9VZH8",
    completed: true,
  }
]

export default function CategoryPage() {

  const params = useParams()
  const category = params.category

  const [activeLesson, setActiveLesson] = useState<Lesson>(lessonsData[0])

  const currentIndex = lessonsData.findIndex((l) => l.id === activeLesson.id)

  const prevLesson = currentIndex > 0 ? lessonsData[currentIndex - 1] : null
  const nextLesson =
    currentIndex < lessonsData.length - 1
      ? lessonsData[currentIndex + 1]
      : null

  return (
    <div className="mx-auto max-w-7xl">

      {/* Back button */}
      <Link
        href="/dashboard/lessons"
        className="
          inline-flex
          items-center
          gap-2
          mb-6
          text-muted-foreground
          hover:text-primary
          transition
          duration-200
          group
        "
      >
        <ArrowLeft
          className="
            w-5
            h-5
            transition
            duration-200
            group-hover:-translate-x-1
          "
        />

        <span className="text-sm font-medium">
          Orqaga
        </span>

      </Link>

      <h1 className="text-2xl font-bold mb-6 capitalize">
        {category} darslari
      </h1>

      <div className="flex flex-col gap-6 xl:flex-row">

        <div className="flex-1">

          <VideoPlayer
            title={activeLesson.title}
            videoId={activeLesson.videoId}
          />

          <LessonInfo
            title={activeLesson.title}
            lessonNumber={activeLesson.id}
            totalLessons={lessonsData.length}
            onPrevious={prevLesson ? () => setActiveLesson(prevLesson) : undefined}
            onNext={nextLesson ? () => setActiveLesson(nextLesson) : undefined}
          />

          <LessonComments lessonId={activeLesson.id} />

        </div>

        <div className="w-full xl:w-80">

          <LessonSidebar
            lessons={lessonsData}
            activeId={activeLesson.id}
            onSelect={(lesson: Lesson) => setActiveLesson(lesson)}
          />

        </div>

      </div>

    </div>
  )
}