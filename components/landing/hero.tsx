"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useState, useMemo } from "react"
import { DemoVideoModal } from "@/components/demo-video-modal"
import { motion } from "framer-motion"

export function Hero() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // 🌍 Current season
  const season = useMemo(() => {
    const month = new Date().getMonth() + 1
    if (month >= 3 && month <= 5) return "spring"
    if (month >= 6 && month <= 8) return "summer"
    if (month >= 9 && month <= 11) return "autumn"
    return "winter"
  }, [])

  // 🖼 Background images
  const bgImage = useMemo(() => {
    if (season === "spring") return "/sakura.jpg"
    if (season === "summer") return "/yoz-bambo.jpg"
    if (season === "autumn") return "/kuz.jpg"
    return "/qish.jpg"
  }, [season])

  // 🔥 Button logic
  const handleBuy = async () => {
    if (loading) return
    setLoading(true)

    try {
      const { data: authData } = await supabase.auth.getUser()

      if (!authData?.user) {
        router.push("/login?redirect=/tolov")
        return
      }

      const userId = authData.user.id

      const { data: enrollment } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle()

      if (enrollment?.status === "approved") {
        router.push("/dashboard")
      } else {
        router.push("/tolov")
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  // 🌸 Spring Sakura
  const SpringAnimation = () => {
    const petals = Array.from({ length: 24 })

    return (
      <>
        {petals.map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-pink-300/80 shadow-lg"
            style={{
              width: `${6 + (i % 4)}px`,
              height: `${8 + (i % 4)}px`,
              left: `${Math.random() * 100}%`,
              top: "-10%",
              borderRadius: "50% 60% 40% 60%",
              filter: "blur(0.4px)",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, 30, -20, 15, -10],
              rotate: [0, 80, 180, 360],
              opacity: [0.9, 1, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear",
            }}
          />
        ))}
      </>
    )
  }

  // 🍂 Autumn Leaves
  const AutumnAnimation = () => {
    const leaves = Array.from({ length: 22 })

    return (
      <>
        {leaves.map((_, i) => (
          <motion.span
            key={i}
            className="absolute"
            style={{
              width: `${8 + (i % 4)}px`,
              height: `${10 + (i % 4)}px`,
              left: `${Math.random() * 100}%`,
              top: "-10%",
              background:
                i % 2 === 0
                  ? "linear-gradient(to bottom,#f59e0b,#dc2626)"
                  : "linear-gradient(to bottom,#fb923c,#b45309)",
              borderRadius: "50% 10% 50% 10%",
              filter: "blur(0.3px)",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, 40, -25, 20],
              rotate: [0, 120, 240, 360],
              opacity: [1, 1, 0.7, 0.4],
            }}
            transition={{
              duration: 9 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.35,
              ease: "linear",
            }}
          />
        ))}
      </>
    )
  }

  // ❄ Winter Snow
  const WinterAnimation = () => {
    const snow = Array.from({ length: 40 })

    return (
      <>
        {snow.map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/90"
            style={{
              width: `${2 + (i % 5)}px`,
              height: `${2 + (i % 5)}px`,
              left: `${Math.random() * 100}%`,
              top: "-10%",
              filter: "blur(0.5px)",
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, 10, -10, 5],
              opacity: [0.2, 1, 0.8, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "linear",
            }}
          />
        ))}
      </>
    )
  }
