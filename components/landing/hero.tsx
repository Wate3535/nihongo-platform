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

  const bgImage = useMemo(() => {
    const month = new Date().getMonth() + 1
    if (month >= 3 && month <= 5) return "/sakura.jpg"
    if (month >= 6 && month <= 8) return "/yoz-bambo.jpg"
    if (month >= 9 && month <= 11) return "/kuz.jpg"
    return "/qish.jpg"
  }, [])

  const handleBuy = async () => {
    setLoading(true)

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

    if (enrollment && enrollment.length > 0 && enrollment[0].status === "approved") {
      router.push("/dashboard")
    } else {
      router.push("/tolov")
    }

    setLoading(false)
  }

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">

      {/* BG */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* CONTENT */}
      <div className="z-10 max-w-5xl px-6">

        {/* 🔥 BADGE (FIXED — ENDI SOTADI) */}
        <div className="
          inline-flex items-center gap-2
          px-6 py-3 mb-8
          rounded-full
          bg-white/80 text-black
          text-base font-semibold
          shadow-lg
        ">
          Yapon tilini oson va tizimli o‘rganing
        </div>

        {/* 🔥 TITLE */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
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

       <p className="
  mt-6
  text-xl sm:text-2xl
  text-white font-medium
  transition-all duration-300
  hover:scale-105 hover:text-white/90
">
  Yordamchingiz bilan gapirishni o‘rganing va real suhbat darajasiga chiqing
</p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <Button
            onClick={handleBuy}
            disabled={loading}
           className="
                h-14 px-8 rounded-full
                bg-gradient-to-r from-indigo-500 to-purple-500
                text-white text-lg font-bold
                shadow-xl
                hover:scale-105 transition
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