"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function CertificatesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const levels = [
    { level: "N5", text: "Boshlang‘ich daraja" },
    { level: "N4", text: "Asosiy suhbat darajasi" },
    { level: "N3", text: "O‘rta daraja" },
    { level: "N2", text: "Biznes va ish darajasi" },
    { level: "N1", text: "Professional daraja" },
  ]

  async function handleBuy() {
    setLoading(true)

    try {
      const { data } = await supabase.auth.getUser()
      const user = data.user

      // User yo‘q bo‘lsa -> Register
      if (!user) {
        router.push("/register")
        return
      }

      // Email tasdiqlanmagan bo‘lsa
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
    <div className="min-h-screen bg-[#020617] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">

        {/* 🔙 Back Button */}
        <button
          onClick={() => router.back()}
          className="
            mb-10 px-6 py-3 rounded-full
            border border-white/20
            bg-white/5 backdrop-blur-xl
            hover:bg-white/10 hover:scale-105
            transition-all duration-300
          "
        >
          ← Orqaga qaytish
        </button>

        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold">
            JLPT Sertifikat Yo‘lingiz
          </h1>

          <p className="mt-4 text-white/70 text-lg">
            Bugun boshlang, ertaga sertifikat egasi bo‘ling
          </p>
        </div>

        {/* Levels */}
        <div className="grid md:grid-cols-5 gap-6">
          {levels.map((item, i) => (
            <div
              key={item.level}
              className="
                rounded-3xl bg-white/5 border border-white/10
                p-5 backdrop-blur-xl
                hover:scale-105 transition-all duration-300
              "
            >
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-300 text-black flex flex-col justify-center items-center">
                <div className="text-4xl font-bold">{item.level}</div>
                <div className="text-xs mt-2">SERTIFIKAT</div>

                <div className="mt-6 text-sm px-4 text-center">
                  Sizning ism familyangiz shu yerda bo‘lishi mumkin
                </div>
              </div>

              <p className="mt-4 text-center font-semibold">
                {item.level}
              </p>

              <p className="text-sm text-white/60 text-center">
                {item.text}
              </p>

              {i < 4 && (
                <div className="hidden md:block text-center mt-4 text-orange-400 text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <h2 className="text-2xl md:text-4xl font-bold">
            Keyingi sertifikat egasi siz bo‘lishingiz mumkin 🎓
          </h2>

          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Kursimiz orqali N5 dan N1 gacha tizimli tayyorlaning,
            real darslar, testlar va mentor yordami bilan maqsadingizga yeting.
          </p>

          <button
            onClick={handleBuy}
            disabled={loading}
            className="
              mt-8 px-10 py-4 rounded-full
              bg-gradient-to-r from-red-500 to-orange-500
              text-white font-semibold
              shadow-xl
              hover:scale-110 hover:shadow-2xl
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Tekshirilmoqda..." : "Kursni sotib olish"}
          </button>
        </div>

      </div>
    </div>
  )
}