"use client"

import { useEffect, useState, useRef } from "react"
import confetti from "canvas-confetti"

export function Dokkai({ lesson }: any) {
  const [time, setTime] = useState(lesson.time_limit || 60)
  const [selected, setSelected] = useState("")
  const [finished, setFinished] = useState(false)
  const [result, setResult] = useState<"correct" | "wrong" | null>(null)
  const [shake, setShake] = useState(false)

  // 🔊 SOUND (FIXED)
  const correctSoundRef = useRef<HTMLAudioElement | null>(null)
  const wrongSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    correctSoundRef.current = new Audio("/correct.mp3")
    wrongSoundRef.current = new Audio("/wrong.mp3")
  }, [])

  // ⏱ TIMER
  useEffect(() => {
    if (finished) return

    const timer = setInterval(() => {
      setTime((prev: number) => {
        if (prev <= 1) {
          clearInterval(timer)
          setFinished(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [finished])

  // 🎯 SELECT
  const handleSelect = (key: string) => {
    if (finished) return

    setSelected(key)

    // 🔥 mapping
    const map: any = {
      "1": "A",
      "2": "B",
      "3": "C",
      "4": "D",
    }

    const correct = map[lesson.correct_answer] || lesson.correct_answer

    if (key === correct) {
      setResult("correct")

      // 🔊 SOUND (WORKING)
      correctSoundRef.current?.play()

      // 🎉 CONFETTI
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      })
    } else {
      setResult("wrong")

      // 🔊 SOUND
      wrongSoundRef.current?.play()

      // ❌ SHAKE
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }

    setFinished(true)
  }

  return (
    <div className={`space-y-6 relative ${shake ? "animate-shake" : ""}`}>

      {/* TIMER */}
      <div className="text-lg font-bold text-red-500">
        ⏱ {time} sekund
      </div>

      {/* IMAGE */}
      <img
        src={lesson.imageUrl}
        className="w-full max-h-[500px] object-contain rounded-xl border"
      />

      {/* QUESTION */}
      <h2 className="text-lg font-semibold">
        {lesson.question}
      </h2>

      {/* OPTIONS */}
      <div className="grid gap-3">
        {["A", "B", "C", "D"].map((key) => {
          const mapReverse: any = {
            A: "1",
            B: "2",
            C: "3",
            D: "4",
          }

          const correct =
            mapReverse[lesson.correct_answer] || lesson.correct_answer

          const isCorrect = key === correct
          const isSelected = selected === key

          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`p-3 rounded-lg border text-left transition-all duration-200
                ${
                  isSelected && result === "correct"
                    ? "bg-green-500 text-white"
                    : isSelected && result === "wrong"
                    ? "bg-red-500 text-white"
                    : finished && isCorrect
                    ? "bg-green-100 border-green-500"
                    : "bg-background hover:bg-muted"
                }
              `}
            >
              {lesson[`option_${key.toLowerCase()}`]}
            </button>
          )
        })}
      </div>

      {/* 🎉 RESULT MODAL */}
      {result && (
        <div className="fixed inset-0 flex items-center justify-center z-50">

          {/* BACKDROP */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* MODAL */}
          <div
            className={`relative z-50 p-6 rounded-2xl shadow-2xl w-[320px] text-center
            transition-all duration-300
            ${
              result === "correct"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >

            {/* CLOSE */}
            <button
              onClick={() => setResult(null)}
              className="absolute top-2 right-3 text-lg opacity-80 hover:opacity-100"
            >
              ✖
            </button>

            {/* TITLE */}
            <h2 className="text-xl font-bold mb-2">
              {result === "correct"
                ? "🎉 To‘g‘ri!"
                : "❌ Noto‘g‘ri"}
            </h2>

            {/* MESSAGE */}
            {result === "correct" ? (
              <p className="text-sm">
                Zo‘r! Siz to‘g‘ri javob topdingiz 👏
              </p>
            ) : (
              <p className="text-sm">
                To‘g‘ri javob:{" "}
                <b>{lesson.correct_answer}</b>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}