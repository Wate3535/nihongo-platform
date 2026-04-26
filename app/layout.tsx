import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Noto_Sans_JP } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import CoinReward from "@/components/coin-reward"
import "./globals.css"

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const _notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
})

export const metadata: Metadata = {
  title: {
    default: "NihonGoo — Yapon tilini o‘rganing",
    template: "%s | NihonGoo",
  },

  description:
    "Yapon tilini tez va oson o‘rganing. JLPT N5, N4, N3 kurslari, interaktiv darslar va AI yordamchi bilan.",

  keywords: [
    "yapon tili",
    "nihongo",
    "japanese learning",
    "JLPT N5",
    "JLPT N4",
    "yapon tili kursi",
  ],

  verification: {
    google: "4bWAn0H5LIlWIxqMOx6bD7kEk2-eAJ_S3u716k8eeaw",
  },

  metadataBase: new URL("https://nihongoo.uz"),

  openGraph: {
    title: "NihonGoo — Yapon tilini o‘rganing",
    description:
      "Yapon tilini tez va oson o‘rganing. Interaktiv platforma va AI yordamchi bilan.",
    url: "https://nihongoo.uz",
    siteName: "NihonGoo",
    images: [
      {
        url: "/japan1.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },

  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#f5f6fa",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#141929",
    },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body
        className={`${_inter.variable} ${_notoSansJP.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CoinReward />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}