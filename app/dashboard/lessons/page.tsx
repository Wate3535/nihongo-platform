"use client"

import { useState } from "react"
import { VideoPlayer } from "@/components/lessons/video-player"
import { LessonSidebar } from "@/components/lessons/lesson-sidebar"
import { LessonInfo } from "@/components/lessons/lesson-info"
import { LessonComments } from "@/components/lessons/lesson-comments"

const lessonsData = [
  { id: 1, title: "Introduction to Hiragana", duration: "8:30", completed: true },
  { id: 2, title: "Vowel Characters (a, i, u, e, o)", duration: "12:15", completed: true },
  { id: 3, title: "K-row Characters", duration: "10:45", completed: true },
  { id: 4, title: "S-row Characters", duration: "11:20", completed: false },
  { id: 5, title: "T-row Characters", duration: "9:50", completed: false },
  { id: 6, title: "N-row Characters", duration: "10:10", completed: false },
  { id: 7, title: "H-row Characters", duration: "11:05", completed: false },
  { id: 8, title: "M-row Characters", duration: "9:30", completed: false },
  { id: 9, title: "Y, R, W, N Characters", duration: "13:40", completed: false },
  { id: 10, title: "Dakuten & Handakuten", duration: "12:00", completed: false },
]

export default function LessonsPage() {
  const [activeLesson, setActiveLesson] = useState(lessonsData[3])

  const currentIndex = lessonsData.findIndex((l) => l.id === activeLesson.id)
  const prevLesson = currentIndex > 0 ? lessonsData[currentIndex - 1] : null
  const nextLesson = currentIndex < lessonsData.length - 1 ? lessonsData[currentIndex + 1] : null

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-6 xl:flex-row">
        {/* Main content */}
        <div className="flex-1">
          <VideoPlayer title={activeLesson.title} />
          <LessonInfo
            title={activeLesson.title}
            lessonNumber={activeLesson.id}
            totalLessons={lessonsData.length}
            onPrevious={prevLesson ? () => setActiveLesson(prevLesson) : undefined}
            onNext={nextLesson ? () => setActiveLesson(nextLesson) : undefined}
          />
          <LessonComments />
        </div>

        {/* Lesson list sidebar */}
        <div className="w-full xl:w-80">
          <LessonSidebar
            lessons={lessonsData}
            activeId={activeLesson.id}
            onSelect={(lesson) => setActiveLesson(lesson)}
          />
        </div>
      </div>
    </div>
  )
}
