"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

import { ProgressCards } from "@/components/dashboard/progress-cards"
import { ContinueLearning } from "@/components/dashboard/continue-learning"
import { RecentLessons } from "@/components/dashboard/recent-lessons"
import { motion } from "framer-motion"

export default function DashboardPage() {

  const router = useRouter()

  // 🔥 TIMER STATE
  const [seconds, setSeconds] = useState(0)

  // 🔥 TIMER START
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // ⏱ FORMAT
  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    checkAccess()
  }, [])

  const checkAccess = async () => {

    const { data: authData } = await supabase.auth.getUser()

    if (!authData?.user) {
      router.push("/login")
      return
    }

    const { data: profile } = await supabase
      .from("users")
      .select("paid")
      .eq("id", authData.user.id)
      .maybeSingle()

    if (!profile?.paid) {
      router.push("/tolov")
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
  {/* 🔥 HEADER */}
<div className="mb-10">

  <div className="relative flex flex-col items-start">

    {/* XUSH KELIBSIZ */}
    <motion.h1
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.05,
      }}
      transition={{
        duration: 0.22,
      }}
      className="inline-block cursor-pointer text-4xl font-extrabold tracking-tight text-foreground hover:text-primary"
    >
      Xush kelibsiz
    </motion.h1>

    {/* SUBTITLE */}
    <motion.p
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.02,
      }}
      transition={{
        duration: 0.22,
        delay: 0.08,
      }}
      className="mt-8 inline-block cursor-pointer rounded-full border border-transparent px-5 py-2.5 text-lg font-medium text-muted-foreground hover:border-primary hover:bg-primary/5 hover:text-foreground"
    >
      Bu hafta o‘qish jarayoningiz
    </motion.p>

  </div>

</div>

{/* TOP CARDLAR */}
<motion.div
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.45,
    delay: 0.1,
  }}
>
  <ProgressCards />
</motion.div>

{/* PASTKI QISM */}
<div className="mt-8 grid gap-8 lg:grid-cols-5">

  <motion.div
    className="lg:col-span-3"
    initial={{
      opacity: 0,
      x: -20,
    }}
    animate={{
      opacity: 1,
      x: 0,
    }}
    transition={{
      duration: 0.45,
      delay: 0.18,
    }}
  >
    <ContinueLearning />
  </motion.div>

  <motion.div
    className="lg:col-span-2"
    initial={{
      opacity: 0,
      x: 20,
    }}
    animate={{
      opacity: 1,
      x: 0,
    }}
    transition={{
      duration: 0.45,
      delay: 0.22,
    }}
  >
    <RecentLessons />
  </motion.div>

</div>

</div>
)
}