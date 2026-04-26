"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export function VideoSection() {
  const fullText =
    "Video darslar orqali tez va oson o‘rganing"

  const [text, setText] =
    useState("")
  const [index, setIndex] =
    useState(0)
  const [loading, setLoading] =
    useState(false)

  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setText(
        fullText.slice(0, index)
      )

      setIndex((prev) =>
        prev >= fullText.length
          ? 0
          : prev + 1
      )
    }, 100)

    return () =>
      clearInterval(timer)
  }, [index])

  async function handleStart() {
    setLoading(true)

    const { data } =
      await supabase.auth.getUser()

    const user = data.user

    if (!user) {
      router.push("/register")
      return
    }

    if (
      !user.email_confirmed_at
    ) {
      alert(
        "Emailingizni tasdiqlang 📩"
      )
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100 dark:from-[#020617] dark:via-[#0f172a] dark:to-[#111827]">

      {/* Glow */}
      <div className="absolute left-[-70px] top-[-70px] h-56 w-56 md:left-20 md:top-20 md:h-72 md:w-72 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute bottom-[-80px] right-[-60px] h-64 w-64 md:bottom-10 md:right-20 md:h-80 md:w-80 rounded-full bg-purple-500/20 blur-3xl" />

      {/* Desktop Floating Images */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        <FloatingImage
          src="/video1.jpg"
          className="top-[8%] left-[5%]"
          type="fast"
        />
        <FloatingImage
          src="/video2.jpg"
          className="top-[12%] right-[7%]"
          type="slow"
        />
        <FloatingImage
          src="/video3.jpg"
          className="bottom-[10%] left-[8%]"
          type="reverse"
        />
        <FloatingImage
          src="/video4.jpg"
          className="bottom-[8%] right-[10%]"
          type="slow"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6 md:px-8">

        {/* Badge */}
        <div className="mb-4 rounded-full border border-blue-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-blue-600 shadow-md backdrop-blur sm:px-4 sm:py-2 sm:text-sm dark:border-white/10 dark:bg-white/5 dark:text-blue-300">
          🇯🇵 Nihongo Premium Learning
        </div>

        {/* Title */}
        <div className="flex min-h-[88px] items-center justify-center sm:min-h-[100px] md:min-h-[140px]">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {text}
            </span>
            <span className="ml-1 animate-pulse text-slate-400">
              |
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:mt-4 sm:text-base md:mt-6 md:text-xl md:leading-8 dark:text-slate-300">
          Video darslar, testlar,
          AI Ustoz va progress
          tizimi orqali yapon
          tilini professional
          darajada o‘rganing.
        </p>

        {/* Mobile Compact Image */}
        <div className="mt-5 w-full md:hidden">
          <div className="relative mx-auto h-44 w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/video1.jpg"
              alt="Video Learning"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid w-full max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:mt-8 md:grid-cols-4">
          <StatCard
            value="300+"
            label="Darslar"
          />
          <StatCard
            value="24/7"
            label="AI Ustoz"
          />
          <StatCard
            value="1000+"
            label="Talaba"
          />
          <StatCard
            value="N5-N1"
            label="JLPT"
          />
        </div>

        {/* Button */}
        <div className="mt-6 md:mt-10">
          <button
            onClick={handleStart}
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition hover:scale-105 hover:shadow-2xl disabled:opacity-50 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
          >
            {loading
              ? "Tekshirilmoqda..."
              : "Darslarni boshlash"}
          </button>
        </div>

        {/* Bottom Text */}
        <p className="mt-4 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
          Support jamoamiz bilan
          tezroq o‘rganing 🚀
        </p>
      </div>
    </section>
  )
}

/* Desktop Floating Image */
function FloatingImage({
  src,
  className,
  type,
}: any) {
  const animation =
    type === "fast"
      ? "animate-float-fast"
      : type === "slow"
      ? "animate-float-slow"
      : "animate-float-reverse"

  return (
    <div
      className={`absolute h-44 w-44 md:h-72 md:w-72 ${className} ${animation}`}
    >
      <div className="group relative h-full w-full">
        <div className="h-full w-full overflow-hidden rounded-3xl shadow-2xl transition duration-500 group-hover:-translate-y-3 group-hover:scale-105">
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

/* Stat Card */
function StatCard({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="rounded-2xl border border-white/30 bg-white/80 px-4 py-3 shadow-lg backdrop-blur transition duration-500 hover:-translate-y-1 hover:scale-[1.03] md:px-5 md:py-4 dark:border-white/10 dark:bg-white/5">
      <p className="text-lg font-bold text-blue-600 sm:text-xl md:text-2xl dark:text-blue-300">
        {value}
      </p>
      <p className="text-[11px] text-slate-600 sm:text-xs md:text-sm dark:text-slate-300">
        {label}
      </p>
    </div>
  )
}