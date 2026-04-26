"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function StatsSection() {
  const fullText =
    "Rivojlanishingizni kuzating"

  const [text, setText] =
    useState("")
  const [index, setIndex] =
    useState(0)

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
    }, 120)

    return () =>
      clearInterval(timer)
  }, [index])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-100 dark:from-[#020617] dark:via-[#0f172a] dark:to-[#111827]">

      {/* Glow */}
      <div className="absolute left-[-70px] top-[-70px] h-56 w-56 md:left-[-80px] md:top-[-80px] md:h-80 md:w-80 rounded-full bg-green-400/20 blur-3xl" />
      <div className="absolute bottom-[-80px] right-[-60px] h-64 w-64 md:bottom-[-100px] md:right-[-80px] md:h-96 md:w-96 rounded-full bg-blue-400/20 blur-3xl" />

      {/* Desktop Floating Images */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        <FloatingImage
          src="/STATISTIK1.jpg"
          className="top-[8%] left-[5%]"
          type="fast"
        />
        <FloatingImage
          src="/STATISTIK2.png"
          className="top-[12%] right-[7%]"
          type="slow"
        />
        <FloatingImage
          src="/STATISTIK3.jpg"
          className="bottom-[10%] left-[8%]"
          type="reverse"
        />
        <FloatingImage
          src="/STATISTIK4.jpg"
          className="bottom-[8%] right-[10%]"
          type="slow"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6 md:px-8">

        {/* Badge */}
        <div className="mb-4 rounded-full border border-green-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-green-600 shadow-md backdrop-blur sm:px-4 sm:py-2 sm:text-sm dark:border-white/10 dark:bg-white/5 dark:text-green-300">
          📈 Aqilli Progres Sistemasi!
        </div>

        {/* Title */}
        <div className="flex min-h-[88px] items-center justify-center sm:min-h-[100px] md:min-h-[140px]">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 bg-clip-text text-transparent">
              {text}
            </span>
            <span className="ml-1 animate-pulse text-slate-400">
              |
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:mt-4 sm:text-base md:mt-6 md:text-xl md:leading-8 dark:text-slate-300">
          Har bir dars, test va
          harakatingiz statistikada
          aks etadi. O‘sishingizni
          real vaqtda kuzating va
          yanada motivatsiya oling.
        </p>

        {/* Mobile Image */}
        <div className="mt-5 w-full md:hidden">
          <div className="relative mx-auto h-44 w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/STATISTIK1.jpg"
              alt="Statistika"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-5 grid w-full max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:mt-8 md:grid-cols-4 md:gap-5">
          <StatCard
            value="+85%"
            label="Progress"
            color="green"
          />
          <StatCard
            value="30 kun"
            label="Faol o‘qish"
            color="blue"
          />
          <StatCard
            value="120+"
            label="Darslar"
            color="purple"
          />
          <StatCard
            value="95%"
            label="Natija"
            color="orange"
          />
        </div>

        {/* Bottom Text */}
        <p className="mt-5 text-xs text-slate-500 sm:text-sm md:mt-8 dark:text-slate-400">
          Natijalarni ko‘rib,
          o‘zingizdan faxrlaning 🚀
        </p>
      </div>
    </section>
  )
}

/* Floating Image */
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
  color,
}: any) {
  const colorClass =
    color === "green"
      ? "from-green-500 to-emerald-400"
      : color === "blue"
      ? "from-blue-500 to-cyan-400"
      : color === "purple"
      ? "from-purple-500 to-fuchsia-400"
      : "from-orange-500 to-yellow-400"

  return (
    <div className="rounded-2xl border border-white/30 bg-white/80 p-3 shadow-lg backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:scale-[1.03] md:p-6 dark:border-white/10 dark:bg-white/5">
      <p
        className={`bg-gradient-to-r ${colorClass} bg-clip-text text-lg font-bold text-transparent sm:text-xl md:text-3xl`}
      >
        {value}
      </p>
      <p className="mt-1 text-[11px] text-slate-600 sm:text-xs md:mt-2 md:text-sm dark:text-slate-300">
        {label}
      </p>
    </div>
  )
}