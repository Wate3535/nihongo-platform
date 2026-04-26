"use client"

import { useParams, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { supabase } from "@/lib/supabase"
import { Lesson } from "@/types/lesson"

import { VideoPlayer } from "@/components/lessons/video-player"
import { LessonSidebar } from "@/components/lessons/lesson-sidebar"
import { LessonInfo } from "@/components/lessons/lesson-info"
import LessonAIChat from "@/components/lessons/lesson-ai-chat"
import { Dokkai } from "@/components/lessons/dokkai"
import TestModal from "@/components/lessons/test-modal"
import SurveyModal from "@/components/reviews/survey-modal"

export default function CategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()

  const category = params.category as string
  const lessonFromUrl = searchParams.get("lesson")

  const [lessons, setLessons] = useState<Lesson[]>([])
  const [activeLesson, setActiveLesson] =
    useState<Lesson | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [tests, setTests] = useState<any[]>([])
  const [passedTests, setPassedTests] =
    useState<number[]>([])

  const [showTest, setShowTest] =
    useState(false)

  const [showSurvey, setShowSurvey] =
    useState(false)

  const [testLessonId, setTestLessonId] =
    useState<number | null>(null)

  useEffect(() => {
    if (category) {
      fetchLessons()
    }
  }, [category, lessonFromUrl])

  async function fetchLessons() {
    try {
      setLoading(true)

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: course } =
        await supabase
          .from("courses")
          .select("id")
          .eq("slug", category)
          .single()

      if (!course) return

      const [
        lessonsRes,
        progressRes,
        testsRes,
      ] = await Promise.all([
        supabase
          .from("lessons")
          .select("*")
          .eq("course_id", course.id)
          .order("id", {
            ascending: true,
          }),

        supabase
          .from("progress")
          .select(
            "lesson_id, completed"
          )
          .eq("user_id", user.id),

        supabase
          .from("tests")
          .select("lesson_id"),
      ])

      const lessonData =
        lessonsRes.data || []

      const progress =
        progressRes.data || []

      const testData =
        testsRes.data || []

      const completedIds =
        progress
          .filter(
            (p) => p.completed
          )
          .map(
            (p) => p.lesson_id
          )

      const mapped: Lesson[] =
        lessonData.map(
          (lesson) => ({
            id: lesson.id,
            title: lesson.title,
            duration:
              lesson.duration,
            videoUrl:
              lesson.video_url,
            imageUrl:
              lesson.image_url,
            type: lesson.type,
            question:
              lesson.question,
            option_a:
              lesson.option_a,
            option_b:
              lesson.option_b,
            option_c:
              lesson.option_c,
            option_d:
              lesson.option_d,
            correct_answer:
              lesson.correct_answer,
            time_limit:
              lesson.time_limit,
            completed:
              completedIds.includes(
                lesson.id
              ),
          })
        )

      setLessons(mapped)
      setTests(testData)

      let selectedLesson =
        null

      if (lessonFromUrl) {
        selectedLesson =
          mapped.find(
            (item) =>
              String(item.id) ===
              String(
                lessonFromUrl
              )
          ) || null
      }

      const firstUnfinished =
        mapped.find(
          (l) => !l.completed
        ) ||
        mapped[0] ||
        null

      setActiveLesson(
        selectedLesson ||
          firstUnfinished
      )
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function rewardCoins(
    userId: string,
    amount: number,
    reason: string,
    lessonId?: number
  ) {
    try {
      if (amount <= 0) return

      const { data: profile } =
        await supabase
          .from("profiles")
          .select("coins")
          .eq("id", userId)
          .maybeSingle()

      const currentCoins =
        profile?.coins || 0

      await supabase
        .from("profiles")
        .update({
          coins:
            currentCoins +
            amount,
        })
        .eq("id", userId)

      await supabase
        .from("coin_history")
        .insert([
          {
            user_id: userId,
            amount,
            reason,
            lesson_id:
              lessonId ??
              null,
          },
        ])

      window.dispatchEvent(
        new CustomEvent(
          "showCoinReward",
          {
            detail: {
              amount,
            },
          }
        )
      )

      window.dispatchEvent(
        new CustomEvent(
          "coinsUpdated"
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  async function markAsCompleted(
    lessonId: number
  ) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const {
        data: existing,
      } = await supabase
        .from("progress")
        .select("*")
        .eq("user_id", user.id)
        .eq(
          "lesson_id",
          lessonId
        )
        .maybeSingle()

      let firstComplete =
        false

      if (!existing) {
        await supabase
          .from("progress")
          .insert([
            {
              user_id:
                user.id,
              lesson_id:
                lessonId,
              completed: true,
            },
          ])

        firstComplete =
          true
      } else if (
        !existing.completed
      ) {
        await supabase
          .from("progress")
          .update({
            completed: true,
          })
          .eq(
            "id",
            existing.id
          )

        firstComplete =
          true
      }

      if (firstComplete) {
        await rewardCoins(
          user.id,
          3,
          "Lesson Completed",
          lessonId
        )

        const {
          data: profile,
        } = await supabase
          .from("profiles")
          .select(
            "completed_lessons"
          )
          .eq(
            "id",
            user.id
          )
          .maybeSingle()

        const current =
          profile?.completed_lessons ||
          0

        await supabase
          .from("profiles")
          .update({
            completed_lessons:
              current + 1,
          })
          .eq(
            "id",
            user.id
          )

        window.dispatchEvent(
          new Event(
            "progressUpdated"
          )
        )
      }

      const updated =
        lessons.map(
          (lesson) =>
            lesson.id ===
            lessonId
              ? {
                  ...lesson,
                  completed: true,
                }
              : lesson
        )

      setLessons(updated)

      const currentIndex =
        updated.findIndex(
          (l) =>
            l.id === lessonId
        )

      const nextLesson =
        currentIndex <
        updated.length - 1
          ? updated[
              currentIndex +
                1
            ]
          : updated.find(
              (l) =>
                l.id ===
                lessonId
            ) || null

      setActiveLesson(
        nextLesson
      )
    } catch (error) {
      console.log(error)
    }
  }

  async function handleFinishLesson() {
    if (!activeLesson) return

    if (
      activeLesson.completed
    )
      return

    await markAsCompleted(
      activeLesson.id
    )

    const hasTest =
      tests.some(
        (t) =>
          t.lesson_id ===
          activeLesson.id
      )

    if (hasTest) {
      setTestLessonId(
        activeLesson.id
      )
      setShowTest(true)
    }
  }

  function handleOpenSidebarTest(
    index: number
  ) {
    const lesson =
      lessons[index]

    if (
      !lesson?.completed
    ) {
      alert(
        "Avval darsni tugating"
      )
      return
    }

    setTestLessonId(
      lesson.id
    )
    setShowTest(true)
  }

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    )
  }

  if (!activeLesson) {
    return (
      <div className="p-10">
        Dars yo‘q
      </div>
    )
  }

  const currentIndex =
    lessons.findIndex(
      (l) =>
        l.id ===
        activeLesson.id
    )

  const prevLesson =
    currentIndex > 0
      ? lessons[
          currentIndex - 1
        ]
      : null

  const nextLesson =
    currentIndex <
    lessons.length - 1
      ? lessons[
          currentIndex + 1
        ]
      : null

  return (
    <div className="mx-auto max-w-7xl">

      <Link
        href="/dashboard/lessons"
        className="mb-6 flex gap-2"
      >
        <ArrowLeft />
        Orqaga
      </Link>

      <h1 className="mb-6 text-2xl font-bold capitalize">
        {category} darslari
      </h1>

      <div className="flex flex-col gap-6 xl:flex-row">

        <div className="flex-1">

          {activeLesson.type ===
            "video" &&
            activeLesson.videoUrl && (
              <VideoPlayer
                key={
                  activeLesson.id
                }
                title={
                  activeLesson.title
                }
                videoUrl={
                  activeLesson.videoUrl
                }
              />
            )}

          {activeLesson.type ===
            "dokkai" && (
            <Dokkai
              lesson={
                activeLesson
              }
            />
          )}

          <LessonInfo
            title={
              activeLesson.title
            }
            lessonNumber={
              currentIndex + 1
            }
            totalLessons={
              lessons.length
            }
            onPrevious={
              prevLesson
                ? () =>
                    setActiveLesson(
                      prevLesson
                    )
                : undefined
            }
            onNext={
              nextLesson
                ? () =>
                    setActiveLesson(
                      nextLesson
                    )
                : undefined
            }
            category={
              category
            }
          />

          <button
            onClick={
              handleFinishLesson
            }
            disabled={
              activeLesson.completed
            }
            className={`mt-4 rounded-lg px-4 py-2 text-white transition ${
              activeLesson.completed
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {activeLesson.completed
              ? "Tugatildi ✅"
              : "Tugatish ✅"}
          </button>

          <LessonAIChat
           
          />
        </div>

        <div className="w-full xl:w-80">
          <LessonSidebar
            lessons={lessons}
            activeId={
              activeLesson.id
            }
            onSelect={(
              lesson
            ) =>
              setActiveLesson(
                lesson
              )
            }
            category={
              category
            }
            onOpenTest={
              handleOpenSidebarTest
            }
            tests={tests.map(
              (t) =>
                t.lesson_id
            )}
            passedTests={
              passedTests
            }
          />
        </div>

      </div>

      {testLessonId && (
        <TestModal
          lessonId={
            testLessonId
          }
          open={showTest}
          onClose={() =>
            setShowTest(
              false
            )
          }
          onPassed={() => {
            setShowTest(
              false
            )

            if (
              testLessonId
            ) {
              setPassedTests(
                (
                  prev
                ) =>
                  prev.includes(
                    testLessonId
                  )
                    ? prev
                    : [
                        ...prev,
                        testLessonId,
                      ]
              )
            }
          }}
        />
      )}

      {showSurvey && (
        <SurveyModal
          onClose={() =>
            setShowSurvey(
              false
            )
          }
        />
      )}

    </div>
  )
}