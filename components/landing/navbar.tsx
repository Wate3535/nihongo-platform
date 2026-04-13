"use client"

import Link from "next/link"
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
    <header className="sticky top-0 z-50 border-b border-border bg-card/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="relative w-11 h-11 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-xl group-hover:scale-105 transition">
            <div className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 opacity-70 blur-[3px]" />

            <svg viewBox="0 0 24 24" className="w-6 h-6 z-10">
              <rect x="3" y="6" width="18" height="2" rx="1" fill="white"/>
              <rect x="5" y="9" width="14" height="2" rx="1" fill="white"/>
              <rect x="6" y="11" width="2" height="7" rx="1" fill="white"/>
              <rect x="16" y="11" width="2" height="7" rx="1" fill="white"/>
            </svg>
          </div>

          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            NihonGoo
          </span>
        </Link>

        {/* DESKTOP */}
        <div className="hidden items-center gap-8 md:flex">

          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary group-hover:w-full transition-all"/>
            </Link>
          ))}

          <ThemeToggle />

          
          <button
            onClick={handleStart}
            disabled={loading}
            className="
              rounded-full px-6 py-2
              bg-gradient-to-r from-indigo-500 to-blue-500
              text-white shadow-md
              hover:scale-105 hover:shadow-lg
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
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>

      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">

            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {item.label}
              </Link>
            ))}

            {/* 🔥 MOBILE SMART BUTTON */}
            <button
              onClick={handleStart}
              className="rounded-full bg-primary text-white py-2"
            >
              Boshlash
            </button>

          </div>
        </div>
      )}
    </header>
  )
}