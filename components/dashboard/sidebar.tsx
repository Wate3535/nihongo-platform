"use client"

import Link from "next/link"
import Image from "next/image"
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

type Props = {
  hovered: boolean
  setHovered: (value: boolean) => void
}

export function NihonGoLogo({
  expanded,
}: {
  expanded: boolean
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center w-full",
        expanded ? "gap-3 px-2 justify-start" : "justify-center px-0"
      )}
    >
      <div className="relative rounded-2xl p-1 shrink-0 transition-all duration-300 group-hover:scale-110">
        <Image
          src="/LOGO-MODE.svg"
          alt="NihonGoo"
          width={42}
          height={42}
          priority
          className="block dark:hidden object-contain"
        />
        <Image
          src="/LOGO-DARK.svg"
          alt="NihonGoo"
          width={42}
          height={42}
          priority
          className="hidden dark:block object-contain"
        />
      </div>

      {expanded && (
        <div className="leading-tight whitespace-nowrap overflow-hidden">
          <h1 className="text-lg font-bold text-slate-800 dark:text-white">
            NihonGoo
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            Yapon tili platformasi
          </p>
        </div>
      )}
    </Link>
  )
}

export function DashboardSidebar({
  hovered,
  setHovered,
}: Props) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        window.location.href = "/register"
        return
      }

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
    {
      href: "/dashboard",
      label: "Boshqaruv paneli",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/lessons",
      label: "Video darslar",
      icon: Video,
    },
    {
      href: "/dashboard/chat",
      label: "AI bilan suhbat",
      icon: MessageCircle,
    },
    {
      href: "/dashboard/profile",
      label: "Profil",
      icon: User,
    },
    ...(userRole === "admin"
      ? [
          {
            href: "/admin",
            label: "Admin Panel",
            icon: Shield,
          },
        ]
      : []),
  ]

  const renderSidebar = (expanded: boolean) => (
    <div className="flex h-full flex-col">
      {/* TOP */}
      <div className="px-3 py-4 border-b border-border">
        <NihonGoLogo expanded={expanded} />
      </div>

      {/* NAV */}
      <nav className="flex-1 px-2 py-4">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
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
                    "whitespace-nowrap transition-all duration-300",
                    expanded
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

      {/* FOOTER */}
      <div className="mt-auto px-3 pb-4">
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="group flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 hover:from-blue-500 hover:to-indigo-500 hover:text-white transition-all"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/20">
            ←
          </div>

          <span
            className={cn(
              "text-sm font-medium whitespace-nowrap transition-all duration-300",
              expanded
                ? "opacity-100"
                : "opacity-0 w-0 overflow-hidden"
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
  className={cn(
    "fixed top-5 z-50 lg:hidden transition-all duration-300",
   mobileOpen ? "right-[140px]" : "left-4"
  )}
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

      {/* MOBILE */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 max-w-[85vw] border-r border-border bg-card transition duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {renderSidebar(true)}
      </aside>

      {/* DESKTOP */}
      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "fixed inset-y-0 left-0 z-30 border-r border-border bg-card transition-all duration-300 hidden lg:block",
          hovered ? "w-64" : "w-16"
        )}
      >
        {renderSidebar(hovered)}
      </aside>
    </>
  )
}