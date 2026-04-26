"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function AiSection() {
  const fullText = "AI bilan gapirib o‘rganing"

  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setText(fullText.slice(0, index))
      setIndex((prev) =>
        prev >= fullText.length ? 0 : prev + 1
      )
    }, 120)

    return () => clearInterval(timer)
  }, [index])

  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">

      {/* Desktop */}
      <div className="hidden lg:block">

        <CornerImage
          src="/AI1.jpg"
          className="top-6 left-16 h-[320px] w-[380px]"
        />
        <CornerImage
          src="/AI2.jpg"
          className="top-6 right-16 h-[320px] w-[380px]"
        />
        <CornerImage
          src="/AI3.jpg"
          className="bottom-6 left-20 h-[330px] w-[390px]"
        />
        <CornerImage
          src="/AI4.jpg"
          className="bottom-6 right-20 h-[330px] w-[390px]"
        />

      </div>

      {/* Mobile */}
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center px-4 py-10 text-center lg:hidden">

        <div className="mb-4 rounded-full border border-indigo-300 bg-white px-5 py-2 text-sm font-semibold text-indigo-700 shadow">
          🤖 Smart AI Teacher
        </div>

        <h1 className="text-4xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            {text}
          </span>
          <span className="animate-pulse text-slate-400">|</span>
        </h1>

        <p className="mt-5 text-lg leading-9 text-slate-600">
          AI siz bilan real suhbat qiladi va xatolaringizni darhol
          to‘g‘rilaydi. Siz gapirasiz — AI tushunadi va rivojlantiradi.
        </p>

        {/* ✅ IMAGE HERE */}
        <div className="relative mt-8 h-56 w-full overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="/AI1.jpg"
            alt="AI"
            fill
            className="object-cover"
          />
        </div>

        {/* Cards */}
        <div className="mt-8 grid w-full grid-cols-2 gap-4">
          <InfoCard value="24/7" label="Online" />
          <InfoCard value="Voice" label="Suhbat" />
          <InfoCard value="Fast" label="Javob" />
          <InfoCard value="Smart" label="Tahlil" />
        </div>

        <p className="mt-6 text-sm text-slate-500">
          Real dialoglar orqali gapirishni o‘rganing 🚀
        </p>
      </div>

      {/* Desktop Center */}
      <div className="relative z-10 mx-auto hidden min-h-screen max-w-5xl flex-col items-center justify-center px-4 text-center lg:flex">

        <div className="mb-5 rounded-full border border-indigo-300 bg-white px-5 py-2 text-sm font-semibold text-indigo-700 shadow">
          🤖 Smart AI Teacher
        </div>

        <h1 className="text-6xl font-extrabold">
          <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            {text}
          </span>
          <span className="animate-pulse text-slate-400">|</span>
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-600">
          AI siz bilan real suhbat qiladi va xatolaringizni darhol
          to‘g‘rilaydi. Siz gapirasiz — AI tushunadi va rivojlantiradi.
        </p>

        <div className="mt-8 grid w-full max-w-2xl grid-cols-4 gap-4">
          <InfoCard value="24/7" label="Online" />
          <InfoCard value="Voice" label="Suhbat" />
          <InfoCard value="Fast" label="Javob" />
          <InfoCard value="Smart" label="Tahlil" />
        </div>

      </div>
    </section>
  )
}

function CornerImage({
  src,
  className,
}: {
  src: string
  className: string
}) {
  return (
    <div className={`absolute hidden overflow-hidden rounded-2xl shadow-2xl lg:block ${className}`}>
      <Image src={src} alt="" fill className="object-cover" />
    </div>
  )
}

function InfoCard({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-xl">
      <p className="text-2xl font-bold text-indigo-600">{value}</p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  )
}