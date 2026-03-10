"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function PaymentPage() {

  const [userId, setUserId] = useState("")
  const router = useRouter()

  useEffect(() => {

    const getUser = async () => {

      const { data: authData, error: authError } = await supabase.auth.getUser()

      console.log("AUTH USER:", authData)

      if (authError || !authData?.user) {
        console.log("Auth error:", authError)
        return
      }

      const { data: userRow, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", authData.user.email)
        .limit(1)
        .maybeSingle()

      console.log("USER ROW:", userRow)
      console.log("DB ERROR:", error)

      if (userRow) {
        setUserId(userRow.id)
      }

    }

    getUser()

  }, [])

  const openTelegram = () => {
    window.open(`https://t.me/nihongo_tolov_bot?start=${userId}`, "_blank")
  }

  const openCourse = () => {
    router.push("/dashboard")
  }

  return (

    <div className="flex min-h-screen items-center justify-center bg-black text-white px-6">

      <div className="bg-zinc-900 p-14 rounded-xl w-[520px] text-center shadow-xl">

        <h1 className="text-2xl font-bold mb-4">
          Kursni sotib olish
        </h1>

        <p className="text-gray-400">
          Kurs narxi: <span className="line-through">300 000 so'm</span>
        </p>

        <p className="text-2xl font-bold text-green-400 mb-6">
          Chegirmada: 200 000 so'm
        </p>

        <div className="flex flex-col gap-4 mt-6">

          <button
            onClick={openTelegram}
            className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg font-medium"
          >
            🤖 Telegram botga o'tish
          </button>

          <button
            onClick={openCourse}
            className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-medium"
          >
            🎓 Kursga kirish
          </button>

        </div>

      </div>

    </div>
  )
}