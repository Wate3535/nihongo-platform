"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function StatsSection() {
  const fullText = "Rivojlanishingizni kuzating"
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)

  // 🔥 typing loop
  useEffect(() => {
    const interval = setInterval(() => {
      setText(fullText.slice(0, index))
      setIndex((prev) => (prev > fullText.length + 10 ? 0 : prev + 1))
    }, 60)

    return () => clearInterval(interval)
  }, [index])

  return (
    <div className="
      relative w-full min-h-screen
      flex items-center justify-center
      overflow-hidden
      bg-gradient-to-br from-green-50 via-white to-blue-100
      dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]
    ">

      {/* 🔥 GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-green-400/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-400/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🔥 FLOATING IMAGES (desktop only) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">

        <FloatingImage src="/STATISTIK1.jpg" className="top-[8%] left-[6%]" type="fast" />
        <FloatingImage src="/STATISTIK2.jpg" className="top-[12%] right-[8%]" type="slow" />
        <FloatingImage src="/STATISTIK3.jpg" className="bottom-[10%] left-[10%]" type="reverse" />
        <FloatingImage src="/STATISTIK4.jpg" className="bottom-[8%] right-[6%]" type="slow" />

      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-3xl px-4 md:px-6">

        {/* TITLE */}
        <h1 className="
          text-3xl md:text-5xl lg:text-6xl
          font-bold
          transition-all duration-500
          hover:scale-110
        ">
          <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            {text}
          </span>
          <span className="animate-pulse">|</span>
        </h1>

        {/* TEXT */}
        <p className="
          mt-6 text-base md:text-lg
          text-gray-600 dark:text-gray-300
          transition-all duration-500
          hover:text-green-600 dark:hover:text-green-400
          hover:scale-105 hover:font-semibold
        ">
          Sizning har bir harakatingiz statistikada aks etadi va rivojlanishingizni aniq ko‘rsatadi.
        </p>

        <p className="
          mt-4 text-sm md:text-md
          text-gray-500 dark:text-gray-400
          transition-all duration-500
          hover:text-blue-600 dark:hover:text-blue-400
          hover:scale-105 hover:italic
        ">
          Natijalarni ko‘rib, o‘zingizdan faxrlanasiz va yanada motivatsiya olasiz 🚀
        </p>

        {/* 🔥 STATS CARDS (UPGRADE) */}
        <div className="mt-10 grid grid-cols-2 gap-6">

          <StatCard value="+85%" label="Progress" color="green" />
          <StatCard value="30 kun" label="Faol o‘qish" color="blue" />
          <StatCard value="120+" label="Darslar" color="purple" />
          <StatCard value="95%" label="Muvaffaqiyat" color="orange" />

        </div>

        {/* 📱 MOBILE IMAGE */}
        <div className="mt-8 md:hidden">
          <img
            src="/STATISTIK1.jpg"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>

        {/* BUTTON */}
        <button className="
          mt-10 px-8 py-4 rounded-full
          bg-gradient-to-r from-green-500 to-blue-500
          text-white font-semibold
          shadow-xl
          hover:scale-110 hover:shadow-2xl
          transition-all duration-300
        ">
          Natijalarni ko‘rish
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
    <div className={`absolute w-40 h-40 md:w-80 md:h-80 ${className} ${animationClass}`}>
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

/* 🔥 STAT CARD */

function StatCard({ value, label, color }: any) {
  const colorClass =
    color === "green"
      ? "from-green-500 to-green-400"
      : color === "blue"
      ? "from-blue-500 to-blue-400"
      : color === "purple"
      ? "from-purple-500 to-purple-400"
      : "from-orange-500 to-orange-400"

  return (
    <div className="
      p-6 rounded-2xl
      bg-white/70 dark:bg-white/5
      backdrop-blur-xl
      shadow-xl
      transition-all duration-500
      hover:scale-110 hover:-translate-y-2
    ">
      <p className={`text-3xl font-bold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
        {value}
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        {label}
      </p>
    </div>
  )
}