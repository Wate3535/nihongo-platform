"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Dokkai } from "@/components/lessons/dokkai"


export default function SelectCategory() {
  const [courses, setCourses] = useState<any[]>([])

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await supabase.from("courses").select("*")
      setCourses(data || [])
    }

    fetchCourses()
  }, [])

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gray-50 text-gray-900 dark:bg-black dark:text-white">

      {/* TITLE */}
      <div>
        <h1 className="text-3xl font-bold">
          Qaysi bo‘limga qo‘shmoqchisiz?
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Qaysi kursga dars qo‘shmoqchi ekaningizni tanlang
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/admin/add/${course.id}`}
            className="group p-6 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-primary transition">
              {course.title}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Dars qo‘shish →
            </p>
          </Link>
        ))}

      </div>

      {/* BACK */}
      <Link
        href="/admin"
        className="text-sm text-gray-500 hover:text-primary transition"
      >
        ← Orqaga
      </Link>

    </div>
  )
}