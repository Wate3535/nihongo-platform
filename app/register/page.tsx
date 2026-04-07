import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  const title = "Yapon tilini o‘rganish yo‘lingizni boshlang"

  return (
    <div className="flex min-h-screen">

      {/* LEFT SIDE */}
      <div className="relative hidden flex-1 items-center justify-center lg:flex overflow-hidden">
        
        {/* Background */}
        <img
          src="/japan2.jpg"
          alt="Japan"
          className="absolute inset-0 h-full w-full object-cover scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 max-w-xl px-8 text-center text-white">
          
          {/* TITLE (animated letters) */}
          <h2 className="text-4xl font-bold tracking-tight leading-snug">
            {title.split("").map((char, i) => (
              <span
                key={i}
                className="inline-block opacity-0 animate-fade-in-up gradient-text"
                style={{ animationDelay: `${i * 0.02}s` }}
              >
                {char}
              </span>
            ))}
          </h2>

          {/* SUBTITLE */}
          <p className="
            mt-6
            text-xl md:text-2xl
            font-semibold
            leading-relaxed
            bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-300
            bg-[length:200%_auto]
            bg-clip-text text-transparent
            animate-gradient
            hover:scale-105 transition-all duration-500
          ">
            Interaktiv platformamiz orqali yapon tilini o‘zlashtirayotgan o‘quvchilarga qo‘shiling
          </p>

          {/* JAPANESE TEXT */}
          <div className="
            mt-12 text-7xl font-bold
            japanese-animated
            hover:scale-110 hover:text-sky-300
            transition-all duration-500
          ">
            始めましょう
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md animate-fade-in">
          
          <div className="mb-8">
            <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition">
              NihonGo
            </Link>

            <h1 className="mt-6 text-2xl font-bold text-foreground">
              Hisob yarating
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Allaqachon hisobingiz bormi?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Kirish
              </Link>
            </p>
          </div>

          <div className="animate-fade-in-up delay-500">
            <RegisterForm />
          </div>

        </div>
      </div>

    </div>
  )
}