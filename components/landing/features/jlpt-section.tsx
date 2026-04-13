"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function JlptSection() {
  const fullText = "JLPT imtihoniga mukammal tayyorlaning"
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
      bg-gradient-to-br from-red-50 via-white to-orange-100
      dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]
    ">

      {/* 🔥 GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-red-400/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-orange-400/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🔥 FLOATING IMAGES (desktop only) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">

        <FloatingExam src="/JLPT1.jpg" className="top-[10%] left-[8%]" variant="rotate" />
        <FloatingExam src="/JLPT2.jpg" className="top-[15%] right-[10%]" variant="scale" />
        <FloatingExam src="/JPT3.jpg" className="bottom-[12%] left-[12%]" variant="tilt" />
        <FloatingExam src="/JLPT4.jpg" className="bottom-[10%] right-[8%]" variant="pulse" />

      </div>

      <div className="relative z-10 text-center max-w-3xl px-4 md:px-6">

       
        <h1 className="
          text-3xl md:text-5xl lg:text-6xl
          font-bold
          transition-all duration-500
          hover:scale-110
        ">
          <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            {text}
          </span>
          <span className="animate-pulse">|</span>
        </h1>

        
        <p className="
          mt-6 text-base md:text-lg
          text-gray-600 dark:text-gray-300
          transition-all duration-500
          hover:text-red-600 dark:hover:text-red-400
          hover:scale-105 hover:font-semibold
        ">
          N5 dan N1 gacha barcha darajalar uchun maxsus tayyorlangan testlar va mashqlar.
        </p>

        <p className="
          mt-4 text-sm md:text-md
          text-gray-500 dark:text-gray-400
          transition-all duration-500
          hover:text-orange-600 dark:hover:text-orange-400
          hover:scale-105 hover:italic
        ">
          Real imtihon muhitini his qilib, o‘zingizni sinab ko‘ring 🎯
        </p>

        {/* 📱 MOBILE IMAGE */}
        <div className="mt-8 md:hidden">
          <img
            src="/JLPT1.jpg"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>

        {/* BUTTON */}
        <button className="
          mt-10 px-8 py-4 rounded-full
          bg-gradient-to-r from-red-500 to-orange-500
          text-white font-semibold
          shadow-xl
          hover:scale-110 hover:shadow-2xl
          transition-all duration-300
        ">
          Testni boshlash
        </button>

      </div>
    </div>
  )
}

/* 🔥 FLOATING EXAM */

function FloatingExam({ src, className, variant }: any) {
  const animation =
    variant === "rotate"
      ? "animate-rotate-slow"
      : variant === "scale"
      ? "animate-scalePulse"
      : variant === "tilt"
      ? "animate-tilt"
      : "animate-pulse-slow"

  return (
    <div
      className={`
        absolute
        w-40 h-40 md:w-80 md:h-80
        ${className}
        ${animation}
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