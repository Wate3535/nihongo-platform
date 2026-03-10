"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const existingComments = [
  {
    id: 1,
    name: "Mika S.",
    initials: "MS",
    time: "2 soat oldin",
    text: "Bu dars o‘xshash ko‘rinadigan belgilar orasidagi farqni tushunishga juda yordam berdi. Chiziqlarni yozish tartibini ko‘rsatadigan animatsiyalar juda zo‘r!",
  },
  {
    id: 2,
    name: "Alex T.",
    initials: "AT",
    time: "5 soat oldin",
    text: "Maslahat: har bir belgini kamida 10 marta yozib ko‘ring. Bu eslab qolishni ancha osonlashtiradi.",
  },
  {
    id: 3,
    name: "Yuna K.",
    initials: "YK",
    time: "1 kun oldin",
    text: "Sensei har bir belgi uchun beradigan misollar juda yoqdi. Eslab qolish ancha oson bo‘ldi!",
  },
]

export function LessonComments() {
  const [comment, setComment] = useState("")

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-foreground">
        Izohlar ({existingComments.length})
      </h3>

      {/* Yangi izoh qo‘shish */}
      <div className="mt-4 flex gap-3">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
            JD
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Textarea
            placeholder="Izoh yozing..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[80px] rounded-xl"
          />

          <div className="mt-2 flex justify-end">
            <Button size="sm" className="rounded-lg" disabled={!comment.trim()}>
              Izoh qoldirish
            </Button>
          </div>
        </div>
      </div>

      {/* Izohlar ro‘yxati */}
      <div className="mt-6 flex flex-col gap-5">
        {existingComments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarFallback className="bg-secondary text-xs font-semibold text-foreground">
                {c.initials}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="flex items-baseline gap-2">
                <p className="text-sm font-semibold text-foreground">{c.name}</p>
                <span className="text-xs text-muted-foreground">{c.time}</span>
              </div>

              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {c.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}