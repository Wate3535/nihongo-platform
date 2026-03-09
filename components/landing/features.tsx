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
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to learn Japanese
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            A complete learning ecosystem designed to take you from your first hiragana to fluent conversation.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border border-border bg-background transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
