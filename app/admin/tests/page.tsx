"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function TestCategoriesPage() {
  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    fetchCourses()
  }, [])

  async function fetchCourses() {
    const { data } = await supabase.from("courses").select("*")
    setCourses(data || [])
  }

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gray-50">

      <div>
        <h1 className="text-3xl font-bold">
          Qaysi bo‘limga test qo‘shmoqchisiz?
        </h1>
        <p className="text-gray-500 mt-1">
          Kerakli bo‘limni tanlang
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/admin/tests/${course.id}`}
            className="p-6 rounded-2xl bg-white border shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-sm text-gray-500 mt-2">
              Test qo‘shish →
            </p>
          </Link>
        ))}
      </div>

      <Link href="/admin" className="text-gray-500">
        ← Orqaga
      </Link>
    </div>
  )
}