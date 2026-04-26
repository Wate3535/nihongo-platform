"use client"

import { useState } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function LessonAIChat() {
  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "assistant",
        content:
          "Salom 👋 Men AI Ustozman. Savolingizni yozing yoki rasm yuboring.",
      },
    ])

  const [input, setInput] =
    useState("")
  const [loading, setLoading] =
    useState(false)

  const [image, setImage] =
    useState<File | null>(null)

  const sendMessage =
    async () => {
      if (
        !input.trim() &&
        !image
      )
        return

      const previewText =
        image
          ? input
            ? `📷 ${input}`
            : "📷 Rasm yuborildi"
          : input

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content:
            previewText,
        },
      ])

      const textToSend =
        input

      setInput("")
      setImage(null)
      setLoading(true)

      let imageBase64 =
        null

      if (image) {
        imageBase64 =
          await new Promise(
            (
              resolve
            ) => {
              const reader =
                new FileReader()

              reader.onloadend =
                () =>
                  resolve(
                    reader.result
                  )

              reader.readAsDataURL(
                image
              )
            }
          )
      }

      try {
        const res =
          await fetch(
            "/api/chat",
            {
              method:
                "POST",
              headers:
                {
                  "Content-Type":
                    "application/json",
                },
              body: JSON.stringify(
                {
                  message:
                    textToSend,
                  image:
                    imageBase64,
                }
              ),
            }
          )

        const data =
          await res.json()

        setMessages(
          (
            prev
          ) => [
            ...prev,
            {
              role: "assistant",
              content:
                data.reply ||
                "Javob topilmadi",
            },
          ]
        )
      } catch {
        setMessages(
          (
            prev
          ) => [
            ...prev,
            {
              role: "assistant",
              content:
                "Xatolik yuz berdi.",
            },
          ]
        )
      }

      setLoading(false)
    }

  return (
    <div className="mt-8 rounded-2xl border p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-bold">
        🤖 AI Ustoz
      </h3>

      <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
        {messages.map(
          (
            msg,
            i
          ) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                msg.role ===
                "user"
                  ? "ml-auto bg-primary text-white"
                  : "bg-muted"
              }`}
            >
              {
                msg.content
              }
            </div>
          )
        )}

        {loading && (
          <div className="text-sm text-muted-foreground">
            Ustoz yozmoqda...
          </div>
        )}
      </div>

      {image && (
        <div className="mt-3 rounded-xl border px-3 py-2 text-sm">
          📷 {image.name}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <label
          htmlFor="lesson-image"
          className="cursor-pointer rounded-xl border px-3 py-2"
        >
          📷
        </label>

        <input
          id="lesson-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(
            e
          ) =>
            setImage(
              e
                .target
                .files?.[0] ||
                null
            )
          }
        />

        <input
          value={input}
          onChange={(
            e
          ) =>
            setInput(
              e.target
                .value
            )
          }
          placeholder="Savolingizni yozing..."
          className="w-full rounded-xl border px-3 py-2"
          onKeyDown={(
            e
          ) => {
            if (
              e.key ===
                "Enter" &&
              !loading
            ) {
              sendMessage()
            }
          }}
        />

        <button
          onClick={
            sendMessage
          }
          disabled={
            loading
          }
          className="rounded-xl bg-primary px-4 text-white disabled:opacity-50"
        >
          Yuborish
        </button>
      </div>
    </div>
  )
}