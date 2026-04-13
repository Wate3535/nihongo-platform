"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function CertificateSection() {
  const fullText = "Sertifikat qo‘lga kiriting"
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
      bg-gradient-to-br from-yellow-50 via-white to-orange-100
      dark:from-[#020617] dark:via-[#020617] dark:to-[#020617]
    ">

      {/* 🔥 GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-yellow-400/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-orange-400/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🔥 FLOATING CERTIFICATES (desktop only) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">

        <CertificateCard src="/SERTIFIKAT1.jpg" className="left-[8%] top-[15%]" type="float" />
        <CertificateCard src="/SERTIFIKAT2.jpg" className="right-[8%] top-[20%]" type="rotate" />
        <CertificateCard src="/SERTIFIKAT3.jpg" className="bottom-[12%] left-[20%]" type="pulse" />
        <CertificateCard src="/SERTIFIKAT4.jpg" className="bottom-[10%] right-[8%]" type="wave" />

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
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            {text}
          </span>
          <span className="animate-pulse">|</span>
        </h1>

        {/* TEXT */}
        <p className="
          mt-6 text-base md:text-lg
          text-gray-600 dark:text-gray-300
          transition-all duration-500
          hover:text-yellow-600 dark:hover:text-yellow-400
          hover:scale-105 hover:font-semibold
        ">
          Kurslarni yakunlab, rasmiy sertifikat qo‘lga kiriting va bilimlaringizni tasdiqlang.
        </p>

        <p className="
          mt-4 text-sm md:text-md
          text-gray-500 dark:text-gray-400
          transition-all duration-500
          hover:text-orange-600 dark:hover:text-orange-400
          hover:scale-105 hover:italic
        ">
          Bu sizning mehnatingiz natijasi — faxrlanishga arziydi 🏆
        </p>

        {/* 📱 MOBILE IMAGE */}
        <div className="mt-8 md:hidden">
          <img
            src="/SERTIFIKAT1.jpg"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>

      </div>
    </div>
  )
}

/* 🎓 CERTIFICATE CARD */

function CertificateCard({ src, className, type }: any) {
  const animation =
    type === "float"
      ? "animate-float-slow"
      : type === "rotate"
      ? "animate-rotate-slow"
      : type === "pulse"
      ? "animate-pulse-slow"
      : "animate-wave"

  return (
    <div
      className={`
        absolute
        w-44 h-32 md:w-96 md:h-64
        ${className}
        ${animation}
      `}
    >
      <div className="relative w-full h-full group">

        <div className="
          absolute inset-0
          bg-gradient-to-r from-transparent via-white/40 to-transparent
          opacity-0 group-hover:opacity-100
          animate-shine pointer-events-none
        " />

        <div className="
          w-full h-full rounded-2xl overflow-hidden
          shadow-2xl border border-white/20
          transition-all duration-500
          group-hover:scale-110 group-hover:-translate-y-4
        ">
          <Image src={src} alt="" fill className="object-cover" />
        </div>

      </div>
    </div>
  )
}