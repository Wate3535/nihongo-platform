"use client"

import Link from "next/link"


const categories = [
  { name: "Alifbo", slug: "alphabet", icon: "📚" },
  { name: "Grammatika", slug: "grammar", icon: "📖" },
  { name: "Kanji", slug: "kanji", icon: "🈶" },
  { name: "So'z boyligi", slug: "vocabulary", icon: "📝" },
  { name: "Choukai", slug: "listening", icon: "🎧" },
  { name: "Dokkai", slug: "reading", icon: "📄" },
]

export default function LessonsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6">

      <h1 className="text-4xl font-bold mb-12">
        Video dars kategoriyalari
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {categories.map((cat) => (

          <Link
            key={cat.slug}
            href={`/dashboard/lessons/${cat.slug}`}
          >

            <div className="
              group
              p-16
              bg-card
              rounded-3xl
              border border-border
              hover:border-primary
              hover:bg-primary/10
              transition-all
              duration-300
              cursor-pointer
              text-center
              hover:scale-110
              shadow-lg
            ">

              <div className="
                text-6xl
                mb-6
                transition-all
                duration-300
                group-hover:scale-125
                group-hover:-rotate-6
              ">
                {cat.icon}
              </div>

              <h2 className="text-2xl font-semibold">
                {cat.name}
              </h2>

            </div>

          </Link>

        ))}

      </div>

    </div>
  )
}