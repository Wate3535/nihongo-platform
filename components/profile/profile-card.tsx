"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"

export function ProfileCard({ user }: { user: any }) {

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = useState(user?.avatar_url)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}.${fileExt}`

    await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true })

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName)

    const publicUrl = data.publicUrl

    await supabase
      .from('users')
      .update({ avatar_url: publicUrl })
      .eq('id', user.id)

    setAvatar(publicUrl)
  }

  const months = ["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr"]
  const formattedToday = `${now.getFullYear()}-yil ${now.getDate()}-${months[now.getMonth()]}`

  return (
    <Card className="max-w-md mx-auto rounded-3xl border shadow-xl 
      bg-white text-gray-900 
      dark:bg-zinc-900 dark:text-white 
      transition-all duration-300">

      <CardContent className="flex flex-col items-center p-8 text-center">

        {/* Avatar */}
        <div onClick={handleClick} className="cursor-pointer relative group">
          <Avatar className="h-28 w-28 rounded-full overflow-hidden">
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
        <h2 className="mt-5 text-2xl font-bold hover:text-blue-600 transition">
          {user?.name}
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {user?.email}
        </p>

        {/* Badges */}
        <div className="mt-3 flex gap-2">
          <Badge className="rounded-full px-3 py-1 text-sm">
            {user?.level}
          </Badge>

          <Badge className="rounded-full bg-blue-100 text-blue-600 px-3 py-1 text-sm">
            Faol o‘quvchi
          </Badge>
        </div>

        {/* Edit */}
        <Link href="/profile/edit" className="w-full">
          <button className="mt-5 w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition">
            Edit Profile ✏️
          </button>
        </Link>

        {/* INFO */}
        <div className="mt-6 w-full space-y-4 text-left">

          {/* Location */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <Image src="/map.png" width={20} height={20} alt="" className="group-hover:scale-125 transition" />
            <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition">
              {user?.location || "Manzil kiritilmagan"}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <Image src="/calendar.png" width={20} height={20} alt="" className="group-hover:scale-125 transition" />
            <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition">
              {formattedToday}
            </span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <Image src="/soat.png" width={20} height={20} alt="" className="group-hover:scale-125 transition" />
            <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition">
              {now.toLocaleTimeString("uz-UZ")}
            </span>
          </div>

          {/* Lessons */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <Image src="/dars.png" width={20} height={20} alt="" className="group-hover:scale-125 transition" />
            <span className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition">
              0 ta dars tugatilgan
            </span>
          </div>

        </div>

      </CardContent>
    </Card>
  )
}