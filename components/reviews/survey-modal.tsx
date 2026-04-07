"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

type Props = {
  onClose: () => void
}

export default function SurveyModal({ onClose }: Props) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  const handleSubmit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data: profile } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single()

    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      user_name: profile?.name || user.email,
      user_avatar: profile?.avatar_url || "",
      level: profile?.level || "N5",
      rating,
      comment,
      lessons_completed: profile?.lessons_completed || 0,
      is_verified: true,
    })

    if (error) {
      alert("Xatolik!")
      return
    }

    // 🔥 endi qayta chiqmasin
    await supabase
      .from("users")
      .update({ already_reviewed: true })
      .eq("id", user.id)

    alert("Rahmat! 🙌")

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111] p-6 rounded-2xl w-[400px] text-white">

        <h2 className="text-xl font-bold mb-4">
          Platforma haqida fikringiz
        </h2>

        <div className="flex gap-2 mb-4">
          {[1,2,3,4,5].map(i => (
            <button key={i} onClick={() => setRating(i)}>
              ⭐
            </button>
          ))}
        </div>

        <textarea
          className="w-full p-3 rounded-xl bg-white/10 mb-4"
          placeholder="Fikringiz..."
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-500 rounded-xl mb-2"
        >
          Yuborish
        </button>

        <button
          onClick={onClose}
          className="w-full text-sm text-white/50"
        >
          Bekor qilish
        </button>

      </div>
    </div>
  )
}