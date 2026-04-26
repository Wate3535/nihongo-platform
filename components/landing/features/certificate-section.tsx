"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export function CertificateSection() {
  const fullText = "Sertifikat qo‘lga kiriting"

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
    <section
      className="
      relative overflow-hidden
      min-h-screen
      bg-gradient-to-br
      from-yellow-50 via-white to-orange-100
      dark:from-[#020617]
      dark:via-[#0f172a]
      dark:to-[#111827]
    "
    >
      {/* Glow */}
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-yellow-300/20 blur-3xl" />
      <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-orange-300/20 blur-3xl" />

      {/* Desktop Images */}
      <div className="hidden lg:block">

        {/* Top Left */}
        <CornerImage
          src="/SERTIFIKAT1.jpg"
          className="top-6 left-16 h-[320px] w-[380px] rotate-[-2deg]"
        />

        {/* Top Right */}
        <CornerImage
          src="/SERTIFIKAT2.jpg"
          className="top-6 right-16 h-[320px] w-[380px] rotate-[2deg]"
        />

        {/* Bottom Left */}
        <CornerImage
          src="/SERTIFIKAT3.jpg"
          className="bottom-6 left-20 h-[330px] w-[390px] rotate-[1deg]"
        />

        {/* Bottom Right */}
        <CornerImage
          src="/SERTIFIKAT4.jpg"
          className="bottom-6 right-20 h-[330px] w-[390px] rotate-[-1deg]"
        />
      </div>

      {/* Center Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">

        <div className="mb-5 rounded-full border border-yellow-300 bg-white/80 px-5 py-2 text-sm font-semibold text-yellow-700 shadow-md backdrop-blur">
          🏆 Rag‘batlantirish!
        </div>

        <h1 className="min-h-[90px] text-4xl font-extrabold sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
            {text}
          </span>
          <span className="ml-1 animate-pulse text-slate-400">
            |
          </span>
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
          Kurslarni yakunlab, rasmiy sertifikat qo‘lga kiriting va
          bilimlaringizni ishonch bilan tasdiqlang.
        </p>

        {/* Cards */}
        <div className="mt-8 grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
          <InfoCard value="100%" label="Tasdiq" />
          <InfoCard value="PDF" label="Format" />
          <InfoCard value="Share" label="Ulashish" />
          <InfoCard value="Pro" label="Portfolio" />
        </div>

        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          Mehnatingiz natijasi — faxrlanishga arziydi 🏆
        </p>
      </div>

      {/* Mobile */}
      <div className="px-4 pb-10 lg:hidden">
        <div className="relative mx-auto mt-8 h-64 w-full max-w-sm overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="/SERTIFIKAT1.jpg"
            alt="Certificate"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

/* Image */
function CornerImage({
  src,
  className,
}: {
  src: string
  className: string
}) {
  return (
    <div
      className={`absolute z-0 overflow-hidden rounded-2xl shadow-2xl transition duration-500 hover:scale-105 ${className}`}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
      />
    </div>
  )
}

/* Card */
function InfoCard({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="rounded-2xl border border-white/30 bg-white/85 p-4 shadow-xl backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:scale-[1.03]">
      <p className="text-xl font-bold text-yellow-600 md:text-2xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-600 md:text-sm">
        {label}
      </p>
    </div>
  )
}