const SummerAnimation = () => {
  const rays = Array.from({ length: 4 }, (_, i) => i)
  const leaves = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 16 + Math.random() * 18,
    delay: Math.random() * 4,
    duration: 6 + Math.random() * 5,
    rotate: Math.random() * 180,
  }))
  const lights = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 4 + Math.random() * 4,
    delay: Math.random() * 3,
  }))

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {/* 🌞 Light Rays */}
      {rays.map((i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute top-[-15%] blur-[140px] rounded-full"
          style={{
            left: `${12 + i * 18}%`,
            width: `${280 + i * 50}px`,
            height: "145%",
            background:
              i % 2 === 0
                ? "rgba(255,255,180,0.20)"
                : "rgba(220,255,200,0.16)",
            transform: `rotate(${i % 2 === 0 ? 12 : -14}deg)`,
          }}
          animate={{
            opacity: [0.16, 0.38, 0.16],
            scale: [1, 1.05, 1],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🍃 Natural Flying Leaves */}
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute"
          style={{
            width: `${leaf.size}px`,
            height: `${leaf.size / 2.8}px`,
            left: `${leaf.left}%`,
            top: `${leaf.top}%`,
            borderRadius: "100% 0 100% 0",
            background:
              leaf.id % 2 === 0
                ? "linear-gradient(to right,#bbf7d0,#22c55e)"
                : "linear-gradient(to right,#86efac,#15803d)",
            boxShadow: "0 0 10px rgba(255,255,255,0.12)",
            rotate: `${leaf.rotate}deg`,
            opacity: 0.9,
          }}
          animate={{
            x: [0, 30, -20, 40, -10],
            y: [0, -18, 12, -8, 0],
            rotate: [
              leaf.rotate,
              leaf.rotate + 20,
              leaf.rotate - 15,
              leaf.rotate + 10,
            ],
            opacity: [0.5, 1, 0.7, 1, 0.5],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ✨ Floating Lights */}
      {lights.map((light) => (
        <motion.span
          key={light.id}
          className="absolute rounded-full"
          style={{
            width: `${light.size}px`,
            height: `${light.size}px`,
            left: `${light.left}%`,
            top: `${light.top}%`,
            background:
              light.id % 2 === 0
                ? "rgba(255,255,180,1)"
                : "rgba(220,255,220,0.95)",
            boxShadow:
              light.id % 2 === 0
                ? "0 0 16px rgba(255,255,180,1)"
                : "0 0 16px rgba(180,255,180,0.95)",
          }}
          animate={{
            opacity: [0.1, 1, 0.1],
            scale: [1, 1.8, 1],
            y: [0, -20, 0],
            x: [0, 8, -6, 0],
          }}
          transition={{
            duration: 3 + (light.id % 3),
            repeat: Infinity,
            delay: light.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🌫 Ambient Bottom Glow */}
      <motion.div
        className="absolute bottom-[-10%] left-1/4 w-[520px] h-[260px] rounded-full bg-green-200/15 blur-[140px]"
        animate={{
          opacity: [0.1, 0.24, 0.1],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center text-center text-white">
      {/* Background */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/35 via-black/55 to-black/80" />

      {/* Season Animation */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {season === "spring" && <SpringAnimation />}
        {season === "summer" && <SummerAnimation />}
        {season === "autumn" && <AutumnAnimation />}
        {season === "winter" && <WinterAnimation />}
      </div>

   {/* Content */}
<div className="z-10 max-w-5xl px-4 md:px-6">
  {/* Badge */}
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="
      inline-flex items-center
      px-7 md:px-9 py-3 md:py-4 mb-6
      rounded-full
      bg-white/5
      backdrop-blur-md
      border border-white/15
      shadow-2xl shadow-black/20
    "
  >
    {/* Typing Text */}
    <motion.span
      initial={{ width: 0 }}
      animate={{ width: ["0%", "100%", "100%", "0%"] }}
      transition={{
        duration: 12,
        times: [0, 0.68, 0.82, 1],
        repeat: Infinity,
        repeatDelay: 0.8,
        ease: "easeInOut",
      }}
      className="
        overflow-hidden
        whitespace-nowrap
        inline-block
        text-base md:text-xl font-bold
        text-white/95
        drop-shadow-[0_0_12px_rgba(255,255,255,0.10)]
      "
    >
      Yapon tilini oson va tizimli o‘rganing...
    </motion.span>

    {/* Cursor */}
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        ml-1
        text-pink-300
        text-lg md:text-2xl
        font-bold
      "
    >
      |
    </motion.span>
  </motion.div>

       {/* Title */}
<motion.h1
  initial={{ opacity: 0, y: 35 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
  className="
    text-3xl sm:text-5xl lg:text-6xl
    font-bold leading-tight
    cursor-default
    select-none
    flex flex-wrap justify-center gap-x-3 gap-y-2
  "
>
  {[
    "Yapon",
    "tilini",
    "tez",
    "va",
    "oson",
    "o‘rganing",
  ].map((word, i) => (
    <motion.span
      key={i}
      whileHover={{
        scale: 1.12,
        y: -4,
        textShadow: "0px 8px 20px rgba(255,255,255,0.18)",
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className="inline-block"
    >
      {word}
    </motion.span>
  ))}

  <motion.span
    whileHover={{
      scale: 1.14,
      y: -4,
      transition: { duration: 0.25 },
    }}
    className="inline-block bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent"
  >
    Ishonch
  </motion.span>

  <motion.span
    whileHover={{
      scale: 1.12,
      y: -4,
      transition: { duration: 0.25 },
    }}
    className="inline-block"
  >
    bilan
  </motion.span>

  <motion.span
    whileHover={{
      scale: 1.12,
      y: -4,
      transition: { duration: 0.25 },
    }}
    className="inline-block"
  >
  
  </motion.span>

  <motion.span
    whileHover={{
      scale: 1.14,
      y: -4,
      transition: { duration: 0.25 },
    }}
    className="inline-block bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent"
  >
    Natija
  </motion.span>

  <motion.span
    whileHover={{
      scale: 1.12,
      y: -4,
      transition: { duration: 0.25 },
    }}
    className="inline-block"
  >
    oling
  </motion.span>
</motion.h1>

       {/* Subtitle */}
<motion.p
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.45, duration: 0.8 }}
  className="
    mt-6
    text-base sm:text-xl md:text-2xl
    text-white/90 font-medium
    flex flex-wrap justify-center gap-x-2 gap-y-2
  "
>
  {[
    "Yordamchingiz",
    "bilan",
    "gapirishni",
    "o‘rganing",
    "va",
    "real",
    "suhbat",
    "darajasiga",
    "chiqing",
  ].map((word, i) => (
    <span key={i} className="relative inline-block group cursor-pointer">
      <span className="relative z-10">{word}</span>

      {/* Blue underline on hover */}
      <span
        className="
          absolute left-0 -bottom-1 h-[2px] w-full
          bg-cyan-400 rounded-full
          scale-x-0 group-hover:scale-x-100
          origin-left
          transition-transform duration-300
        "
      />

    </span>
  ))}
</motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={handleBuy}
            disabled={loading}
            className="h-12 md:h-14 px-6 md:px-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-base md:text-lg font-bold shadow-2xl hover:scale-105 hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Kuting..." : "Kursni boshlash"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <DemoVideoModal />
        </motion.div>
      </div>
    </section>
  )
}