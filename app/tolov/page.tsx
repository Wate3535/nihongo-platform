"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const router = useRouter()

  const [userId, setUserId] = useState<string | null>(null)
  const [status, setStatus] =
    useState<"none" | "pending" | "approved">("none")
  const [loading, setLoading] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    async function checkPayment() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          setLoading(false)
          return
        }

        setUserId(user.id)

        const { data: approved } = await supabase
          .from("enrollments")
          .select("id")
          .eq("user_id", user.id)
          .eq("status", "approved")
          .limit(1)

        if (approved && approved.length > 0) {
          setStatus("approved")
          setLoading(false)
          return
        }

        const { data: pending } = await supabase
          .from("enrollments")
          .select("id")
          .eq("user_id", user.id)
          .eq("status", "pending")
          .limit(1)

        if (pending && pending.length > 0) {
          setStatus("pending")
        } else {
          setStatus("none")
        }
      } catch (error) {
        console.error("checkPayment error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkPayment()
    interval = setInterval(checkPayment, 3000)

    return () => clearInterval(interval)
  }, [])

  const openTelegram = () => {
    if (!userId) return

    window.open(
      `https://t.me/nihongo_tolov_bot?start=${userId}`,
      "_blank"
    )
  }

  const openCourse = async () => {
    if (!userId || btnLoading) return

    setBtnLoading(true)

    try {
      // approved enrollment
      const { data: enroll, error: enrollErr } =
        await supabase
          .from("enrollments")
          .select("id, entry_rewarded")
          .eq("user_id", userId)
          .eq("status", "approved")
          .maybeSingle()

      if (enrollErr || !enroll) {
        console.error("Enrollment error:", enrollErr)
        router.push("/dashboard")
        return
      }

      // reward allaqachon berilgan bo‘lsa
      if (enroll.entry_rewarded) {
        router.push("/dashboard")
        return
      }

      // current coins
      const { data: profile } = await supabase
        .from("profiles")
        .select("coins")
        .eq("id", userId)
        .maybeSingle()

      const currentCoins = Number(profile?.coins || 0)

      // update coins
      const { error: updateErr } = await supabase
        .from("profiles")
        .update({
          coins: currentCoins + 3,
        })
        .eq("id", userId)

      if (updateErr) {
        console.error("Coin update error:", updateErr)
      }

      // history
      const { error: historyErr } = await supabase
        .from("coin_history")
        .insert([
          {
            user_id: userId,
            amount: 3,
            reason: "First Course Entry",
            lesson_id: null,
          },
        ])

      if (historyErr) {
        console.error("History insert error:", historyErr)
      }

      // reward lock
      const { error: lockErr } = await supabase
        .from("enrollments")
        .update({
          entry_rewarded: true,
        })
        .eq("id", enroll.id)

      if (lockErr) {
        console.error("Reward lock error:", lockErr)
      }

      // animation
      window.dispatchEvent(
        new CustomEvent("showCoinReward", {
          detail: {
            amount: 3,
            noSticker: true,
          },
        })
      )

      // topbar refresh
      window.dispatchEvent(
        new CustomEvent("coinsUpdated")
      )

      // redirect
      setTimeout(() => {
        router.push("/dashboard")
      }, 2600)
    } catch (error) {
      console.error("openCourse error:", error)
      router.push("/dashboard")
    } finally {
      setBtnLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white text-lg">
        Yuklanmoqda...
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-white">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/yoz-bambo.jpg')",
        }}
      />

      <div className="absolute inset-0 -z-10 bg-black/50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/30 to-transparent" />

      {/* CARD */}
      <div className="w-full max-w-[520px] rounded-2xl border border-white/20 bg-white/10 p-10 md:p-14 text-center shadow-2xl backdrop-blur-xl">
        <h1 className="mb-4 text-2xl md:text-3xl font-bold">
          Kursni sotib olish
        </h1>

        <p className="text-sm text-gray-300">
          Kurs narxi:
          <span className="ml-2 line-through">
            600 000 so'm
          </span>
        </p>

        <p className="mb-6 text-2xl md:text-3xl font-bold text-green-400">
          Chegirmada: 499 000 so'm
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {status === "none" && (
            <button
              onClick={openTelegram}
              className="w-full rounded-lg p-3 font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-all"
            >
              🤖 Telegram botga o‘tish
            </button>
          )}

          {status === "pending" && (
            <div className="rounded-lg border border-yellow-400/30 bg-yellow-500/10 p-3 font-medium text-yellow-300 animate-pulse">
              To‘lov tekshirilmoqda ⏳
            </div>
          )}

          {status === "approved" && (
            <button
              onClick={openCourse}
              disabled={btnLoading}
              className="w-full rounded-lg p-3 font-medium bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-all disabled:opacity-60"
            >
              {btnLoading
                ? "Yuklanmoqda..."
                : "🎓 Kursga kirish"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}