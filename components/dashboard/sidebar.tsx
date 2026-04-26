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

/* ================= PREMIUM LOGO ================= */
export function NihonGoLogo({
  hovered,
}: {
  hovered: boolean
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center w-full",
        hovered
          ? "gap-3 px-2 justify-start"
          : "justify-center px-0"
      )}
    >
      {/* LOGO */}
      <div
        className="
          relative rounded-2xl p-1 shrink-0
          will-change-transform transform-gpu
          transition-all duration-500 ease-out
          group-hover:scale-110

          group-hover:shadow-[0_0_18px_rgba(99,102,241,0.45)]
          dark:group-hover:shadow-[0_0_20px_rgba(168,85,247,0.55)]
        "
      >
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

      {/* TEXT */}
      {hovered && (
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
  const [mobileOpen, setMobileOpen] =
    useState(false)
  const [userRole, setUserRole] =
    useState<string | null>(null)

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
    if (href === "/dashboard")
      return pathname === "/dashboard"

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

  const sidebarContent = (
    <div className="flex h-full flex-col">

      {/* TOP LOGO */}
      <div className="px-3 py-4 border-b border-border">
        <NihonGoLogo hovered={hovered} />
      </div>

      {/* NAVIGATION */}
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

      {/* FOOTER */}
      <div className="mt-auto px-3 pb-4">
        <Link
          href="/"
          className="
            group flex items-center gap-3
            px-3 py-2.5 rounded-xl
            transition-all duration-300
            bg-gradient-to-r from-blue-500/10 to-indigo-500/10
            hover:from-blue-500 hover:to-indigo-500
            hover:text-white
            shadow-sm hover:shadow-md
            hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]
          "
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 group-hover:bg-white/30 transition">
            <span className="text-sm">←</span>
          </div>

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
        onClick={() =>
          setMobileOpen(!mobileOpen)
        }
      >
        {mobileOpen ? <X /> : <Menu />}
      </Button>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      {/* MOBILE SIDEBAR */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card transition duration-200 lg:hidden",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>

      {/* DESKTOP SIDEBAR */}
      <aside
        onMouseEnter={() =>
          setHovered(true)
        }
        onMouseLeave={() =>
          setHovered(false)
        }
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