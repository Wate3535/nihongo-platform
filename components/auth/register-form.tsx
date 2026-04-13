"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export function RegisterForm() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState("")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [level, setLevel] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (level !== "N5") {
      setWarning("⚠️ Hozircha faqat N5 daraja mavjud")
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      if (error.message.includes("User already registered")) {
        alert("Bu email bilan hisob mavjud. Iltimos, tizimga kiring.")
        router.push("/login")
      } else {
        alert(error.message)
      }
      setLoading(false)
      return
    }

    const user = data.user

    if (!user) {
      alert("User yaratilmadi")
      setLoading(false)
      return
    }

    const { error: dbError } = await supabase.from("users").insert({
      id: user.id,
      name,
      email,
      level,
      paid: false,
      telegram_id: "",
      role: "student",
    })

    if (dbError) {
      alert("Ma’lumot saqlashda xatolik")
      setLoading(false)
      return
    }

    router.push("/tolov")
  }

  // 🔥 LEVEL CHANGE HANDLER
  function handleLevelChange(value: string) {
    if (value !== "N5") {
      setWarning("🚧 Bu daraja hali ishlab chiqilmoqda")
      return
    }

    setWarning("")
    setLevel(value)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
    >

      {/* NAME */}
      <div className="flex flex-col gap-2">
        <Label>Ism va Familiyangiz</Label>
        <Input
          type="text"
          placeholder="To‘liq ismingiz"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="transition-all focus:scale-[1.02]"
        />
      </div>

      {/* EMAIL */}
      <div className="flex flex-col gap-2">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="transition-all focus:scale-[1.02]"
        />
      </div>

      {/* PASSWORD */}
      <div className="flex flex-col gap-2">
        <Label>Parol</Label>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Parol yarating"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pr-10 transition-all focus:scale-[1.02]"
          />

          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:scale-110 transition"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* LEVEL */}
      <div className="flex flex-col gap-2">
        <Label>Yapon tili darajasi</Label>

        <select
          value={level}
          onChange={(e) => handleLevelChange(e.target.value)}
          className="h-10 rounded-lg border px-3 transition-all hover:scale-[1.02] focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Darajangizni tanlang</option>
          <option value="N5">Boshlang‘ich (N5)</option>
          <option value="N4">N4 (tez kunda)</option>
          <option value="N3">N3 (tez kunda)</option>
          <option value="N2">N2 (tez kunda)</option>
          <option value="N1">N1 (tez kunda)</option>
        </select>

        {/* ⚠️ WARNING */}
        {warning && (
          <p className="text-sm text-red-500 animate-pulse">
            {warning}
          </p>
        )}
      </div>

      {/* BUTTON */}
      <Button
        type="submit"
        disabled={loading}
        className="
          mt-2 rounded-lg
          transition-all duration-300
          hover:scale-105 hover:bg-blue-600
        "
      >
        {loading ? "Yuklanmoqda..." : "Hisob Yaratish"}
      </Button>

    </form>
  )
}