"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function PaymentPage() {

  const [userId, setUserId] = useState("")

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        setUserId(data.user.id)
      }
    }

    getUser()
  }, [])

  const copyCard = () => {
    navigator.clipboard.writeText("5614681625352194")
    alert("Karta raqami nusxalandi")
  }

  const openTelegram = () => {
    window.open(`https://t.me/nihongo_tolov_bot?start=${userId}`, "_blank")
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

        <div className="bg-zinc-800 rounded-lg p-4 mb-6">

          <p className="text-sm text-gray-300 mb-2">
            To'lov qilish uchun karta:
          </p>

          <div className="flex items-center justify-center gap-2 text-lg font-semibold">
            💳 5614 6816 2535 2194

            <button
              onClick={copyCard}
              className="text-xs bg-zinc-700 px-2 py-1 rounded hover:bg-zinc-600"
            >
              Nusxalash
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-2">
            👤 RUSTAMJONOV SODIQJON
          </p>

        </div>

        <button
          onClick={openTelegram}
          className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg text-center font-medium"
        >
          Telegram botga o'tish
        </button>

        <p className="text-xs text-gray-400 mt-6">
          To'lov qilgandan keyin screenshotni Telegram botga yuboring.
          Tasdiqlash odatda 5–10 minut ichida amalga oshiriladi.
        </p>

      </div>

    </div>
  )
}