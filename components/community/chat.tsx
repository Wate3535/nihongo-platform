"use client"

import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase"

type Profile = {
  full_name: string
  avatar_url?: string
}

type Message = {
  id: string
  text: string
  user_id: string
  created_at: string
  reply_to?: string
  profiles?: Profile
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState("")
  const [userId, setUserId] = useState<string | null>(null)
  const [replyTo, setReplyTo] = useState<Message | null>(null)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [showScrollBtn, setShowScrollBtn] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  // 🔥 USER
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id || null)
    })
  }, [])

  // 🔥 FETCH (PROFILES BILAN)
  async function fetchMessages() {
    const { data } = await supabase
      .from("messages")
      .select(`
        *,
        profiles(full_name, avatar_url)
      `)
      .order("created_at", { ascending: true })

    if (data) {
      const mapped = data.map((m: any) => ({
        ...m,
        profiles: m.profiles?.[0],
      }))
      setMessages(mapped)
    }
  }

  // 🔥 REALTIME (OPTIMIZED)
  useEffect(() => {
    fetchMessages()

    const channel = supabase
      .channel("chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // 🔥 SEND
  async function sendMessage() {
    if (!text.trim()) return

    const { data } = await supabase.auth.getUser()
    if (!data.user) return

    await supabase.from("messages").insert({
      text,
      user_id: data.user.id,
      reply_to: replyTo?.id || null,
    })

    setText("")
    setReplyTo(null)
  }

  // 🔥 SCROLL BUTTON
  function handleScroll(e: any) {
    const top = e.target.scrollTop
    setShowScrollBtn(top < 200)
  }

  function scrollToBottom() {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center">

      <div className="w-full max-w-7xl flex h-[80vh] rounded-xl overflow-hidden shadow-lg">

        {/* SIDEBAR */}
        <div className="w-72 bg-white border-r p-4 hidden md:block">
          <input
            placeholder="Search..."
            className="w-full mb-4 px-3 py-2 rounded-lg bg-gray-100"
          />

          <div className="p-3 rounded-xl bg-indigo-100">
            <p className="font-semibold">Platforma guruhi</p>
            <p className="text-xs text-gray-500">
              {messages[messages.length - 1]?.text || "No messages"}
            </p>
          </div>
        </div>

        {/* CHAT */}
        <div className="flex-1 flex flex-col bg-[url('/chat-bg.png')] bg-cover">

          {/* HEADER */}
          <div className="backdrop-blur-md bg-white/70 border-b px-6 py-3">
            <h2 className="font-semibold">Platforma guruhi</h2>
          </div>

          {/* MESSAGES */}
          <div
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-6 space-y-2"
          >
            {messages.map((msg, i) => {
              const isMe = msg.user_id === userId
              const prev = messages[i - 1]
              const showAvatar = prev?.user_id !== msg.user_id

              const replyMsg = messages.find(m => m.id === msg.reply_to)

              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[70%] flex gap-2">

                    {/* AVATAR */}
                    {!isMe && showAvatar && (
                      <img
                        src={msg.profiles?.avatar_url || "/avatar.png"}
                        className="w-8 h-8 rounded-full"
                      />
                    )}

                    <div
                      onClick={() => setReplyTo(msg)}
                      className={`
                        px-4 py-2 rounded-2xl text-sm shadow cursor-pointer
                        ${
                          isMe
                            ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white"
                            : "bg-white"
                        }
                      `}
                    >
                      {!isMe && showAvatar && (
                        <div className="text-xs font-semibold mb-1">
                          {msg.profiles?.full_name || "User"}
                        </div>
                      )}

                      {replyMsg && (
                        <div className="text-xs bg-black/10 p-1 rounded mb-1">
                          ↪ {replyMsg.text}
                        </div>
                      )}

                      {msg.text}

                      <div className="text-[10px] text-right opacity-60 mt-1">
                        {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            <div ref={scrollRef} />
          </div>

          {/* SCROLL BUTTON */}
          {showScrollBtn && (
            <button
              onClick={scrollToBottom}
              className="absolute bottom-24 right-6 bg-blue-500 text-white px-3 py-2 rounded-full shadow"
            >
              ↓
            </button>
          )}

          {/* INPUT */}
          <div className="backdrop-blur-md bg-white/70 border-t p-4">

            {replyTo && (
              <div className="mb-2 bg-gray-200 p-2 rounded flex justify-between">
                <span>{replyTo.text}</span>
                <button onClick={() => setReplyTo(null)}>✖</button>
              </div>
            )}

            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Xabar yozing..."
                className="flex-1 px-4 py-2 rounded-full bg-gray-100"
              />
              <button
                onClick={sendMessage}
                className="px-6 bg-indigo-500 text-white rounded-full"
              >
                Send
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-72 bg-white border-l p-4 hidden lg:block">
          <h3 className="font-semibold mb-2">Group Info</h3>
          <p className="text-sm text-gray-500 mb-4">
            Platforma foydalanuvchilari uchun chat
          </p>
          <div className="space-y-2">
            <div className="p-2 bg-gray-100 rounded">👤 120 a'zo</div>
            <div className="p-2 bg-gray-100 rounded">🟢 10 online</div>
          </div>
        </div>

      </div>
    </div>
  )
}