"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function JlptSection() {
  const router = useRouter()

  const fullText =
    "JLPT imtihoniga mukammal tayyorlaning"

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
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-100 dark:from-[#020617] dark:via-[#0f172a] dark:to-[#111827]">

      {/* Glow */}
      <div className="absolute left-[-70px] top-[-70px] h-56 w-56 md:left-[-100px] md:top-[-100px] md:h-80 md:w-80 rounded-full bg-red-400/20 blur-3xl" />
      <div className="absolute bottom-[-80px] right-[-60px] h-64 w-64 md:bottom-[-100px] md:right-[-80px] md:h-96 md:w-96 rounded-full bg-orange-400/20 blur-3xl" />

      {/* Desktop Floating Images */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        <FloatingExam
          src="/JLPT1.jpg"
          className="top-[8%] left-[5%]"
          variant="rotate"
        />
        <FloatingExam
          src="/JLPT2.jpg"
          className="top-[12%] right-[7%]"
          variant="scale"
        />
        <FloatingExam
          src="/JPT3.jpg"
          className="bottom-[10%] left-[8%]"
          variant="tilt"
        />
        <FloatingExam
          src="/JLPT4.jpg"
          className="bottom-[8%] right-[10%]"
          variant="pulse"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6 md:px-8">

        {/* Badge */}
        <div className="mb-4 rounded-full border border-red-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-red-600 shadow-md backdrop-blur sm:px-4 sm:py-2 sm:text-sm dark:border-white/10 dark:bg-white/5 dark:text-red-300">
          🎯 JLPTdan O'tish Progesingiz!
        </div>

        {/* Title */}
        <div className="flex min-h-[88px] items-center justify-center sm:min-h-[100px] md:min-h-[140px]">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              {text}
            </span>
            <span className="ml-1 animate-pulse text-slate-400">
              |
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:mt-4 sm:text-base md:mt-6 md:text-xl md:leading-8 dark:text-slate-300">
          N5 dan N1 gacha barcha
          darajalar uchun maxsus
          testlar, mashqlar va real
          imtihon formatidagi
          tayyorgarlik tizimi.
        </p>

        {/* Mobile Image */}
        <div className="mt-5 w-full md:hidden">
          <div className="relative mx-auto h-44 w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/JLPT1.jpg"
              alt="JLPT"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-5 grid w-full max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:mt-8 md:grid-cols-4">
          <FeatureCard
            value="N5-N1"
            label="Darajalar"
          />
          <FeatureCard
            value="500+"
            label="Testlar"
          />
          <FeatureCard
            value="Real"
            label="Mock Exam"
          />
          <FeatureCard
            value="100%"
            label="Tayyorlik"
          />
        </div>

        {/* Button */}
        <div className="mt-6 md:mt-10">
          <button
            onClick={() =>
              router.push(
                "/certificates"
              )
            }
            className="w-full rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition hover:scale-105 hover:shadow-2xl sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
          >
            Sertifikatlarni ko‘rish
          </button>
        </div>

        {/* Bottom Text */}
        <p className="mt-4 text-xs text-slate-500 sm:text-sm md:mt-6 dark:text-slate-400">
          O‘zingizni sinang va
          sertifikat sari yuring 🚀
        </p>
      </div>
    </section>
  )
}

function FloatingExam({
  src,
  className,
  variant,
}: {
  src: string
  className: string
  variant: string
}) {
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

function FeatureCard({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="rounded-2xl border border-white/30 bg-white/80 p-3 shadow-lg backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:scale-[1.03] md:p-5 dark:border-white/10 dark:bg-white/5">
      <p className="text-lg font-bold text-red-500 sm:text-xl md:text-2xl dark:text-red-300">
        {value}
      </p>
      <p className="mt-1 text-[11px] text-slate-600 sm:text-xs md:text-sm dark:text-slate-300">
        {label}
      </p>
    </div>
  )
}