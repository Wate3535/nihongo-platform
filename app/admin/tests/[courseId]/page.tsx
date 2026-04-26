"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { ArrowLeft, ClipboardList, Plus, Trash2 } from "lucide-react"

type QuizItem = {
  question: string
  image_url: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
}

export default function AddTestPage() {
  const { courseId } = useParams()

  const [lessons, setLessons] = useState<any[]>([])
  const [tests, setTests] = useState<any[]>([])
  const [lessonId, setLessonId] = useState("")
  const [loading, setLoading] = useState(false)

  const [quizList, setQuizList] = useState<QuizItem[]>([
    {
      question: "",
      image_url: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_answer: "",
    },
  ])

  useEffect(() => {
    if (courseId) {
      fetchLessons()
    }
  }, [courseId])

  useEffect(() => {
    if (lessonId) {
      fetchTests()
    } else {
      setTests([])
    }
  }, [lessonId])

  async function fetchLessons() {
    const { data } = await supabase
      .from("lessons")
      .select("*")
      .eq("course_id", courseId)
      .order("id", { ascending: false })

    setLessons(data || [])
  }

  async function fetchTests() {
    const { data } = await supabase
      .from("tests")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("id", { ascending: true })

    setTests(data || [])
  }

  function addQuizBlock() {
    setQuizList([
      ...quizList,
      {
        question: "",
        image_url: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "",
      },
    ])
  }

  function removeQuizBlock(index: number) {
    const updated = [...quizList]
    updated.splice(index, 1)
    setQuizList(updated)
  }

  function updateQuiz(index: number, field: keyof QuizItem, value: string) {
    const updated = [...quizList]
    updated[index][field] = value
    setQuizList(updated)
  }

  async function handleSaveAll() {
    if (!lessonId) {
      alert("Lesson tanlang")
      return
    }

    for (const item of quizList) {
      if (
        !item.question ||
        !item.option_a ||
        !item.option_b ||
        !item.option_c ||
        !item.option_d ||
        !item.correct_answer
      ) {
        alert("Hamma testlarni to‘ldiring")
        return
      }
    }

    setLoading(true)

    const payload = quizList.map((item) => ({
      lesson_id: lessonId,
      question: item.question,
      image_url: item.image_url,
      option_a: item.option_a,
      option_b: item.option_b,
      option_c: item.option_c,
      option_d: item.option_d,
      correct_answer: item.correct_answer,
    }))

    const { error } = await supabase.from("tests").insert(payload)

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert("Barcha testlar saqlandi ✅")

    setQuizList([
      {
        question: "",
        image_url: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "",
      },
    ])

    fetchTests()
  }

  async function deleteTest(id: number) {
    await supabase.from("tests").delete().eq("id", id)
    fetchTests()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        <Link
          href="/admin/tests"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black"
        >
          <ArrowLeft size={16} />
          Orqaga
        </Link>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100">
              <ClipboardList className="text-blue-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Test qo‘shish</h1>
              <p className="text-gray-500">Bir lesson ichiga ko‘p test qo‘shing</p>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">

          <select
            value={lessonId}
            onChange={(e) => setLessonId(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value="">📚 Lesson tanlang</option>

            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
                {lesson.title}
              </option>
            ))}
          </select>

          {quizList.map((quiz, index) => (
            <div
              key={index}
              className="border rounded-2xl p-5 space-y-3 bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">
                  Test #{index + 1}
                </h2>

                {quizList.length > 1 && (
                  <button
                    onClick={() => removeQuizBlock(index)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <input
                placeholder="🖼 Rasm URL"
                value={quiz.image_url}
                onChange={(e) =>
                  updateQuiz(index, "image_url", e.target.value)
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                placeholder="❓ Savol"
                value={quiz.question}
                onChange={(e) =>
                  updateQuiz(index, "question", e.target.value)
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                placeholder="A"
                value={quiz.option_a}
                onChange={(e) =>
                  updateQuiz(index, "option_a", e.target.value)
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                placeholder="B"
                value={quiz.option_b}
                onChange={(e) =>
                  updateQuiz(index, "option_b", e.target.value)
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                placeholder="C"
                value={quiz.option_c}
                onChange={(e) =>
                  updateQuiz(index, "option_c", e.target.value)
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                placeholder="D"
                value={quiz.option_d}
                onChange={(e) =>
                  updateQuiz(index, "option_d", e.target.value)
                }
                className="w-full border rounded-xl p-3"
              />

              <select
                value={quiz.correct_answer}
                onChange={(e) =>
                  updateQuiz(index, "correct_answer", e.target.value)
                }
                className="w-full border rounded-xl p-3"
              >
                <option value="">✅ To‘g‘ri javob</option>
                <option value={quiz.option_a}>A</option>
                <option value={quiz.option_b}>B</option>
                <option value={quiz.option_c}>C</option>
                <option value={quiz.option_d}>D</option>
              </select>
            </div>
          ))}

          <button
            onClick={addQuizBlock}
            className="w-full border-2 border-dashed rounded-2xl p-4 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50"
          >
            <Plus size={18} />
            Yangi test qo‘shish
          </button>

          <button
            onClick={handleSaveAll}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
          >
            {loading ? "Saqlanmoqda..." : "💾 Barchasini saqlash"}
          </button>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="text-xl font-bold">Qo‘shilgan testlar</h2>

          {tests.length === 0 && (
            <p className="text-gray-500">Bu lesson uchun test yo‘q</p>
          )}

          {tests.map((test, index) => (
            <div
              key={test.id}
              className="border rounded-xl p-4 flex justify-between gap-4"
            >
              <div>
                <p className="font-semibold">Test #{index + 1}</p>
                <p className="mt-1">{test.question}</p>
              </div>

              <button
                onClick={() => deleteTest(test.id)}
                className="text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}