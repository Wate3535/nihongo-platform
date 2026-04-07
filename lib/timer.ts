
export function getStartTime() {
  if (typeof window === "undefined") return 0

  let start = localStorage.getItem("session_start")

  if (!start) {
    start = Date.now().toString()
    localStorage.setItem("session_start", start)
  }

  return Number(start)
}
export function formatTime(seconds: number) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0")
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")
  const s = String(seconds % 60).padStart(2, "0")

  return `${h}:${m}:${s}`
}