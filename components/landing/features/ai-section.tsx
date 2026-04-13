"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function AiSection() {
  const fullText = "AI bilan gapirib o‘rganing"
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)

  // 🔥 LOOP TYPING EFFECT
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
      bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100
      dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]
    ">

      {/* 🔥 FLOATING IMAGES (faqat desktop) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <FloatingImage src="/AI1.jpg" className="top-[8%] left-[6%]" type="fast" />
        <FloatingImage src="/AI2.jpg" className="top-[12%] right-[8%]" type="slow" />
        <FloatingImage src="/AI3.jpg" className="bottom-[10%] left-[10%]" type="reverse" />
        <FloatingImage src="/AI4.jpg" className="bottom-[8%] right-[6%]" type="slow" />
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
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {text}
          </span>
          <span className="animate-pulse">|</span>
        </h1>

        {/* TEXT 1 */}
        <p className="
          mt-6 text-base md:text-lg
          text-gray-600 dark:text-gray-300
          transition-all duration-500
          hover:text-indigo-600 dark:hover:text-indigo-400
          hover:scale-105 hover:font-semibold
        ">
          AI siz bilan real suhbat qiladi va xatolaringizni darhol to‘g‘rilaydi.
          Siz gapirasiz — AI tushunadi va sizni rivojlantiradi.
        </p>

        {/* TEXT 2 */}
        <p className="
          mt-4 text-sm md:text-md
          text-gray-500 dark:text-gray-400
          transition-all duration-500
          hover:text-purple-600 dark:hover:text-purple-400
          hover:scale-105 hover:italic
        ">
          24/7 mashq qiling, real dialoglar orqali gapirishni o‘rganing 🚀
        </p>

        {/* MOBILE IMAGE */}
        <div className="mt-8 md:hidden">
          <img
            src="/AI1.jpg"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>

        

      </div>
    </div>
  )
}

/* FLOATING IMAGE */
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