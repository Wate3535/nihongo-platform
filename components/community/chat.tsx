"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function N5Leaderboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const students = [
    { name: "Kamola", score: 98, lessons: 42 },
    { name: "Madina", score: 96, lessons: 40 },
    { name: "Azizbek", score: 94, lessons: 39 },
    { name: "Shahzoda", score: 92, lessons: 37 },
    { name: "Kamron", score: 90, lessons: 35 },
    { name: "Dilnoza", score: 89, lessons: 34 },
    { name: "Oybek", score: 87, lessons: 32 },
    { name: "Jasmina", score: 86, lessons: 31 },
    { name: "Abror", score: 84, lessons: 30 },
    { name: "Sarvinoz", score: 82, lessons: 28 },
  ]

  async function handleJoin() {
    setLoading(true)

    try {
      const { data } = await supabase.auth.getUser()
      const user = data.user

      // User yo‘q bo‘lsa -> Register
      if (!user) {
        router.push("/register")
        return
      }

      // Email confirm bo‘lmagan bo‘lsa
      if (!user.email_confirmed_at) {
        alert("Emailingizni tasdiqlang 📩")
        return
      }

      // Login user -> Dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error(error)
      router.push("/register")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-[#020617] text-white px-6 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4 mt-4">
            <Image
              src="/jamoa.png"
              alt="Jamoa"
              width={44}
              height={44}
              className="rounded-xl object-cover"
            />

            <h1 className="text-3xl md:text-5xl font-bold mt-1">
              Hamjamiyat
            </h1>
          </div>

          <button
            onClick={() => router.back()}
            className="
              px-6 py-3 rounded-full
              bg-white/5 border border-white/10
              hover:bg-white/10 hover:scale-105
              transition-all duration-300
            "
          >
            ← Orqaga qaytish
          </button>
        </div>

        {/* TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🏆 N5 Top O'quvchilar
          </h2>

          <p className="text-white/60 mt-4 text-lg">
            Eng faol o‘quvchilar reytingi
          </p>
        </div>

        {/* TOP 3 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {students.slice(0, 3).map((student, i) => (
            <div
              key={student.name}
              className={`
                rounded-3xl p-6 text-center border border-white/10
                backdrop-blur-xl shadow-2xl cursor-pointer
                transition-all duration-500
                hover:scale-110 hover:-translate-y-2
                ${
                  i === 0
                    ? "bg-gradient-to-b from-yellow-400/20 to-transparent scale-105"
                    : i === 1
                    ? "bg-gradient-to-b from-gray-300/10 to-transparent"
                    : "bg-gradient-to-b from-orange-500/10 to-transparent"
                }
              `}
            >
              <div className="text-6xl mb-4">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
              </div>

              <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold mb-4">
                {student.name[0]}
              </div>

              <h3 className="text-2xl font-bold">{student.name}</h3>

              <p className="text-white/60 mt-2">N5 Student</p>

              <div className="mt-4 text-lg font-semibold text-green-400">
                {student.score}%
              </div>

              <div className="text-sm text-white/50">
                {student.lessons} lessons
              </div>
            </div>
          ))}
        </div>

        {/* 4 - 10 */}
        <div className="space-y-4">
          {students.slice(3).map((student, index) => (
            <div
              key={student.name}
              className="
                flex items-center justify-between
                rounded-2xl bg-white/5 border border-white/10
                px-5 py-4 cursor-pointer
                transition-all duration-300
                hover:bg-white/10 hover:scale-[1.03] hover:px-7
              "
            >
              <div className="flex items-center gap-4">
                <div className="text-xl font-bold text-white/60 w-8">
                  #{index + 4}
                </div>

                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold">
                  {student.name[0]}
                </div>

                <div>
                  <div className="font-semibold text-lg">
                    {student.name}
                  </div>

                  <div className="text-sm text-white/50">
                    N5 Student
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-green-400 font-bold text-lg">
                  {student.score}%
                </div>

                <div className="text-xs text-white/50">
                  {student.lessons} lessons
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <h2 className="text-3xl md:text-4xl font-bold">
            Hoziroq hamjamiyatga qo‘shiling 🚀
          </h2>

          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            Reytingga kirish, kuchli o‘quvchilar qatoridan joy olish va
            JLPT maqsadingizga tezroq yeting.
          </p>

          <button
            onClick={handleJoin}
            disabled={loading}
            className="
              mt-8 px-10 py-4 rounded-full
              bg-gradient-to-r from-pink-500 to-purple-500
              text-white font-semibold
              shadow-xl
              hover:scale-110 hover:shadow-2xl
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Tekshirilmoqda..." : "Hamjamiyatga qo‘shilish"}
          </button>
        </div>

      </div>
    </section>
  )
}