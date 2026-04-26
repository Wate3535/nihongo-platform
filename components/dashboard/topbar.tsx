"use client"

import { Bell, Search } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { supabase } from "@/lib/supabase"
import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export function DashboardTopbar() {
  const [profile, setProfile] = useState<any>(null)
  const [coins, setCoins] = useState(0)
  const [pulse, setPulse] = useState(false)

  const [search, setSearch] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const notifRef = useRef<HTMLDivElement>(null)

  const router = useRouter()

  useEffect(() => {
    fetchProfile()
    fetchNotifications()

    const refreshCoins = () => {
      fetchProfile()
      

      setPulse(true)
      setTimeout(() => setPulse(false), 700)
    }

    window.addEventListener(
      "coinsUpdated",
      refreshCoins
    )

    return () => {
      window.removeEventListener(
        "coinsUpdated",
        refreshCoins
      )
    }
  }, [])

  useEffect(() => {
    if (!search.trim()) {
      setResults([])
      return
    }

    const delay = setTimeout(() => {
      runSearch()
    }, 250)

    return () => clearTimeout(delay)
  }, [search])

  useEffect(() => {
  function handleClickOutside(e: MouseEvent) {
    if (
      notifRef.current &&
      !notifRef.current.contains(e.target as Node)
    ) {
      setNotifOpen(false)
    }
  }

  document.addEventListener(
    "mousedown",
    handleClickOutside
  )

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    )
}, [])

  async function fetchProfile() {
    const {
      data: authData,
    } = await supabase.auth.getUser()

    if (!authData?.user) return

    const user = authData.user

    const [userRes, profileRes] =
      await Promise.all([
        supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single(),

        supabase
          .from("profiles")
          .select("coins")
          .eq("id", user.id)
          .single(),
      ])

    setProfile(userRes.data)
    setCoins(
      profileRes.data?.coins || 0
    )
  }

 async function runSearch() {
  setLoading(true)

  const text = search.trim()

  const { data, error } =
    await supabase
      .from("lessons")
      .select(`
        id,
        title,
        course_id,
        courses (
          slug
        )
      `)
      .ilike("title", `%${text}%`)
      .limit(8)

  if (error) {
    console.log(error)
    setResults([])
  } else {
    setResults(data || [])
  }

  setLoading(false)
}

 function openLesson(
  slug: string,
  lessonId: number
) {
  setSearch("")
  setResults([])

  router.push(
    `/dashboard/lessons/${slug}?lesson=${lessonId}`
  )
}

async function fetchNotifications() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(8)

  const rows = data || []

  setNotifications(rows)
  setUnreadCount(
    rows.filter((item) => !item.is_read).length
  )
}

async function markAllAsRead() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", user.id)
    .eq("is_read", false)

  setUnreadCount(0)

  setNotifications((prev) =>
    prev.map((item) => ({
      ...item,
      is_read: true,
    }))
  )
}
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/80 px-6 py-3 backdrop-blur-md">

      {/* LEFT */}
      <div className="flex items-center gap-4 pl-12 lg:pl-0">

        <div className="relative hidden md:block">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Darslarni qidirish..."
            className="w-72 rounded-xl pl-9"
          />

          {/* SEARCH RESULTS */}
          <AnimatePresence>
            {(results.length >
              0 ||
              loading) && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 8,
                }}
                className="absolute left-0 top-full mt-2 w-full rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
              >
                {loading && (
                  <div className="px-4 py-3 text-sm text-muted-foreground">
                    Qidirilmoqda...
                  </div>
                )}

                {!loading &&
                  results.map(
                    (
                      item
                    ) => (
                      <button
                        key={
                          item.id
                        }
                        onClick={() =>
                         openLesson(
                         item.courses?.slug,
                         item.id
                         )
                         }
                        className="w-full px-4 py-3 text-left text-sm hover:bg-primary/5 transition"
                      >
                        🔍{" "}
                        {
                          item.title
                        }
                      </button>
                    )
                  )}

                {!loading &&
                  results.length ===
                    0 && (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      Hech narsa
                      topilmadi
                    </div>
                  )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* COINS */}
        <motion.div
          id="coin-target"
          animate={
            pulse
              ? {
                  scale: [
                    1,
                    1.2,
                    1,
                  ],
                  rotate: [
                    0,
                    -5,
                    5,
                    0,
                  ],
                }
              : {}
          }
          transition={{
            duration: 0.6,
          }}
          className="flex items-center gap-2 rounded-2xl px-4 py-2 bg-yellow-500/10 border border-yellow-400/30 shadow-md"
        >
          <span className="text-lg">
            🪙
          </span>

          <AnimatePresence mode="wait">
            <motion.span
              key={coins}
              initial={{
                y: -10,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 10,
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="font-bold text-yellow-500"
            >
              {coins}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <ThemeToggle />

        <div className="relative" ref={notifRef}>
  <Button
    variant="ghost"
    size="icon"
    className="relative"
   onClick={() => {
  const next = !notifOpen
  setNotifOpen(next)

  if (next && unreadCount > 0) {
    markAllAsRead()
  }
}}
  >
    <Bell className="h-5 w-5" />

    {unreadCount > 0 && (
      <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] text-white">
        {unreadCount}
      </span>
    )}
  </Button>

  <AnimatePresence>
    {notifOpen && (
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 10,
          scale: 0.98,
        }}
        className="absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl z-50"
      >
        <div className="border-b px-4 py-3 font-semibold">
          Notifications
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-4 py-6 text-sm text-muted-foreground text-center">
              Hozircha xabar yo‘q
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className="border-b px-4 py-3 hover:bg-muted/50 transition"
              >
                <p className="text-sm font-medium">
                  {item.title}
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  {item.message}
                </p>
              </div>
            ))
          )}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

        {/* PROFILE */}
        <div className="flex items-center gap-3">

          <Avatar className="h-9 w-9">
            {profile?.avatar_url ? (
              <img
                src={
                  profile.avatar_url
                }
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                {profile?.name?.[0] ||
                  "U"}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground">
              {profile?.name ||
                "User"}
            </p>

            <p className="text-xs text-muted-foreground">
              {profile?.level ||
                "Boshlang‘ich"}
            </p>
          </div>

        </div>

      </div>

    </header>
  )
}