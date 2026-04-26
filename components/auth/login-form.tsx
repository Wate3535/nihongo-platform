"use client"

import React, { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"

function LoginFormInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirect = searchParams.get("redirect")

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (redirect) {
      router.push(redirect)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex flex-col gap-4">

      {/* 🔙 Back Button */}
      <button
        type="button"
        onClick={() => router.push("/")}
        className="
          w-fit flex items-center gap-2
          text-sm text-muted-foreground
          hover:text-primary
          transition-all duration-200
          hover:scale-105
        "
      >
        <ArrowLeft size={16} />
        Bosh sahifaga qaytish
      </button>

      <form
        onSubmit={handleSubmit}
        className="
          flex flex-col gap-5
          p-6 rounded-2xl
          shadow-lg
          transition-all duration-300
          hover:shadow-2xl hover:scale-[1.02]
          animate-fade-in-up
        "
      >

        {/* ERROR */}
        {error && (
          <div className="text-red-500 text-sm animate-shake">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              transition-all duration-200
              focus:scale-[1.03]
              focus:ring-2 focus:ring-blue-400
            "
          />
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-2">
          <Label>Parol</Label>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                pr-10
                transition-all duration-200
                focus:scale-[1.03]
                focus:ring-2 focus:ring-blue-400
              "
            />

            <button
              type="button"
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                transition-transform duration-200
                hover:scale-110
              "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="
                text-sm text-blue-500
                transition-all duration-200
                hover:underline hover:scale-105
              "
            >
              Parolni unutdingizmi?
            </button>
          </div>
        </div>

        {/* SUBMIT */}
        <Button
          type="submit"
          disabled={loading}
          className="
            mt-2 rounded-lg
            bg-gradient-to-r from-blue-500 to-indigo-500
            text-white
            transition-all duration-300
            hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-indigo-600
          "
        >
          {loading ? "Kuting..." : "Log In"}
        </Button>

      </form>
    </div>
  )
}

export function LoginForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormInner />
    </Suspense>
  )
}