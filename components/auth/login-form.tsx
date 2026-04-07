"use client"

import React, { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

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
            placeholder="Enter your password"
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
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.push("/forgot-password")}
            className="text-sm text-blue-500 hover:underline"
          >
            Parolni unutdingizmi?
          </button>
        </div>

      </div>

      <Button type="submit" className="mt-2 rounded-lg" disabled={loading}>
        {loading ? "Kuting..." : "Log In"}
      </Button>

    </form>
  )
}

export function LoginForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginFormInner />
    </Suspense>
  )
}