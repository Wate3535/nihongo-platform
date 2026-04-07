"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { href: "#features", label: "Imkoniyatlar" },
    { href: "/reviews", label: "O‘quvchilar fikrlari" }, 
    { href: "/login", label: "Kirish" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-3 cursor-pointer">

          <div className="relative w-10 h-10 flex items-center justify-center">

            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-600 shadow-lg transition group-hover:scale-105" />

            <div className="absolute inset-0 rounded-xl bg-indigo-500 opacity-20 blur-xl group-hover:opacity-40 transition" />

            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 z-10">
              <path d="M4 5c0-1.1.9-2 2-2h10a2 2 0 012 2v14a1 1 0 01-1.447.894L12 17.382l-4.553 2.512A1 1 0 016 19V5z" />
            </svg>

            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-pink-400 rounded-full animate-pulse" />
          </div>

          <span className="
            text-2xl font-bold tracking-tight
            bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500
            bg-clip-text text-transparent
            transition-transform duration-300 group-hover:scale-105
          ">
            NihonGoo
          </span>

        </Link>

        {/* DESKTOP */}
        <div className="hidden items-center gap-8 md:flex">

          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {item.label}

              <span className="
                absolute left-0 -bottom-1 h-[2px] w-0 
                bg-primary
                transition-all duration-300
                group-hover:w-full
              " />
            </Link>
          ))}

          <ThemeToggle />

          <Button
            asChild
            className="
              rounded-full px-6
              bg-gradient-to-r from-indigo-500 to-blue-500
              text-white shadow-md
              hover:scale-105 hover:shadow-lg
              transition-all duration-300
            "
          >
            <Link href="/register">Boshlash</Link>
          </Button>

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
        <div className="border-t border-border bg-card px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">

            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition"
              >
                {item.label}
              </Link>
            ))}

            <Button asChild className="rounded-full">
              <Link href="/register">Boshlash</Link>
            </Button>

          </div>
        </div>
      )}
    </header>
  )
}