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

/* ================= PREMIUM LOGO ================= */
function NihonGoLogo() {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600 shadow-lg transition group-hover:scale-105" />
        <div className="absolute inset-0 rounded-2xl bg-indigo-500 opacity-20 blur-xl group-hover:opacity-40 transition" />

        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 z-10">
          <path d="M4 5c0-1.1.9-2 2-2h10a2 2 0 012 2v14a1 1 0 01-1.447.894L12 17.382l-4.553 2.512A1 1 0 016 19V5z" />
        </svg>

        <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-pulse" />
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent tracking-wide">
          NihonGo
        </span>
      </div>
    </div>
  )
}
/* ================================================= */

export function DashboardSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const getRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single()

      setUserRole(data?.role)
    }

    getRole()
  }, [])

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(href)
  }

  // 🔥 DYNAMIC NAV
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
      <div className="px-6 py-6 border-b border-border">
        <NihonGoLogo />
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  isActive(item.href)
                    ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground hover:translate-x-1"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* FOOTER */}
      <div className="border-t border-border px-6 py-4">
        <Link
          href="/"
          className="text-xs text-muted-foreground transition hover:text-foreground"
        >
          ← Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* MOBILE TOGGLE */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X /> : <Menu />}
      </Button>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card transition duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* DESKTOP */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-card lg:block">
        {sidebarContent}
      </aside>
    </>
  )
}