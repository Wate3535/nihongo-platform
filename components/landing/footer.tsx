"use client"

import Link from "next/link"
import { Send, Users, Phone } from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useState } from "react"

export function Footer() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // 🔥 SMART BUTTON LOGIC (FIXED)
  async function handleStart() {
    setLoading(true)

    const { data } = await supabase.auth.getUser()
    const user = data.user

    // ❌ LOGIN YO'Q
    if (!user) {
      router.push("/register")
      setLoading(false)
      return
    }

    // ❌ EMAIL TASDIQLANMAGAN
    if (!user.email_confirmed_at) {
      alert("Emailingizni tasdiqlang 📩")
      setLoading(false)
      return
    }

    // 🔥 PAYMENT CHECK
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("is_paid")
      .eq("id", user.id)
      .single()

    if (error) {
      console.error(error)
      alert("Xatolik yuz berdi")
      setLoading(false)
      return
    }

    // ❌ TO'LOV YO'Q
    if (!profile?.is_paid) {
      router.push("/payme")
      setLoading(false)
      return
    }

    // ✅ HAMMASI OK
    router.push("/dashboard")
  }

  return (
    <footer className="relative border-t border-border bg-card overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-10 md:grid-cols-4">

          {/* LOGO */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition">
              NihonGoo
            </h3>

            <p className="mt-4 text-muted-foreground hover:scale-[1.03] transition">
              Yapon tilini o‘rganishning zamonaviy yo‘li — interaktiv, samarali va oson.
            </p>
          </div>

          {/* PLATFORMA */}
          <div>
            <h4 className="font-semibold hover:scale-105 transition">
              Platforma
            </h4>

            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/" className="text-sm hover:text-indigo-500 hover:scale-110 transition">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link href="/dashboard/lessons" className="text-sm hover:text-indigo-500 hover:scale-110 transition">
                  Darslar
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-sm hover:text-indigo-500 hover:scale-110 transition">
                  Imkoniyatlar
                </Link>
              </li>
            </ul>
          </div>

          {/* HAMJAMIYAT */}
          <div>
            <h4 className="font-semibold hover:scale-105 transition">
              Hamjamiyat
            </h4>

            <ul className="mt-4 space-y-3">

              <li>
                <a
                  href="https://t.me/nihongosenpai"
                  target="_blank"
                  className="flex items-center gap-2 text-sm hover:text-indigo-500 hover:scale-110 transition"
                >
                  <Send className="h-4 w-4" />
                  Telegram kanal
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm hover:text-indigo-500 hover:scale-110 transition"
                >
                  <Users className="h-4 w-4" />
                  Telegram group
                </a>
              </li>

            </ul>
          </div>

          {/* ALOQA */}
          <div>
            <h4 className="font-semibold hover:scale-105 transition">
              Aloqa & Foydali
            </h4>

            <ul className="mt-4 space-y-3">

              <li>
                <a
                  href="https://ujc.uz/uz/novostdetalno_10_587/"
                  target="_blank"
                  className="text-sm hover:text-indigo-500 hover:scale-110 transition"
                >
                  JLPT Uzbekistan
                </a>
              </li>

              <li>
                <a
                  href="https://www.jlpt.jp/e/"
                  target="_blank"
                  className="text-sm hover:text-indigo-500 hover:scale-110 transition"
                >
                  JLPT Japan
                </a>
              </li>

              <li>
                <a
                  href="tel:+998953223535"
                  className="flex items-center gap-2 text-sm hover:text-indigo-500 hover:scale-110 transition"
                >
                  <Phone className="h-4 w-4" />
                  +998 95 322 35 35
                </a>
              </li>

              <li>
                <a
                  href="https://t.me/wate_jp"
                  target="_blank"
                  className="text-sm hover:text-indigo-500 hover:scale-110 transition"
                >
                  Founder Telegram
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg font-semibold hover:scale-105 transition">
            Yapon tilini o‘rganishni hoziroq boshlang 🚀
          </p>

          {/* 🔥 SMART BUTTON */}
          <button
            onClick={handleStart}
            disabled={loading}
            className="
              mt-4 px-6 py-2 rounded-full
              bg-gradient-to-r from-indigo-500 to-blue-500
              text-white shadow
              hover:scale-110 hover:shadow-lg
              transition-all duration-300
              disabled:opacity-50
            "
          >
            {loading ? "Tekshirilmoqda..." : "Boshlash"}
          </button>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © 2026 NihonGoo. Barcha huquqlar himoyalangan.
        </div>

      </div>
    </footer>
  )
}