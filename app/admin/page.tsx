"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { PlusCircle, ClipboardList } from "lucide-react"

export default function AdminPage() {
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single()

      setRole(data?.role)
    }

    checkAdmin()
  }, [])

  if (role !== "admin") {
    return <p className="p-6 text-red-500">Access denied ❌</p>
  }

  return (
    <div className="p-6 space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Admin Panel
        </h1>
        <p className="text-muted-foreground mt-1">
          Platformani boshqarish va darslar qo‘shish
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Dars qo‘shish */}
        <Link
          href="/admin/add"
          className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition">
              <PlusCircle className="w-6 h-6 text-primary" />
            </div>

            <div>
              <h2 className="font-semibold text-foreground">
                Dars qo‘shish
              </h2>
              <p className="text-sm text-muted-foreground">
                Yangi lesson yaratish
              </p>
            </div>
          </div>
        </Link>

        {/* TEST QO‘SHISH */}
        <Link
          href="/admin/tests"
          className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-500/10 group-hover:bg-green-500/20 transition">
              <ClipboardList className="w-6 h-6 text-green-600" />
            </div>

            <div>
              <h2 className="font-semibold text-foreground">
                Test qo‘shish
              </h2>
              <p className="text-sm text-muted-foreground">
                Lesson uchun test yaratish
              </p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  )
}