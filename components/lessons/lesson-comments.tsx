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
    time: "2 hours ago",
    text: "This lesson really helped me understand the difference between the similar-looking characters. The stroke order animations are great!",
  },
  {
    id: 2,
    name: "Alex T.",
    initials: "AT",
    time: "5 hours ago",
    text: "Tip for everyone: try writing each character at least 10 times while watching. It really helps with muscle memory.",
  },
  {
    id: 3,
    name: "Yuna K.",
    initials: "YK",
    time: "1 day ago",
    text: "I love how the sensei explains the mnemonics for each character. Makes it so much easier to remember!",
  },
]

export function LessonComments() {
  const [comment, setComment] = useState("")

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-foreground">
        Comments ({existingComments.length})
      </h3>

      {/* Add comment */}
      <div className="mt-4 flex gap-3">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
            JD
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[80px] rounded-xl"
          />
          <div className="mt-2 flex justify-end">
            <Button size="sm" className="rounded-lg" disabled={!comment.trim()}>
              Post Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Comment list */}
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
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
