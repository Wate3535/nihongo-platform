import Link from "next/link"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  const title = "Xush kelibsiz !"

  return (
    <div className="flex min-h-screen">
      
      {/* LEFT SIDE */}
      <div className="relative hidden flex-1 items-center justify-center lg:flex overflow-hidden">
        
        {/* Background */}
        <div className="absolute inset-0 scale-110">
          <img
            src="/japan1.jpg"
            alt="Japan"
            className="
              h-full w-full 
              object-cover 
              object-center
              opacity-90
            "
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-md px-8 text-center text-white">
          
          {/* TITLE */}
          <h2 className="text-4xl font-bold tracking-tight">
            {title.split("").map((char, i) => (
              <span
                key={i}
                className="inline-block opacity-0 animate-fade-in-up gradient-text"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {char}
              </span>
            ))}
          </h2>

          {/* SUBTITLE */}
          <p className="
            mt-4
            text-2xl md:text-3xl
            font-bold
            leading-snug
            transition-all duration-700
            bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-300
            bg-[length:200%_auto]
            bg-clip-text text-transparent
            animate-gradient
            hover:scale-105 hover:brightness-125 hover:tracking-wide
          ">
            Yapon tilini o‘rganishni davom ettiring.
          </p>

          {/* JAPANESE */}
          <div className="
            mt-10 text-6xl font-bold
            text-white
            transition-all duration-500
            japanese-animated
            hover:scale-110 hover:text-sky-300
          ">
            日本語
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md animate-fade-in">
          
          <Link
            href="/"
            className="text-2xl font-bold text-primary hover:opacity-80 transition"
          >
            NihonGoo
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-foreground">
            Hisobingizga kiring
          </h1>

          <div className="mt-6 animate-fade-in-up delay-700">
            <LoginForm />
          </div>

        </div>
      </div>

    </div>
  )
}