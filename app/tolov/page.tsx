"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: authData } = await supabase.auth.getUser()

      if (!authData?.user) {
        setLoading(false)
        return
      }

      const uid = authData.user.id
      setUserId(uid)

      const { data: enrollment } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", uid)

      if (enrollment && enrollment.length > 0) {
        setStatus(enrollment[0].status)
      } else {
        setStatus(null)
      }

      setLoading(false)
    }

    getUser()

    const interval = setInterval(getUser, 3000)
    return () => clearInterval(interval)
  }, [])

  const openTelegram = () => {
    if (!userId) return
    window.open(`https://t.me/nihongo_tolov_bot?start=${userId}`, "_blank")
  }

  const openCourse = () => {
    router.push("/dashboard")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white bg-black">
        Yuklanmoqda...
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center text-white px-6 overflow-hidden">

    
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/yoz-bambo.jpg')" }}
      />

      
      <div className="absolute inset-0 bg-black/50 -z-10" />

     
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent -z-10" />

      
      <div className="
        bg-white/10 backdrop-blur-xl
        border border-white/20
        p-14 rounded-2xl w-[520px]
        text-center shadow-2xl
      ">

       
        <h1 className="text-2xl font-bold mb-4 drop-shadow">
          Kursni sotib olish
        </h1>

        
        <p className="text-gray-300">
          Kurs narxi: <span className="line-through">300 000 so'm</span>
        </p>

        <p className="text-2xl font-bold text-green-400 mb-6 drop-shadow">
          Chegirmada: 200 000 so'm
        </p>

        {/* ACTIONS */}
        <div className="flex flex-col gap-4 mt-6">

          {status === null && (
            <button
              onClick={openTelegram}
              className="
                w-full p-3 rounded-lg font-medium
                bg-gradient-to-r from-purple-600 to-indigo-600
                transition-all duration-300
                hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30
              "
            >
              🤖 Telegram botga o'tish
            </button>
          )}

          {status === "pending" && (
            <div className="text-yellow-400 font-medium animate-pulse">
              To‘lov tekshirilmoqda ⏳
            </div>
          )}

          {status === "approved" && (
            <button
              onClick={openCourse}
              className="
                w-full p-3 rounded-lg font-medium
                bg-gradient-to-r from-green-500 to-emerald-600
                transition-all duration-300
                hover:scale-105 hover:shadow-lg hover:shadow-green-500/30
              "
            >
              🎓 Kursga kirish
            </button>
          )}

        </div>

      </div>

    </div>
  )
}