"use client"

import { Video, MessageCircle, BarChart3, BookOpen, Mic, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Video,
    title: "Video Darslar",
    description:
      "Grammatika, so‘z boyligi va madaniy kontekstni qamrab olgan, ona tilida so‘zlashuvchi o‘qituvchilar tomonidan tayyorlangan tartibli darslar.",
  },
  {
    icon: Mic,
    title: "AI Suhbat Chat",
    description:
      "Talaffuz va grammatika bo‘yicha darhol fikr-mulohaza beradigan AI o‘qituvchi bilan suhbat mashqlarini bajaring.",
  },
  {
    icon: BarChart3,
    title: "Rivojlanish kuzatuvi",
    description:
      "Vizual ko‘rsatkichlar paneli sizning o‘qish, yozish, gapirish va tinglab tushunish ko‘nikmalaringizdagi rivojlanishni ko‘rsatadi.",
  },
  {
    icon: BookOpen,
    title: "JLPT imtihoniga tayyorgarlik",
    description:
      "N5 dan N1 gacha bo‘lgan darajalar uchun maxsus kurslar va sinov imtihonlari.",
  },
  {
    icon: MessageCircle,
    title: "Hamjamiyat forumi",
    description:
      "Boshqa o‘quvchilar bilan bog‘laning, foydali maslahatlar bilan o‘rtoqlashing va faol hamjamiyatimizda birgalikda mashq qiling.",
  },
  {
    icon: Award,
    title: "Sertifikatlar",
    description:
      "Kurslarni yakunlab va yangi darajalarga erishganingiz sari tan olingan sertifikatlarni qo‘lga kiriting.",
  },
]

export function Features() {
  return (
    <section id="features" className="bg-card py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center group">

          {/* 🔥 KATTALASHTIRILGAN LABEL */}
          <p
            className="
            text-base sm:text-lg font-semibold uppercase tracking-[0.3em]
            text-transparent bg-clip-text
            bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500
            animate-pulse
            "
          >
            imkoniyatlar
          </p>

          {/* TITLE */}
          <h2
            className="
            mt-3 text-3xl font-bold tracking-tight sm:text-4xl
            relative inline-block
            cursor-pointer
            text-foreground
            transition-all duration-500
            hover:text-transparent hover:bg-clip-text
            hover:bg-gradient-to-r hover:from-indigo-400 hover:via-blue-400 hover:to-purple-400
            "
          >
            Yapon tilini o‘rganish uchun kerak bo‘lgan hamma narsa

            <span
              className="
              absolute left-0 -bottom-2 h-[3px] w-0
              bg-gradient-to-r from-indigo-500 to-purple-500
              transition-all duration-500
              group-hover:w-full
              "
            />
          </h2>

          {/* 🔥 FIX QILINGAN SUBTITLE */}
          <p
            className="
            mt-4 text-lg leading-relaxed text-muted-foreground
            transition duration-500
            hover:text-indigo-600 dark:hover:text-indigo-400
            hover:scale-[1.02]
            "
          >
            Sizni birinchi hiraganadan boshlab ravon suhbat darajasigacha olib borishga mo‘ljallangan to‘liq o‘quv tizimi.
          </p>

        </div>

        {/* CARDS */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <Card
              key={feature.title}
              className="
              group relative overflow-hidden rounded-2xl border border-white/10 bg-background 
              transition-all duration-300
              hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-500/40
              "
            >
              <div
                className="
                absolute inset-0 opacity-0 group-hover:opacity-100 
                transition duration-500
                bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-purple-500/10
                blur-xl
                "
              />

              <CardContent className="relative p-6">

                <div
                  className="
                  flex h-12 w-12 items-center justify-center rounded-xl 
                  bg-primary/10 text-primary 
                  transition-all duration-300
                  group-hover:bg-primary group-hover:text-white
                  group-hover:scale-110 group-hover:rotate-6
                  "
                >
                  <feature.icon className="h-6 w-6" />
                </div>

                <h3
                  className="
                  mt-4 text-lg font-semibold text-foreground 
                  transition group-hover:text-indigo-400
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                  mt-2 leading-relaxed text-muted-foreground
                  transition group-hover:text-muted-foreground/80
                  "
                >
                  {feature.description}
                </p>

              </CardContent>
            </Card>
          ))}

        </div>
      </div>
    </section>
  )
}