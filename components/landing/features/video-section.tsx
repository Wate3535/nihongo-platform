"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export function VideoSection() {
  const fullText = "Video darslar orqali tez va oson o‘rganing"

  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  // 🔥 typing loop
  useEffect(() => {
    const interval = setInterval(() => {
      setText(fullText.slice(0, index))
      setIndex((prev) => (prev > fullText.length + 10 ? 0 : prev + 1))
    }, 60)

    return () => clearInterval(interval)
  }, [index])

  // 🔥 button logic
  async function handleStart() {
    setLoading(true)

    const { data } = await supabase.auth.getUser()
    const user = data.user

    if (!user) {
      router.push("/register")
      return
    }

    if (!user.email_confirmed_at) {
      alert("Emailingizni tasdiqlang 📩")
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="
      relative w-full min-h-screen
      flex items-center justify-center
      overflow-hidden
      bg-gradient-to-br from-white via-blue-50 to-purple-100
      dark:from-[#0f172a] dark:via-[#020617] dark:to-[#0f172a]
    ">

      {/* 🔥 FLOATING IMAGES (desktop only) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">

        <FloatingImage src="/video1.jpg" className="top-[10%] left-[8%]" type="fast" />
        <FloatingImage src="/video2.jpg" className="top-[15%] right-[10%]" type="slow" />
        <FloatingImage src="/video3.jpg" className="bottom-[12%] left-[12%]" type="reverse" />
        <FloatingImage src="/video4.jpg" className="bottom-[10%] right-[8%]" type="slow" />

      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-3xl px-4 md:px-6">

        {/* TITLE */}
        <h1 className="
          text-3xl md:text-5xl lg:text-6xl
          font-bold leading-tight
          transition-all duration-500
          hover:scale-110 hover:tracking-wide
        ">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {text}
          </span>
          <span className="animate-pulse">|</span>
        </h1>

        {/* TEXT */}
        <p className="
          mt-6 text-base md:text-lg
          text-gray-600 dark:text-gray-300
          transition-all duration-500
          hover:text-blue-600 dark:hover:text-blue-400
          hover:scale-105 hover:font-semibold
        ">
          Bu platformada video darslarni ko‘rib, savollaringizni berishingiz mumkin.
          Har bir video mukammal tushuntirilgan va testlar bilan mustahkamlanadi.
        </p>

        <p className="
          mt-4 text-sm md:text-md
          text-gray-500 dark:text-gray-400
          transition-all duration-500
          hover:text-purple-600 dark:hover:text-purple-400
          hover:scale-105 hover:italic
        ">
          Support jamoamiz yordamida tezroq o‘rganing 🚀
        </p>

        {/* 📱 MOBILE IMAGE */}
        <div className="mt-8 md:hidden">
          <img
            src="/video1.jpg"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleStart}
          disabled={loading}
          className="
            mt-10 px-8 py-4 rounded-full
            bg-gradient-to-r from-blue-500 to-purple-500
            text-white font-semibold
            shadow-xl
            hover:scale-110 hover:shadow-2xl
            transition-all duration-300
            disabled:opacity-50
          "
        >
          {loading ? "Tekshirilmoqda..." : "Darslarni boshlash"}
        </button>

      </div>
    </div>
  )
}

/* 🔥 FLOATING IMAGE */

function FloatingImage({ src, className, type }: any) {
  const animationClass =
    type === "fast"
      ? "animate-float-fast"
      : type === "slow"
      ? "animate-float-slow"
      : "animate-float-reverse"

  return (
    <div
      className={`
        absolute
        w-40 h-40 md:w-80 md:h-80
        ${className}
        ${animationClass}
      `}
    >
      <div className="relative w-full h-full group">
        <div className="
          w-full h-full rounded-3xl overflow-hidden
          shadow-2xl
          transition-all duration-500
          group-hover:scale-110 group-hover:-translate-y-4
        ">
          <Image src={src} alt="" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}