"use client"

import Link from "next/link"
import { Send, Users, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card overflow-hidden">

      {/* 🌈 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-10 md:grid-cols-4">

          {/* LOGO */}
          <div>
            <h3 className="
              text-2xl font-bold
              bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent
              transition duration-300 hover:scale-105
            ">
              NihonGoo
            </h3>

            <p className="
              mt-4 text-muted-foreground
              transition duration-300 hover:scale-[1.03]
            ">
              Yapon tilini o‘rganishning zamonaviy yo‘li — interaktiv, samarali va oson.
            </p>
          </div>

          {/* PLATFORMA */}
          <div>
            <h4 className="font-semibold text-foreground transition hover:scale-105">
              Platforma
            </h4>

            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground transition duration-300 hover:scale-110 hover:text-indigo-500">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link href="/dashboard/lessons" className="text-sm text-muted-foreground transition duration-300 hover:scale-110 hover:text-indigo-500">
                  Darslar
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-sm text-muted-foreground transition duration-300 hover:scale-110 hover:text-indigo-500">
                  Imkoniyatlar
                </Link>
              </li>
            </ul>
          </div>

          {/* HAMJAMIYAT */}
          <div>
            <h4 className="font-semibold text-foreground transition hover:scale-105">
              Hamjamiyat
            </h4>

            <ul className="mt-4 space-y-3">

              <li>
                <a
                  href="https://t.me/nihongosenpai"
                  target="_blank"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition duration-300 hover:scale-110 hover:text-indigo-500"
                >
                  <Send className="h-4 w-4" />
                  Telegram kanal
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition duration-300 hover:scale-110 hover:text-indigo-500"
                >
                  <Users className="h-4 w-4" />
                  Telegram group
                </a>
              </li>

            </ul>
          </div>

          {/* ALOQA */}
          <div>
            <h4 className="font-semibold text-foreground transition hover:scale-105">
              Aloqa & Foydali
            </h4>

            <ul className="mt-4 space-y-3">

              <li>
                <a
                  href="https://ujc.uz/uz/novostdetalno_10_587/"
                  target="_blank"
                  className="text-sm text-muted-foreground transition duration-300 hover:scale-110 hover:text-indigo-500"
                >
                  JLPT Uzbekistan
                </a>
              </li>

              <li>
                <a
                  href="https://www.jlpt.jp/e/"
                  target="_blank"
                  className="text-sm text-muted-foreground transition duration-300 hover:scale-110 hover:text-indigo-500"
                >
                  JLPT Japan
                </a>
              </li>

              <li>
                <a
                  href="tel:+998953223535"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition duration-300 hover:scale-110 hover:text-indigo-500"
                >
                  <Phone className="h-4 w-4" />
                  +998 95 322 35 35
                </a>
              </li>

              <li>
                <a
                  href="https://t.me/wate_jp"
                  target="_blank"
                  className="text-sm text-muted-foreground transition duration-300 hover:scale-110 hover:text-indigo-500"
                >
                  Founder Telegram
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg font-semibold transition hover:scale-105">
            Yapon tilini o‘rganishni hoziroq boshlang 🚀
          </p>

          <Link
            href="/register"
            className="
              mt-4 inline-block rounded-full px-6 py-2
              bg-gradient-to-r from-indigo-500 to-blue-500
              text-white shadow
              transition-all duration-300
              hover:scale-110 hover:shadow-lg
            "
          >
            Boshlash
          </Link>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © 2026 NihonGoo. Barcha huquqlar himoyalangan.
        </div>

      </div>
    </footer>
  )
}