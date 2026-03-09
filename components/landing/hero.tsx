import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-20 text-center lg:pt-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
         Butun dunyo bo‘ylab 50 000+ o‘quvchi
        </div>

        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Interaktiv darslar yordamida yapon tilini o‘zlashtiring{" "}
          <span className="text-primary">Ishonch</span> va {" "}
          <span className="text-accent">Natija</span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Interaktiv video darslar, sun’iy intellekt yordamidagi gapirish mashqlari va shaxsiy 
          rivojlanishingizni kuzatib borish tizimi orqali yapon tilini o‘rganing. Boshlang‘ich 
          darajadan erkin so‘zlash darajasigacha — biz sizga har bir bosqichda yo‘l ko‘rsatamiz.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="rounded-full px-8 text-base">
            <Link href="/register">
             Kursni sotib olish
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-base bg-transparent">
            <Link href="#features">
              <Play className="mr-2 h-4 w-4" />
              Platforma qanday ishlashini ko‘rish
            </Link>
          </Button>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid w-full max-w-3xl grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-foreground">200+</span>
            <span className="mt-1 text-sm text-muted-foreground">Video Darslar</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-foreground">50+</span>
            <span className="mt-1 text-sm text-muted-foreground">Faol o'rganuvchilar</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-foreground">4.9</span>
            <span className="mt-1 text-sm text-muted-foreground">O‘rtacha baho</span>
          </div>
        </div>
      </div>
    </section>
  )
}
