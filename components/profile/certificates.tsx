"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Award,
  Download,
  Lock,
} from "lucide-react"
import { motion } from "framer-motion"

export function Certificates() {
  const [unlocked, setUnlocked] =
    useState(false)

  const [percent, setPercent] =
    useState(0)

  useEffect(() => {
    checkCertificate()
  }, [])

  async function checkCertificate() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { count: totalLessons } =
      await supabase
        .from("lessons")
        .select("*", {
          count: "exact",
          head: true,
        })

    const { count: completedLessons } =
      await supabase
        .from("progress")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id)
        .eq("completed", true)

    const total =
      totalLessons || 0

    const completed =
      completedLessons || 0

    const progress =
      total > 0
        ? Math.round(
            (completed / total) *
              100
          )
        : 0

    setPercent(progress)

    if (progress >= 100) {
      setUnlocked(true)
    }
  }

  return (
    <Card className="border border-border bg-card rounded-2xl shadow-sm w-full">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-foreground">
          Sertifikat
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Barcha kurslarni 100%
          tugatib sertifikatni
          qo‘lga kiriting
        </p>
      </CardHeader>

      <CardContent>
        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          transition={{
            duration: 0.25,
          }}
          className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border p-4 ${
            unlocked
              ? "border-green-500 bg-green-500/5"
              : "border-border bg-muted/30"
          }`}
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              unlocked
                ? "bg-green-500/10 text-green-600"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {unlocked ? (
              <Award className="h-5 w-5" />
            ) : (
              <Lock className="h-5 w-5" />
            )}
          </div>

          <div className="flex-1">
            <p className="font-semibold text-foreground">
              NihonGoo Master
              Sertifikati
            </p>

            <p className="text-xs text-muted-foreground mt-1">
              Progress: {percent}%
            </p>
          </div>

          {unlocked ? (
            <a
              href="/certificates/N5_sertifikat.png"
              download
            >
              <Button className="rounded-xl w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Yuklab olish
              </Button>
            </a>
          ) : (
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-1"
            >
              Qulflangan
            </Badge>
          )}
        </motion.div>
      </CardContent>
    </Card>
  )
}