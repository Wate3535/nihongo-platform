"use client"

import { Bell, Search } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"

// 🔥 TIMER IMPORT
import { useSessionTimer } from "@/hooks/useSessionTimer"
import { formatTime } from "@/lib/timer"

export function DashboardTopbar() {
  const [profile, setProfile] = useState<any>(null)

  // 🔥 GLOBAL TIMER
  const time = useSessionTimer()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data: authData, error: authError } = await supabase.auth.getUser()

    if (authError || !authData?.user) {
      console.log("User topilmadi")
      return
    }

    const user = authData.user

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .maybeSingle()

    if (error) {
      console.log(error)
      return
    }

    setProfile(data)
  }

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/80 px-6 py-3 backdrop-blur-md">

      {/* LEFT */}
      <div className="flex items-center gap-4 pl-12 lg:pl-0">

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Darslarni qidirish..."
            className="w-64 rounded-lg pl-9"
          />
        </div>

      </div>

     
      <div className="flex items-center gap-4">

        {/* 🔥 TIMER */}
       <div className="hidden md:flex items-center gap-3 rounded-2xl px-5 py-2.5 
bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-purple-500/20 
text-indigo-400 text-base font-semibold 
shadow-lg backdrop-blur-md border border-white/10
hover:scale-105 transition-all duration-300">

  <span className="text-lg">⏱</span>

  <span className="tracking-wider">
    {formatTime(time)}
  </span>

</div>

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

        {/* PROFILE */}
        <div className="flex items-center gap-3">

          <Avatar className="h-9 w-9">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                {profile?.name?.[0] || "U"}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground">
              {profile?.name || "User"}
            </p>
            <p className="text-xs text-muted-foreground">
              {profile?.level || "N5 daraja"}
            </p>
          </div>

        </div>

      </div>

    </header>
  )
}