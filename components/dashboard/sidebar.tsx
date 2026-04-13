"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  Video,
  MessageCircle,
  User,
  Menu,
  X,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

/* 🔥 PROPS */
type Props = {
  hovered: boolean
  setHovered: (value: boolean) => void
}

/* ================= LOGO ================= */
export function NihonGoLogo({ hovered }: { hovered: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 px-2 group">

      {/* ICON (ENDI NAVBAR BILAN 1 XIL) */}
      <div className="
        relative w-11 h-11 flex items-center justify-center
        rounded-2xl
        bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600
        shadow-xl
        transition-all duration-300
        group-hover:scale-105 flex-shrink-0
      ">

        {/* SUN GLOW */}
        <div className="
          absolute w-6 h-6 rounded-full
          bg-gradient-to-br from-orange-400 to-pink-500
          opacity-70 blur-[3px]
        " />

        {/* TORII */}
        <svg viewBox="0 0 24 24" className="w-6 h-6 z-10">
          <rect x="3" y="6" width="18" height="2" rx="1" fill="white"/>
          <rect x="5" y="9" width="14" height="2" rx="1" fill="white"/>
          <rect x="6" y="11" width="2" height="7" rx="1" fill="white"/>
          <rect x="16" y="11" width="2" height="7" rx="1" fill="white"/>
        </svg>

        {/* 🎓 EDUCATION CAP */}
        <svg
          viewBox="0 0 24 24"
          className="absolute top-1 right-1 w-4 h-4 z-20"
        >
          <polygon points="12,3 20,7 12,11 4,7" fill="white"/>
          <rect x="9" y="11" width="6" height="2" rx="1" fill="white"/>
          <line x1="16" y1="8" x2="16" y2="12" stroke="white" strokeWidth="1.5"/>
          <circle cx="16" cy="13.5" r="1" fill="white"/>
        </svg>

        {/* OUTER GLOW */}
        <div className="
          absolute inset-0 rounded-2xl
          bg-blue-500 opacity-20 blur-xl
          group-hover:opacity-40 transition
        " />
      </div>

      {/* TEXT (sidebar animatsiya saqlanadi) */}
      <span
        className={cn(
          "text-lg font-semibold whitespace-nowrap transition-all duration-300",
          "bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent",
          hovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-2 w-0 overflow-hidden"
        )}
      >
        NihonGoo
      </span>

    </Link>
  )
}

export function DashboardSidebar({ hovered, setHovered }: Props) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // ❌ LOGIN YO'Q → REDIRECT
    if (!user) {
      window.location.href = "/register"
      return
    }

    // ROLE OLISH
    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single()

    setUserRole(data?.role)
  }

  checkUser()
}, [])

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(href)
  }

  const navItems = [
    { href: "/dashboard", label: "Boshqaruv paneli", icon: LayoutDashboard },
    { href: "/dashboard/lessons", label: "Video darslar", icon: Video },
    { href: "/dashboard/chat", label: "AI bilan suhbat", icon: MessageCircle },
    { href: "/dashboard/profile", label: "Profil", icon: User },
    ...(userRole === "admin"
      ? [{ href: "/admin", label: "Admin Panel", icon: Shield }]
      : []),
  ]

  const sidebarContent = (
  <div className="flex h-full flex-col">

    {/* LOGO */}
    <div className="px-3 py-4 border-b border-border">
      <NihonGoLogo hovered={hovered} />
    </div>

    {/* NAV */}
    <nav className="flex-1 px-2 py-4">
      <ul className="flex flex-col gap-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                isActive(item.href)
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />

              <span
                className={cn(
                  "transition-all duration-300 whitespace-nowrap",
                  hovered
                    ? "opacity-100 ml-2"
                    : "opacity-0 w-0 overflow-hidden"
                )}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>

    {/* FOOTER (NEW PREMIUM) */}
    <div className="mt-auto px-3 pb-4">

      <Link
        href="/"
        className={cn(
          "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300",
          "bg-gradient-to-r from-blue-500/10 to-indigo-500/10",
          "hover:from-blue-500 hover:to-indigo-500 hover:text-white",
          "shadow-sm hover:shadow-md hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        )}
      >
        {/* ICON */}
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 group-hover:bg-white/30 transition">
          <span className="text-sm">←</span>
        </div>

        {/* TEXT */}
        <span
          className={cn(
            "text-sm font-medium whitespace-nowrap transition-all duration-300",
            hovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-2 w-0 overflow-hidden"
          )}
        >
          Bosh sahifaga qaytish
        </span>
      </Link>

    </div>

  </div>
)

  return (
    <>
      {/* MOBILE BUTTON */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X /> : <Menu />}
      </Button>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE SIDEBAR */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card transition duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* DESKTOP SIDEBAR */}
      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "fixed inset-y-0 left-0 z-30 border-r border-border bg-card transition-all duration-300 hidden lg:block",
          hovered ? "w-64" : "w-16"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}