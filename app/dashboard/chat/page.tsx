"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
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
  japanese?: string
  romaji?: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm your AI Japanese speaking tutor. Let's practice conversation together. You can type in English or Japanese, and I'll help you improve.",
    japanese: "こんにちは！一緒に会話の練習をしましょう。",
    romaji: "Konnichiwa! Issho ni kaiwa no renshuu wo shimashou.",
  },
  {
    id: 2,
    role: "assistant",
    content: "Let's start with a simple self-introduction. How would you say \"My name is...\" in Japanese?",
    japanese: "自己紹介から始めましょう。「私の名前は...」は日本語でどう言いますか？",
    romaji: "Jiko shoukai kara hajimemashou.",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  function handleSend() {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
    }

    const aiResponse: Message = {
      id: messages.length + 2,
      role: "assistant",
      content: "Great attempt! Here's a natural way to say that:",
      japanese: "私の名前はジョンです。（わたしのなまえはジョンです。）",
      romaji: "Watashi no namae wa Jon desu.",
    }

    setMessages((prev) => [...prev, userMessage, aiResponse])
    setInput("")
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
          <h1 className="text-lg font-bold text-foreground">AI Speaking Tutor</h1>
          <p className="text-xs text-muted-foreground">Practice conversation in Japanese</p>
        </div>
      </div>

      {/* Chat area */}
      <Card className="flex flex-1 flex-col overflow-hidden border border-border bg-card">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="flex flex-col gap-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
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
                  {msg.japanese && (
                    <div className="mt-2 border-t border-border/30 pt-2">
                      <p className="text-sm font-medium">{msg.japanese}</p>
                      {msg.romaji && (
                        <p className="mt-0.5 text-xs opacity-70">{msg.romaji}</p>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="mt-1 h-7 w-7"
                        aria-label="Play audio"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="icon"
              className="shrink-0 rounded-full"
              onClick={() => setIsRecording(!isRecording)}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
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
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {isRecording && (
            <p className="mt-2 text-center text-xs text-destructive">
              Recording... Speak now. Click the microphone to stop.
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}
