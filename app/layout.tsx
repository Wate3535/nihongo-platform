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
  metadataBase: new URL("https://nihongoo.uz"),

  title: {
    default: "NihonGoo — Yapon tilini o‘rganing",
    template: "%s | NihonGoo",
  },

  description:
    "Yapon tilini tez va oson o‘rganing. JLPT N5, N4, N3 kurslari, interaktiv darslar va AI yordamchi bilan.",

  keywords: [
    "NihonGoo",
    "nihongoo",
    "yapon tili",
    "nihongo",
    "japanese learning",
    "JLPT N5",
    "JLPT N4",
    "JLPT N3",
    "yapon tili kursi",
    "japanese language uzbekistan",
  ],

  authors: [{ name: "NihonGoo" }],
  creator: "NihonGoo",
  publisher: "NihonGoo",
  applicationName: "NihonGoo",
  category: "education",

  verification: {
    google: "4bWAn0H5LIlWIxqMOx6bD7kEk2-eAJ_S3u716k8eeaw",
  },

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    url: "https://nihongoo.uz",
    siteName: "NihonGoo",
    title: "NihonGoo — Yapon tilini o‘rganing",
    description:
      "Yapon tilini tez va oson o‘rganing. Interaktiv platforma va AI yordamchi bilan.",
    locale: "uz_UZ",
    images: [
      {
        url: "/japan1.jpg",
        width: 1200,
        height: 630,
        alt: "NihonGoo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "NihonGoo — Yapon tilini o‘rganing",
    description:
      "Yapon tilini tez va oson o‘rganing. Interaktiv platforma va AI yordamchi bilan.",
    images: ["/japan1.jpg"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "NihonGoo",
    url: "https://nihongoo.uz",
    logo: "https://nihongoo.uz/favicon.ico",
    description:
      "Yapon tilini o‘rganish platformasi. JLPT kurslari, interaktiv darslar va AI yordamchi.",
    sameAs: [],
  }

  return (
    <html lang="uz" suppressHydrationWarning>
      <body
        className={`${_inter.variable} ${_notoSansJP.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />

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