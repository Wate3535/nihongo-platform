"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { supabase } from "@/lib/supabase"
import { XCircle, CheckCircle2 } from "lucide-react"

type TestItem = {
  id: number
  question: string
  image_url?: string | null
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
}

type Props = {
  lessonId: number
  open: boolean
  onClose: () => void
  onPassed: () => void
}

export default function TestModal({
  lessonId,
  open,
  onClose,
  onPassed,
}: Props) {
  const [tests, setTests] = useState<TestItem[]>([])
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [ready, setReady] = useState(false)

  const correctAudio = useRef<HTMLAudioElement | null>(null)
  const wrongAudio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    correctAudio.current = new Audio("/correct.mp3")
    wrongAudio.current = new Audio("/wrong.mp3")
  }, [])

  useEffect(() => {
    if (open) {
      fetchTests()
    }
  }, [open, lessonId])

  async function fetchTests() {
    setReady(false)

    const { data } = await supabase
      .from("tests")
      .select("*")
      .eq("lesson_id", lessonId)
      .order("id", { ascending: true })

    const list = data || []

    if (list.length === 0) {
      onPassed()
      return
    }

    setTests(list)
    setAnswers({})
    setSubmitted(false)
    setScore(0)
    setReady(true)
  }

  function playCorrect() {
    if (!correctAudio.current) return
    correctAudio.current.currentTime = 0
    correctAudio.current.play().catch(() => {})
  }

  function playWrong() {
    if (!wrongAudio.current) return
    wrongAudio.current.currentTime = 0
    wrongAudio.current.play().catch(() => {})
  }

  function chooseAnswer(testId: number, value: string, correct: string) {
    if (submitted) return

    setAnswers((prev) => ({
      ...prev,
      [testId]: value,
    }))

    if (value === correct) playCorrect()
    else playWrong()
  }

  async function rewardCoins(
    userId: string,
    amount: number,
    reason: string,
    testId?: number
  ) {
    if (amount <= 0) return

    const { data: profile } = await supabase
      .from("profiles")
      .select("coins, perfect_scores")
      .eq("id", userId)
      .single()

    const currentCoins = profile?.coins || 0

    await supabase
      .from("profiles")
      .update({
        coins: currentCoins + amount,
      })
      .eq("id", userId)

    await supabase.from("coin_history").insert([
      {
        user_id: userId,
        amount,
        reason,
        test_id: testId || null,
      },
    ])
  }

  async function getAttempt(userId: string, testId: number) {
    const { data } = await supabase
      .from("test_attempts")
      .select("*")
      .eq("user_id", userId)
      .eq("test_id", testId)
      .maybeSingle()

    if (!data) {
      await supabase.from("test_attempts").insert([
        {
          user_id: userId,
          test_id: testId,
          attempt_count: 1,
          passed: false,
        },
      ])
      return 1
    }

    const next = data.attempt_count + 1

    await supabase
      .from("test_attempts")
      .update({
        attempt_count: next,
      })
      .eq("id", data.id)

    return next
  }

  async function finishExam() {
    let total = 0

    tests.forEach((test) => {
      if (answers[test.id] === test.correct_answer) {
        total++
      }
    })

    setScore(total)
    setSubmitted(true)

    const percent = Math.round((total / tests.length) * 100)
    const passed = percent >= 70

    if (!passed) return

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const attempt = await getAttempt(user.id, lessonId)

    let reward = 0
    if (attempt === 1) reward = 3
    else if (attempt === 2) reward = 2
    else if (attempt === 3) reward = 1

    if (reward > 0) {
      await rewardCoins(
        user.id,
        reward,
        `Test Passed Attempt ${attempt}`,
        lessonId
      )
    }

    if (percent === 100) {
      await rewardCoins(
        user.id,
        1,
        "Perfect Score Bonus",
        lessonId
      )

      const { data: profile } = await supabase
        .from("profiles")
        .select("perfect_scores")
        .eq("id", user.id)
        .single()

      await supabase
        .from("profiles")
        .update({
          perfect_scores:
            (profile?.perfect_scores || 0) + 1,
        })
        .eq("id", user.id)
    }

    await supabase
      .from("test_attempts")
      .update({ passed: true })
      .eq("user_id", user.id)
      .eq("test_id", lessonId)
  }

  function retry() {
    setAnswers({})
    setSubmitted(false)
    setScore(0)
  }

  const percent = useMemo(() => {
    if (tests.length === 0) return 0
    return Math.round((score / tests.length) * 100)
  }, [score, tests])

  const passed = percent >= 70

  if (!open) return null
  if (!ready) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 p-4 overflow-y-auto">
      <div className="mx-auto w-full max-w-6xl bg-white rounded-3xl shadow-2xl min-h-[85vh] p-6 md:p-8 space-y-6">

        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-3xl font-bold">Lesson Test</h2>

          {!submitted && (
            <button onClick={onClose}>
              <XCircle className="text-gray-500 w-8 h-8" />
            </button>
          )}
        </div>

        {tests.map((test, index) => {
          const selected = answers[test.id]

          return (
            <div
              key={test.id}
              className="border rounded-2xl p-5 md:p-6 space-y-4"
            >
              <h3 className="text-xl font-semibold">
                {index + 1}. {test.question}
              </h3>

              {test.image_url && (
                <img
                  src={test.image_url}
                  alt="test"
                  className="w-full max-h-96 object-contain rounded-2xl border"
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[test.option_a, test.option_b, test.option_c, test.option_d].map(
                  (opt, i) => {
                    const isCorrect = opt === test.correct_answer
                    const isSelected = selected === opt

                    let cls =
                      "border rounded-xl p-4 text-left transition font-medium"

                    if (!submitted && isSelected) {
                      cls += isCorrect
                        ? " bg-green-100 border-green-500"
                        : " bg-red-100 border-red-500"
                    }

                    if (submitted && isCorrect) {
                      cls += " bg-green-100 border-green-500"
                    } else if (
                      submitted &&
                      isSelected &&
                      !isCorrect
                    ) {
                      cls += " bg-red-100 border-red-500"
                    } else if (!isSelected) {
                      cls += " hover:bg-gray-50"
                    }

                    return (
                      <button
                        key={i}
                        onClick={() =>
                          chooseAnswer(
                            test.id,
                            opt,
                            test.correct_answer
                          )
                        }
                        className={cls}
                      >
                        {String.fromCharCode(65 + i)}. {opt}
                      </button>
                    )
                  }
                )}
              </div>
            </div>
          )
        })}

        {!submitted && (
          <button
            onClick={finishExam}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold"
          >
            Yakunlash
          </button>
        )}

        {submitted && (
          <div className="border rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-2xl font-bold">
              {passed ? (
                <CheckCircle2 className="text-green-600 w-8 h-8" />
              ) : (
                <XCircle className="text-red-600 w-8 h-8" />
              )}
              Natija: {score}/{tests.length} ({percent}%)
            </div>

            {passed ? (
              <>
                <p className="text-green-700 text-lg">
                  Siz muvaffaqiyatli o‘tdingiz 🎉
                </p>

                <button
                  onClick={onPassed}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-lg font-semibold"
                >
                  Keyingi dars
                </button>
              </>
            ) : (
              <>
                <p className="text-red-600 text-lg">
                  Siz 70% dan past natija qildingiz.
                </p>

                <button
                  onClick={retry}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl text-lg font-semibold"
                >
                  Qayta ishlash
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}