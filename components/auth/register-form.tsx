"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

export function RegisterForm() {

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [level, setLevel] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

   const { error } = await supabase.from("users").insert([
{
  name: name,
  email: email,
  level: level,
  paid: false,
  telegram_id: ""
}
])
    if (error) {
      alert("Xatolik yuz berdi")
      console.log(error)
    } else {
      router.push("/tolov")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

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

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Parol</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Parol yarating"
            className="rounded-lg pr-10"
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
          <option value="pre-intermediate">Boshlang‘ichdan yuqori (N4)</option>
          <option value="intermediate">O‘rta daraja (N3)</option>
          <option value="advanced">Yuqori daraja (N2/N1)</option>
        </select>

      </div>

      <Button type="submit" className="mt-2 rounded-lg">
        Hisob Yaratish
      </Button>

    </form>
  )
}