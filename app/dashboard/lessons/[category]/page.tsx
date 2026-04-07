"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { VideoPlayer } from "@/components/lessons/video-player"
import { LessonSidebar } from "@/components/lessons/lesson-sidebar"
import { LessonInfo } from "@/components/lessons/lesson-info"
import { LessonComments } from "@/components/lessons/lesson-comments"
import { Lesson } from "@/types/lesson"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Dokkai } from "@/components/lessons/dokkai"
import SurveyModal from "@/components/reviews/survey-modal"

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string

  const [lessons, setLessons] = useState<Lesson[]>([])
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)

  const [showSurvey, setShowSurvey] = useState(false)
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    if (!category) return

    const fetchLessons = async () => {
      setLoading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      // 🔥 COURSE
      const { data: course } = await supabase
        .from("courses")
        .select("id")
        .eq("slug", category)
        .single()

      if (!course) return

      // 🔥 LESSONS
      const { data } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", course.id)
        .order("id", { ascending: true })

      if (!data) return

      const mapped = data.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        duration: lesson.duration,
        videoUrl: lesson.video_url,
        imageUrl: lesson.image_url,
        type: lesson.type,
        question: lesson.question,
        option_a: lesson.option_a,
        option_b: lesson.option_b,
        option_c: lesson.option_c,
        option_d: lesson.option_d,
        correct_answer: lesson.correct_answer,
        time_limit: lesson.time_limit,
        completed: false,
      }))

      setLessons(mapped)
      setActiveLesson(mapped[0])

      // 🔥 PROGRESS COUNT
      const { data: progress } = await supabase
        .from("progress")
        .select("*")
        .eq("user_id", user.id)

      setCompletedCount(progress?.length || 0)

      setLoading(false)
    }

    fetchLessons()
  }, [category])

  // 🔥 COMPLETE FUNCTION
  const markAsCompleted = async (lessonId: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data: existing } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", user.id)
      .eq("lesson_id", lessonId)
      .maybeSingle()

    if (existing) {
      alert("Bu dars allaqachon tugatilgan")
      return
    }

    await supabase.from("progress").insert([
      {
        user_id: user.id,
        lesson_id: lessonId,
        completed: true,
      },
    ])

    alert("Dars tugatildi ✅")

    const newCount = completedCount + 1
    setCompletedCount(newCount)

    // 🔥 5 TA BO‘LGANDA POPUP
    if (newCount === 5) {
      setShowSurvey(true)
    }

    // 🔥 NEXT
    const currentIndex = lessons.findIndex((l) => l.id === lessonId)
    const nextLesson =
      currentIndex < lessons.length - 1
        ? lessons[currentIndex + 1]
        : null

    if (nextLesson) setActiveLesson(nextLesson)
  }

  if (loading) return <div className="p-10">Loading...</div>
  if (!activeLesson) return <div className="p-10">Dars yo‘q</div>

  const currentIndex = lessons.findIndex(
    (l) => l.id === activeLesson.id
  )

  const prevLesson =
    currentIndex > 0 ? lessons[currentIndex - 1] : null

  const nextLesson =
    currentIndex < lessons.length - 1
      ? lessons[currentIndex + 1]
      : null

  return (
    <div className="mx-auto max-w-7xl">

      <Link href="/dashboard/lessons" className="flex gap-2 mb-6">
        <ArrowLeft /> Orqaga
      </Link>

      <h1 className="text-2xl font-bold mb-6 capitalize">
        {category} darslari
      </h1>

      <div className="flex flex-col xl:flex-row gap-6">

        <div className="flex-1">

         {activeLesson.type === "video" && activeLesson.videoUrl && (
  <VideoPlayer
    key={activeLesson.id}
    title={activeLesson.title}
    videoUrl={activeLesson.videoUrl}
  />
)}

          {activeLesson.type === "dokkai" && (
            <Dokkai lesson={activeLesson} />
          )}

          <LessonInfo
            title={activeLesson.title}
            lessonNumber={currentIndex + 1}
            totalLessons={lessons.length}
            onPrevious={
              prevLesson ? () => setActiveLesson(prevLesson) : undefined
            }
            onNext={
              nextLesson ? () => setActiveLesson(nextLesson) : undefined
            }
            category={category}
          />

          <button
            onClick={() => markAsCompleted(activeLesson.id)}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Tugatish ✅
          </button>

          <LessonComments lessonId={activeLesson.id} />

        </div>

        <div className="w-full xl:w-80">
          <LessonSidebar
            lessons={lessons}
            activeId={activeLesson.id}
            onSelect={(l) => setActiveLesson(l)}
            category={category}
          />
        </div>

      </div>

      {/* 🔥 SURVEY MODAL */}
      {showSurvey && (
        <SurveyModal onClose={() => setShowSurvey(false)} />
      )}

    </div>
  )
}