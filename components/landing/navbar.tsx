"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const links = [
    { href: "#features", label: "Imkoniyatlar" },
    { href: "/reviews", label: "O‘quvchilar fikrlari" },
    { href: "/login", label: "Kirish" },
  ]

  async function handleStart() {
    setLoading(true)

    const { data } = await supabase.auth.getUser()
    const user = data.user

    if (!user) {
      router.push("/register")
      return
    }

    if (!user.email_confirmed_at) {
      alert("Emailingizni tasdiqlang 📩")
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-4">

        {/* LEFT BRAND */}
        <Link href="/" className="group flex items-center gap-4 md:gap-5 min-w-0">

          {/* LOGO */}
          <div
            className="
              relative rounded-2xl p-1 shrink-0
              will-change-transform transform-gpu
              transition-all duration-500 ease-out
              group-hover:scale-110
              active:scale-110

              group-hover:brightness-110
              group-hover:contrast-110
              group-hover:saturate-125

              group-hover:shadow-[0_0_18px_rgba(255,255,255,0.65),0_0_38px_rgba(99,102,241,0.55),0_0_70px_rgba(99,102,241,0.35)]
              dark:group-hover:shadow-[0_0_20px_rgba(255,255,255,0.35),0_0_42px_rgba(168,85,247,0.65),0_0_80px_rgba(59,130,246,0.35)]

              active:shadow-[0_0_18px_rgba(255,255,255,0.65),0_0_38px_rgba(99,102,241,0.55),0_0_70px_rgba(99,102,241,0.35)]
              dark:active:shadow-[0_0_20px_rgba(255,255,255,0.35),0_0_42px_rgba(168,85,247,0.65),0_0_80px_rgba(59,130,246,0.35)]
            "
          >
            <Image
              src="/LOGO-MODE.svg"
              alt="NihonGoo"
              width={72}
              height={72}
              priority
              className="block dark:hidden object-contain select-none transition-all duration-500"
            />

            <Image
              src="/LOGO-DARK.svg"
              alt="NihonGoo"
              width={72}
              height={72}
              priority
              className="hidden dark:block object-contain select-none transition-all duration-500"
            />
          </div>

          {/* TEXT */}
          <div
            className="
              hidden sm:block leading-tight pr-6 md:pr-10
              transition-all duration-300
              group-hover:scale-105
              group-hover:translate-x-1
            "
          >
            <h1 className="text-xl md:text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
              NihonGoo
            </h1>

            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-300">
              Yapon tilini oson o‘rganing
            </p>
          </div>
        </Link>

        {/* RIGHT DESKTOP */}
        <div className="hidden md:flex items-center gap-8">

          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="
                group relative
                text-base font-semibold
                text-slate-700
                hover:text-primary
                dark:text-slate-200
                dark:hover:text-white
                transition-colors duration-300
              "
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <ThemeToggle />

          <button
            onClick={handleStart}
            disabled={loading}
            className="
              rounded-full px-7 py-2.5
              text-base font-semibold text-white
              bg-gradient-to-r from-indigo-500 to-blue-500
              shadow-md
              hover:scale-105 hover:shadow-xl
              transition-all duration-300
              disabled:opacity-50
            "
          >
            {loading ? "Tekshirilmoqda..." : "Boshlash"}
          </button>
        </div>

        {/* MOBILE */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">

            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="
                  text-base font-semibold
                  text-slate-700
                  dark:text-slate-200
                "
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={handleStart}
              className="
                rounded-full py-2.5
                text-white font-semibold
                bg-gradient-to-r from-indigo-500 to-blue-500
              "
            >
              {loading ? "Tekshirilmoqda..." : "Boshlash"}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}