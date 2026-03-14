"use client"

import { supabase } from "@/lib/supabase"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type Comment = {
  id: number
  lesson_id: number
  user_name: string
  comment: string
  created_at: string
}

type Reply = {
  id: number
  comment_id: number
  reply: string
  created_at: string
}

export function LessonComments({ lessonId }: { lessonId: number }) {

  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const [replies, setReplies] = useState<Reply[]>([])
  const [replyText, setReplyText] = useState<Record<number,string>>({})

  useEffect(() => {
    fetchComments()
    fetchReplies()
  }, [lessonId])

 const fetchComments = async () => {
  const { data, error } = await supabase
    .from("lesson_comments")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("created_at", { ascending: false })

  if (!error && data) setComments(data)
}

  const fetchReplies = async () => {

    const { data, error } = await supabase
      .from("comment_replies")
      .select("*")
      .order("created_at", { ascending: true })

    if (!error && data) setReplies(data)
  }

  const submitComment = async () => {

    if (!comment.trim()) return

    const { error } = await supabase
      .from("lesson_comments")
      .insert([
        {
          lesson_id: lessonId,
          user_name: "Student",
          comment: comment
        }
      ])

    if (!error) {
      setComment("")
      fetchComments()
    }

  }

  const submitReply = async (commentId: number) => {

    const text = replyText[commentId]

    if (!text?.trim()) return

    const { error } = await supabase
      .from("comment_replies")
      .insert([
        {
          comment_id: commentId,
          reply: text
        }
      ])

    if (!error) {
      setReplyText(prev => ({ ...prev, [commentId]: "" }))
      fetchReplies()
    }

  }

  return (

<div className="mt-8">

<h3 className="text-lg font-semibold text-foreground">
Izohlar ({comments.length})
</h3>

{/* Comment yozish */}

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

<Button
size="sm"
className="rounded-lg"
disabled={!comment.trim()}
onClick={submitComment}
>
Izoh qoldirish
</Button>

</div>

</div>

</div>

{/* Comment list */}

<div className="mt-6 flex flex-col gap-5">

{comments.map((c) => (

<div key={c.id} className="flex gap-3">

<Avatar className="h-9 w-9 shrink-0">
<AvatarFallback className="bg-secondary text-xs font-semibold text-foreground">
{c.user_name?.charAt(0) || "U"}
</AvatarFallback>
</Avatar>

<div className="w-full">

<div className="flex items-baseline gap-2">

<p className="text-sm font-semibold text-foreground">
{c.user_name}
</p>

<span className="text-xs text-muted-foreground">
{new Date(c.created_at).toLocaleString()}
</span>

</div>

<p className="mt-1 text-sm leading-relaxed text-muted-foreground">
{c.comment}
</p>

{/* replies */}

{replies
.filter((r) => r.comment_id === c.id)
.map((r) => (

<div
key={r.id}
className="ml-6 mt-2 text-sm bg-blue-50 text-blue-700 p-2 rounded-lg"
>
👨‍🏫 Ustoz: {r.reply}
</div>

))}

{/* reply input */}

<div className="mt-2 flex gap-2">

<input
className="border rounded p-2 text-sm w-full"
placeholder="Javob yozing..."
value={replyText[c.id] || ""}
onChange={(e) =>
setReplyText({
...replyText,
[c.id]: e.target.value
})
}
/>

<button
onClick={() => submitReply(c.id)}
className="bg-blue-500 text-white px-3 py-1 rounded"
>
Javob
</button>

</div>

</div>

</div>

))}

</div>

</div>

  )
}