"use client"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, BookOpen } from "lucide-react"
import { supabase } from "@/lib/supabase"

export function ProfileCard({ user }: { user: any }) {

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = useState(user?.avatar_url)

  // ⏰ REAL TIME
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

    const { error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true })

    if (error) {
      console.error("UPLOAD ERROR:", error)
      return
    }

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
  const formattedToday = `${now.getFullYear()}-yil ${now.getDate()}-${months[now.getMonth()]}`

  return (
    <Card className="border border-border bg-card">
      <CardContent className="flex flex-col items-center p-6 text-center">

        {/* Avatar */}
        <div onClick={handleClick} className="cursor-pointer">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatar} />
            <AvatarFallback className="bg-primary/10 text-2xl font-bold text-primary">
              {user?.name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Name */}
        <h2 className="mt-4 text-xl font-bold text-foreground">
          {user?.name}
        </h2>

        <p className="text-sm text-muted-foreground">
          {user?.email}
        </p>

        {/* Badges */}
        <div className="mt-3 flex gap-2">
          <Badge variant="secondary" className="rounded-full">
            {user?.level}
          </Badge>

          <Badge
            variant="secondary"
            className="rounded-full bg-primary/10 text-primary"
          >
            Faol o‘quvchi
          </Badge>
        </div>

        {/* INFO */}
        <div className="mt-6 w-full space-y-3 text-left">

          {/* LOCATION */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{user?.location || "Manzil kiritilmagan"}</span>
          </div>

          {/* DATE */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formattedToday}</span>
          </div>

          {/* TIME */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>⏰</span>
            <span>{now.toLocaleTimeString("uz-UZ")}</span>
          </div>

          {/* PROGRESS */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>0 ta dars tugatilgan</span>
          </div>

        </div>

      </CardContent>
    </Card>
  )
}