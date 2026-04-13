"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function CommunitySection() {
  const fullText = "Hamjamiyat bilan birga o‘rganing"
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)

  // 🔥 typing loop
  useEffect(() => {
    const interval = setInterval(() => {
      setText(fullText.slice(0, index))
      setIndex((prev) => (prev > fullText.length + 10 ? 0 : prev + 1))
    }, 50)

    return () => clearInterval(interval)
  }, [index])

  return (
    <div className="
      relative w-full min-h-screen
      flex items-center justify-center
      overflow-hidden
      bg-gradient-to-br from-pink-50 via-white to-purple-100
      dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]
    ">

      {/* 🔥 GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-pink-400/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-400/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🔥 FLOATING IMAGES (desktop only) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">

        <CommunityCard src="/JAMIYAT1.jpg" className="top-[10%] left-[8%]" type="float" />
        <CommunityCard src="/JAMIYAT2.jpg" className="top-[15%] right-[10%]" type="reverse" />
        <CommunityCard src="/JAMIYAT3.jpg" className="bottom-[12%] left-[12%]" type="rotate" />
        <CommunityCard src="/JAMIYAT4.jpg" className="bottom-[10%] right-[8%]" type="pulse" />

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
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            {text}
          </span>
          <span className="animate-pulse">|</span>
        </h1>

        {/* TEXT */}
        <p className="
          mt-6 text-base md:text-lg
          text-gray-600 dark:text-gray-300
          transition-all duration-500
          hover:text-pink-600 dark:hover:text-pink-400
          hover:scale-105 hover:font-semibold
        ">
          Boshqa o‘quvchilar bilan bog‘laning, tajriba almashing va birgalikda rivojlaning.
        </p>

        <p className="
          mt-4 text-sm md:text-md
          text-gray-500 dark:text-gray-400
          transition-all duration-500
          hover:text-purple-600 dark:hover:text-purple-400
          hover:scale-105 hover:italic
        ">
          Hamjamiyat sizni qo‘llab-quvvatlaydi va motivatsiya beradi 💬
        </p>

        {/* 📱 MOBILE IMAGE */}
        <div className="mt-8 md:hidden">
          <img
            src="/JAMIYAT1.jpg"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>

        {/* BUTTON */}
        <button className="
          mt-10 px-8 py-4 rounded-full
          bg-gradient-to-r from-pink-500 to-purple-500
          text-white font-semibold
          shadow-xl
          hover:scale-110 hover:shadow-2xl
          transition-all duration-300
        ">
          Hamjamiyatga qo‘shilish
        </button>

      </div>
    </div>
  )
}

/* 💬 COMMUNITY CARD */

function CommunityCard({ src, className, type }: any) {
  const animation =
    type === "float"
      ? "animate-float-fast"
      : type === "reverse"
      ? "animate-float-reverse"
      : type === "rotate"
      ? "animate-rotate-slow"
      : "animate-pulse-slow"

  return (
    <div
      className={`
        absolute
        w-40 h-40 md:w-72 md:h-72
        ${className}
        ${animation}
      `}
    >
      <div className="relative w-full h-full group">

        {/* 💬 CHAT */}
        <div className="
          absolute -top-4 left-6 px-3 py-1 text-xs rounded-full
          bg-white dark:bg-gray-800 shadow
          opacity-0 group-hover:opacity-100
          transition-all duration-300
        ">
          👋 Salom!
        </div>

        <div className="
          w-full h-full rounded-3xl overflow-hidden
          shadow-2xl
          transition-all duration-500
          group-hover:scale-110 group-hover:-translate-y-3
        ">
          <Image src={src} alt="" fill className="object-cover" />
        </div>

      </div>
    </div>
  )
}