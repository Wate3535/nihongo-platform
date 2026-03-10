"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Mic, MicOff, Bot, Volume2 } from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Salom! Men sizning sun’iy intellekt asosidagi yapon tilida gapirish ustozingizman. Keling, birga suhbatni mashq qilaylik.",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [loading, setLoading] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  async function handleSend() {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
        }),
      })

      const data = await res.json()

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.reply,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("AI error:", error)
    }

    setLoading(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-4xl flex-col">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">
            Sun’iy intellektli gapirish murabbiyi
          </h1>
          <p className="text-xs text-muted-foreground">
            Yapon tilida gaplashish mashqi
          </p>
        </div>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden border border-border bg-card">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="flex flex-col gap-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback
                    className={
                      msg.role === "assistant"
                        ? "bg-primary text-xs text-primary-foreground"
                        : "bg-accent text-xs text-accent-foreground"
                    }
                  >
                    {msg.role === "assistant" ? "AI" : "JD"}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-sm text-muted-foreground">
                AI yozmoqda...
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="icon"
              className="shrink-0 rounded-full"
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>

            <Input
              placeholder="Type in English or Japanese..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="rounded-full"
            />

            <Button
              size="icon"
              className="shrink-0 rounded-full"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {isRecording && (
            <p className="mt-2 text-center text-xs text-destructive">
              Yozib olinmoqda… Hozir gapiring.
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}