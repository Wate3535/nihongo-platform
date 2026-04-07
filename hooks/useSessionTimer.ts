"use client"

import { useEffect, useState } from "react"
import { getStartTime } from "@/lib/timer"

export function useSessionTimer() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const start = getStartTime()

    const interval = setInterval(() => {
      const now = Date.now()
      setTime(Math.floor((now - start) / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return time
}