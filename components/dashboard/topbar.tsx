"use client"

import { Bell, Search } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

export function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/80 px-6 py-3 backdrop-blur-md">

      <div className="flex items-center gap-4 pl-12 lg:pl-0">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Darslarni qidirish..."
            className="w-64 rounded-lg pl-9"
          />

        </div>
      </div>

      <div className="flex items-center gap-3">

        <ThemeToggle />

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Bildirishnomalar"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <div className="flex items-center gap-3">

          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
              JD
            </AvatarFallback>
          </Avatar>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground">
              John Doe
            </p>
            <p className="text-xs text-muted-foreground">
              N4 daraja
            </p>
          </div>

        </div>

      </div>

    </header>
  )
}