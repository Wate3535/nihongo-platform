"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { LogOut } from "lucide-react"

export function ProfileCard({ user }: { user: any }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [avatar, setAvatar] = useState(user?.avatar_url)
  const [now, setNow] = useState(new Date())
  const [tangalar, setTangalar] = useState(0)
  const [completedLessons, setCompletedLessons] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    fetchProfileStats()

    const refreshStats = () => {
      fetchProfileStats()
    }

    window.addEventListener("coinsUpdated", refreshStats)

    return () => {
      clearInterval(interval)
      window.removeEventListener("coinsUpdated", refreshStats)
    }
  }, [])

  async function fetchProfileStats() {
    const { data } = await supabase
      .from("profiles")
      .select("id, coins, completed_lessons")
      .eq("id", user.id)

    if (data && data.length > 0) {
      setTangalar(data[0].coins || 0)
      setCompletedLessons(data[0].completed_lessons || 0)
    } else {
      setTangalar(0)
      setCompletedLessons(0)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    const fileExt = file.name.split(".").pop()
    const fileName = `${user.id}.${fileExt}`

    await supabase.storage
      .from("avatars")
      .upload(fileName, file, { upsert: true })

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName)

    const publicUrl = data.publicUrl

    await supabase
      .from("users")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id)

    setAvatar(publicUrl)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const months = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentyabr",
    "oktyabr",
    "noyabr",
    "dekabr",
  ]

  const formattedToday = `${now.getFullYear()}-yil ${now.getDate()}-${
    months[now.getMonth()]
  }`

  return (
<Card className="mx-auto w-full max-w-md rounded-3xl border shadow-xl bg-white text-gray-900 dark:bg-zinc-900 dark:text-white transition-all duration-300">     
   <CardContent className="flex flex-col items-center p-5 sm:p-8 text-center">

        {/* Avatar */}
        <div
          onClick={handleClick}
          className="cursor-pointer relative group"
        >
          <Avatar className="h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden">
            <AvatarImage
              src={avatar || "/default-avatar.png"}
              className="object-cover w-full h-full"
            />

            <AvatarFallback className="text-3xl font-bold">
              {user?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full text-xs">
            📷
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Name */}
        <h2 className="mt-4 text-xl sm:text-2xl font-bold break-words">
          {user?.name}
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {user?.email}
        </p>

        {/* Badges */}
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <Badge className="rounded-full px-3 py-1 text-sm">
            {user?.level}
          </Badge>

          <Badge className="rounded-full bg-blue-100 text-blue-600 px-3 py-1 text-sm">
            Faol o‘quvchi
          </Badge>
        </div>

        {/* Tangalar */}
       <div
  className="
    mt-5 w-full rounded-2xl px-4 py-3
    flex items-center justify-center gap-2
    bg-yellow-500/10 border border-yellow-400/30 shadow-md
    transition-all duration-300 cursor-pointer
    hover:scale-[1.03]
    hover:bg-yellow-400/15
    hover:shadow-[0_0_25px_rgba(255,215,0,0.55)]
  "
>
  <Image
    src="/star.png"
    alt="Coin"
    width={30}
    height={30}
    className="object-contain"
  />

  <span className="text-xl font-bold text-yellow-500">
    {tangalar} Tangalar
  </span>
</div>

        {/* Edit */}
        <Link href="/profile/edit" className="w-full">
          <button className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition">
            Edit Profile ✏️
          </button>
        </Link>

        {/* Info */}
        <div className="mt-5 w-full space-y-3 text-left text-sm sm:text-base">

          <div className="flex items-center gap-3">
            <Image
              src="/map.png"
              width={20}
              height={20}
              alt=""
            />
            <span>
              {user?.location || "Manzil kiritilmagan"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Image
              src="/calendar.png"
              width={20}
              height={20}
              alt=""
            />
            <span>{formattedToday}</span>
          </div>

          <div className="flex items-center gap-3">
            <Image
              src="/soat.png"
              width={20}
              height={20}
              alt=""
            />
            <span>
              {now.toLocaleTimeString("uz-UZ")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Image
              src="/dars.png"
              width={20}
              height={20}
              alt=""
            />
            <span>
              {completedLessons} ta dars tugatilgan
            </span>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            mt-6 w-full py-2
            bg-red-600 text-white
            rounded-xl
            hover:bg-red-700 hover:scale-105
            transition
          "
        >
          <span className="flex items-center justify-center gap-2">
            <LogOut size={18} />
            Chiqish
          </span>
        </button>

      </CardContent>
    </Card>
  )
}