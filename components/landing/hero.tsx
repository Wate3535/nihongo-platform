"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useState, useMemo } from "react"
import { DemoVideoModal } from "@/components/demo-video-modal"

export function Hero() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // 🔥 SEASON BACKGROUND
  const bgImage = useMemo(() => {
    const month = new Date().getMonth() + 1
    if (month >= 3 && month <= 5) return "/sakura.jpg"
    if (month >= 6 && month <= 8) return "/yoz-bambo.jpg"
    if (month >= 9 && month <= 11) return "/kuz.jpg"
    return "/qish.jpg"
  }, [])

  // 🔥 BUTTON LOGIC (FIXED)
  const handleBuy = async () => {
    if (loading) return
    setLoading(true)

    try {
      const { data: authData } = await supabase.auth.getUser()

      // ❌ user yo‘q → login
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

      // ✅ agar approved bo‘lsa
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

  return (
    <section className="
      relative
      w-full h-screen
      flex items-center justify-center
      text-center text-white
      overflow-hidden
    ">

      {/* 🌸 BACKGROUND */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      {/* 🌑 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60 -z-10" />

      {/* ✨ CONTENT */}
      <div className="z-10 max-w-5xl px-4 md:px-6">

        {/* BADGE */}
        <div className="
          inline-flex items-center gap-2
          px-5 py-2 mb-6
          rounded-full
          bg-white/90 text-black
          text-sm md:text-base font-semibold
          shadow-lg backdrop-blur
        ">
          Yapon tilini oson va tizimli o‘rganing
        </div>

        {/* TITLE */}
        <h1 className="
          text-3xl sm:text-5xl lg:text-6xl
          font-bold leading-tight
        ">
          Yapon tilini tez va oson o‘rganing{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
            Ishonch
          </span>{" "}
          bilan va{" "}
          <span className="bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
            Natija
          </span>{" "}
          oling
        </h1>

        {/* TEXT */}
        <p className="
          mt-6
          text-base sm:text-xl md:text-2xl
          text-white/90 font-medium
          transition-all duration-300
          hover:scale-105
        ">
          Yordamchingiz bilan gapirishni o‘rganing va real suhbat darajasiga chiqing
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">

          <Button
            onClick={handleBuy}
            disabled={loading}
            className="
              h-12 md:h-14 px-6 md:px-8 rounded-full
              bg-gradient-to-r from-indigo-500 to-purple-500
              text-white text-base md:text-lg font-bold
              shadow-xl
              hover:scale-105 hover:shadow-2xl
              transition-all duration-300
              disabled:opacity-50
            "
          >
            {loading ? "Kuting..." : "Kursni boshlash"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <DemoVideoModal />

        </div>

      </div>
    </section>
  )
}