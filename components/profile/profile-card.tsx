"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { MapPin, Calendar, BookOpen } from "lucide-react"

export function ProfileCard() {

  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .limit(1)
      .single()

    if (error) {
      console.log(error)
      return
    }

    setProfile(data)
  }

  const handleUpload = async (e: any) => {

    const file = e.target.files[0]
    if (!file) return

    if (!profile) {
      console.log("Profile hali yuklanmagan")
      return
    }

    const fileName = `${Date.now()}-${file.name}`

    const { error } = await supabase
      .storage
      .from("avatars")
      .upload(fileName, file)

    if (error) {
      console.log(error)
      return
    }

    const { data } = supabase
      .storage
      .from("avatars")
      .getPublicUrl(fileName)

    await supabase
      .from("profiles")
      .update({
        avatar_url: data.publicUrl
      })
      .eq("id", profile.id)

    fetchProfile()
  }

  return (
    <Card className="border border-border bg-card">
      <CardContent className="flex flex-col items-center p-6 text-center">

        <label className="cursor-pointer">

          <Avatar className="h-24 w-24">

            {profile?.avatar_url ? (

              <img
                src={profile.avatar_url}
                className="h-full w-full rounded-full object-cover"
              />

            ) : (

              <AvatarFallback className="bg-primary/10 text-2xl font-bold text-primary">
                {profile?.full_name?.[0] || "U"}
              </AvatarFallback>

            )}

          </Avatar>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />

        </label>

        <h2 className="mt-4 text-xl font-bold text-foreground">
          {profile?.full_name || "John Doe"}
        </h2>

        <p className="text-sm text-muted-foreground">
          {profile?.email || "john.doe@example.com"}
        </p>

        <div className="mt-3 flex gap-2">

          <Badge variant="secondary" className="rounded-full">
            {profile?.level || "N4 daraja"}
          </Badge>

          <Badge
            variant="secondary"
            className="rounded-full bg-primary/10 text-primary"
          >
            12 kunlik ketma-ket o‘qish
          </Badge>

        </div>

        <div className="mt-6 w-full space-y-3 text-left">

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{profile?.location || "Tashkent"}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>2025-yil martda qo‘shilgan</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4 shrink-0" />
            <span>{profile?.completed_lessons || 0} ta dars tugatilgan</span>
          </div>

        </div>

      </CardContent>
    </Card>
  )
}

