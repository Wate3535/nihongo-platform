"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

type ReviewFormModalProps = {
  onClose: () => void
}

export function ReviewFormModal({ onClose }: ReviewFormModalProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)

    // 🔥 Auth user olish
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("Login qilinmagan")
      setLoading(false)
      return
    }

    
    const { data: profile } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single()

    
    const { error } = await supabase.from("reviews").insert({
  user_id: user.id,
  user_name: profile?.name || "Anonim",
  user_avatar: profile?.avatar_url || "/avatar.png",
  level: profile?.level || "N5",
  rating,
  comment,
  lessons_completed: 0,
  is_verified: true,
})

    if (error) {
      console.error(error)
      alert("Xatolik yuz berdi")
      setLoading(false)
      return
    }

    setLoading(false)
    onClose() // 🔥 modal yopiladi (reload shart emas)
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#111] p-6 rounded-2xl w-[400px] border border-white/10">

        <h2 className="text-xl font-bold mb-4 text-white">
          Fikr qoldiring
        </h2>

        {/* ⭐ Rating */}
        <div className="flex gap-2 mb-4">
          {[1,2,3,4,5].map(i => (
            <button
              key={i}
              onClick={() => setRating(i)}
              className={`text-2xl transition ${
                i <= rating ? "scale-110" : "opacity-40"
              }`}
            >
              ⭐
            </button>
          ))}
        </div>

        {/* 📝 Comment */}
        <textarea
          placeholder="Fikringizni yozing..."
          className="w-full p-3 rounded-xl bg-white/10 mb-4 text-white outline-none"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* 🚀 Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            w-full py-2 rounded-xl
            bg-gradient-to-r from-blue-500 to-purple-600
            hover:scale-105
            transition
          "
        >
          {loading ? "Yuborilmoqda..." : "Yuborish"}
        </button>

        {/* ❌ Cancel */}
        <button
          onClick={onClose}
          className="mt-2 w-full text-sm text-white/50 hover:text-white"
        >
          Bekor qilish
        </button>

      </div>
    </div>
  )
}