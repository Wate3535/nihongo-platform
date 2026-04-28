"use client"

import Link from "next/link"
import {
  Send,
  Users,
  Phone,
  Globe,
  GraduationCap,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useState } from "react"

export function Footer() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleStart() {
    setLoading(true)

    const { data } = await supabase.auth.getUser()
    const user = data.user

    if (!user) {
      router.push("/register")
      setLoading(false)
      return
    }

    if (!user.email_confirmed_at) {
      alert("Emailingizni tasdiqlang 📩")
      setLoading(false)
      return
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("paid_at")
      .eq("id", user.id)
      .single()

    if (error) {
      console.error(error)
      alert("Xatolik yuz berdi")
      setLoading(false)
      return
    }

    if (!profile?.paid_at) {
      router.push("/payme")
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  const sectionTitle =
    "mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-foreground"

  const cardClass =
    "group rounded-3xl border border-border/60 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"

  const linkClass =
    "flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-indigo-500 hover:bg-indigo-500/10 hover:scale-[1.03] transition-all duration-300"

  return (
    <footer className="relative overflow-hidden border-t border-border bg-gradient-to-b from-background via-background to-indigo-50/30 dark:to-indigo-950/10">
      {/* BACKGROUND EFFECT */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute right-10 top-24 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* TOP GRID */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {/* BRAND */}
          <div className={cardClass}>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white shadow-lg group-hover:scale-110 transition">
                🇯🇵
              </div>

              <div>
                <h3 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
                  NihonGoo
                </h3>
                <p className="text-xs text-muted-foreground">
                  Learn Smart • Learn Fast
                </p>
              </div>
            </div>

            <p className="mt-5 leading-7 text-muted-foreground group-hover:text-foreground transition">
              Yapon tilini o‘rganishning zamonaviy yo‘li — interaktiv,
              samarali va oson.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-600">
                JLPT
              </span>
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600">
                AI Support
              </span>
              <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600">
                Community
              </span>
            </div>
          </div>

          {/* PLATFORM */}
          <div className={cardClass}>
            <h4 className={sectionTitle}>
              <Sparkles className="h-4 w-4 text-indigo-500" />
              Platforma
            </h4>

            <ul className="space-y-2">
              <li>
                <Link href="/" className={linkClass}>
                  <span>Bosh sahifa</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </li>

              <li>
                <Link href="/dashboard/lessons" className={linkClass}>
                  <span>Darslar</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </li>

              <li>
                <Link href="#features" className={linkClass}>
                  <span>Imkoniyatlar</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COMMUNITY */}
          <div className={cardClass}>
            <h4 className={sectionTitle}>
              <Users className="h-4 w-4 text-blue-500" />
              Hamjamiyat
            </h4>

            <ul className="space-y-2">
              <li>
                <a
                  href="https://t.me/nihongosenpai"
                  target="_blank"
                  className={linkClass}
                >
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Telegram kanal
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </li>

              <li>
                <a
                  href="https://t.me/+3hE3p76vnBY4NDIy"
                  target="_blank"
                  className={linkClass}
                >
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Telegram guruh
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className={cardClass}>
            <h4 className={sectionTitle}>
              <Phone className="h-4 w-4 text-violet-500" />
              Aloqa & Foydali
            </h4>

            <ul className="space-y-2">
              <li>
                <a
                  href="https://ujc.uz/uz/novostdetalno_10_587/"
                  target="_blank"
                  className={linkClass}
                >
                  <span className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    JLPT Uzbekistan
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </li>

              <li>
                <a
                  href="https://www.jlpt.jp/e/"
                  target="_blank"
                  className={linkClass}
                >
                  <span className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    JLPT Japan
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </li>

              <li>
                <a href="tel:+998953223535" className={linkClass}>
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    +998 95 322 35 35
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </li>

              <li>
                <a
                  href="https://t.me/wate_jp"
                  target="_blank"
                  className={linkClass}
                >
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Founder Telegram
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl border border-border/60 bg-white/70 dark:bg-white/5 p-8 text-center backdrop-blur-xl shadow-sm hover:shadow-xl transition">
          <p className="text-xl font-bold tracking-tight hover:scale-105 transition">
            Yapon tilini o‘rganishni hoziroq boshlang 🚀
          </p>

          {/* BUTTON DESIGN O‘ZGARTIRILMADI */}
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
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © 2026 <span className="font-semibold text-foreground">NihonGoo</span>.
          Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  )
}