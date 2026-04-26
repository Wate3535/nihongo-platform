"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function CommunitySection() {
  const router = useRouter()

  const fullText =
    "Hamjamiyat bilan birga o‘rganing"

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
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-100 dark:from-[#020617] dark:via-[#0f172a] dark:to-[#111827]">

      {/* Glow */}
      <div className="absolute left-[-70px] top-[-70px] h-56 w-56 md:left-[-100px] md:top-[-100px] md:h-80 md:w-80 rounded-full bg-pink-400/20 blur-3xl" />
      <div className="absolute bottom-[-80px] right-[-60px] h-64 w-64 md:bottom-[-100px] md:right-[-80px] md:h-96 md:w-96 rounded-full bg-purple-400/20 blur-3xl" />

      {/* Desktop Floating Cards */}
      <div className="absolute inset-0 hidden md:block pointer-events-none">
        <CommunityCard
          src="/JAMIYAT1.jpg"
          className="top-[8%] left-[5%]"
          type="float"
        />
        <CommunityCard
          src="/JAMIYAT2.jpg"
          className="top-[12%] right-[7%]"
          type="reverse"
        />
        <CommunityCard
          src="/JAMIYAT3.jpg"
          className="bottom-[10%] left-[8%]"
          type="rotate"
        />
        <CommunityCard
          src="/JAMIYAT4.jpg"
          className="bottom-[8%] right-[10%]"
          type="pulse"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6 md:px-8">

        {/* Badge */}
        <div className="mb-4 rounded-full border border-pink-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-pink-600 shadow-md backdrop-blur sm:px-4 sm:py-2 sm:text-sm dark:border-white/10 dark:bg-white/5 dark:text-pink-300">
          💬 Hamjamiyat Kuchi!
        </div>

        {/* Title */}
        <div className="flex min-h-[88px] items-center justify-center sm:min-h-[100px] md:min-h-[140px]">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              {text}
            </span>
            <span className="ml-1 animate-pulse text-slate-400">
              |
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:mt-4 sm:text-base md:mt-6 md:text-xl md:leading-8 dark:text-slate-300">
          Boshqa o‘quvchilar bilan
          bog‘laning, tajriba
          almashing va birgalikda
          rivojlaning. Motivatsiya
          hamjamiyat bilan kuchliroq.
        </p>

        {/* Mobile Image */}
        <div className="mt-5 w-full md:hidden">
          <div className="relative mx-auto h-44 w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/JAMIYAT1.jpg"
              alt="Community"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-5 grid w-full max-w-4xl grid-cols-2 gap-3 sm:gap-4 md:mt-8 md:grid-cols-4">
          <FeatureCard
            value="1000+"
            label="A’zolar"
          />
          <FeatureCard
            value="24/7"
            label="Faollik"
          />
          <FeatureCard
            value="Live"
            label="Muloqot"
          />
          <FeatureCard
            value="Strong"
            label="Motivatsiya"
          />
        </div>

        {/* Button */}
        <div className="mt-6 md:mt-10">
          <button
            onClick={() =>
              router.push(
                "/community"
              )
            }
            className="w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition hover:scale-105 hover:shadow-2xl sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
          >
            Hamjamiyatga qo‘shilish
          </button>
        </div>

        {/* Bottom Text */}
        <p className="mt-4 text-xs text-slate-500 sm:text-sm md:mt-6 dark:text-slate-400">
          Birga o‘rganish —
          tezroq natija 🚀
        </p>
      </div>
    </section>
  )
}

function CommunityCard({
  src,
  className,
  type,
}: {
  src: string
  className: string
  type: string
}) {
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
      className={`absolute h-44 w-44 md:h-72 md:w-72 ${className} ${animation}`}
    >
      <div className="group relative h-full w-full">
        <div className="absolute -top-4 left-6 rounded-full bg-white px-3 py-1 text-xs shadow opacity-0 transition duration-300 group-hover:opacity-100 dark:bg-gray-800">
          👋 Salom!
        </div>

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
      <p className="text-lg font-bold text-pink-500 sm:text-xl md:text-2xl dark:text-pink-300">
        {value}
      </p>
      <p className="mt-1 text-[11px] text-slate-600 sm:text-xs md:text-sm dark:text-slate-300">
        {label}
      </p>
    </div>
  )
}