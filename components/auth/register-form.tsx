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

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [level, setLevel] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // 1. AUTH REGISTER
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.log(error)

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

    // 2. USERS TABLE INSERT
    const { error: dbError } = await supabase.from("users").insert({
      id: user.id, // 🔥 RLS uchun MUHIM
      name,
      email,
      level,
      paid: false,
      telegram_id: "",
      role: "student",
    })

    if (dbError) {
      console.log(dbError)
      alert("Ma’lumot saqlashda xatolik")
      setLoading(false)
      return
    }

    // SUCCESS
    router.push("/tolov")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* NAME */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Ism va Familiyangiz</Label>
        <Input
          id="name"
          type="text"
          placeholder="To‘liq ismingiz"
          className="rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* EMAIL */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* PASSWORD */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Parol</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Parol yarating"
            className="rounded-lg pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* LEVEL */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="level">Yapon tili darajasi</Label>

        <select
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
          required
        >
          <option value="">Darajangizni tanlang</option>
          <option value="beginner">To‘liq boshlovchi</option>
          <option value="elementary">Boshlang‘ich (N5)</option>
          <option value="pre-intermediate">N4</option>
          <option value="intermediate">N3</option>
          <option value="advanced">N2/N1</option>
        </select>
      </div>

      {/* BUTTON */}
      <Button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-lg"
      >
        {loading ? "Yuklanmoqda..." : "Hisob Yaratish"}
      </Button>

    </form>
  )
}