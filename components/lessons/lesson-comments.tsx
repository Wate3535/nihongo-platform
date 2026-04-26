"use client"

import { supabase } from "@/lib/supabase"
import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type Comment = {
  id: number
  lesson_id: number
  user_id?: string
  user_name: string
  comment: string
  created_at: string
}

type Reply = {
  id: number
  comment_id: number
  user_id?: string
  user_name?: string
  reply: string
  created_at: string
}

type MenuState = {
  open: boolean
  x: number
  y: number
  commentId: number | null
}

export function LessonComments({
  lessonId,
}: {
  lessonId: number
}) {
  const [comment, setComment] =
    useState("")
  const [comments, setComments] =
    useState<Comment[]>([])
  const [replies, setReplies] =
    useState<Reply[]>([])
  const [replyText, setReplyText] =
    useState<Record<number, string>>({})

  const [user, setUser] =
    useState<any>(null)
  const [role, setRole] =
    useState("")

  const [reactions, setReactions] =
    useState<any[]>([])

  const [menu, setMenu] =
    useState<MenuState>({
      open: false,
      x: 0,
      y: 0,
      commentId: null,
    })

  const [editingId, setEditingId] =
    useState<number | null>(null)
  const [editText, setEditText] =
    useState("")

  const [replyTarget, setReplyTarget] =
    useState<number | null>(null)

  const pressTimer =
    useRef<any>(null)

  useEffect(() => {
    fetchUser()
    fetchComments()
    fetchReplies()
    fetchReactions()
  }, [lessonId])

  useEffect(() => {
    const closeMenu = () =>
      setMenu((prev) => ({
        ...prev,
        open: false,
      }))

    window.addEventListener(
      "click",
      closeMenu
    )

    return () =>
      window.removeEventListener(
        "click",
        closeMenu
      )
  }, [])

  const fetchUser = async () => {
    const {
      data: { user: authUser },
    } =
      await supabase.auth.getUser()

    if (!authUser) return

    const { data } =
      await supabase
        .from("users")
        .select(
          "id,name,role"
        )
        .eq(
          "id",
          authUser.id
        )
        .single()

    setUser(data)
    setRole(
      data?.role || ""
    )
  }

  const fetchComments =
    async () => {
      const { data } =
        await supabase
          .from(
            "lesson_comments"
          )
          .select("*")
          .eq(
            "lesson_id",
            lessonId
          )
          .order(
            "created_at",
            {
              ascending:
                false,
            }
          )

      setComments(data || [])
    }

  const fetchReplies =
    async () => {
      const { data } =
        await supabase
          .from(
            "comment_replies"
          )
          .select("*")
          .order(
            "created_at",
            {
              ascending:
                true,
            }
          )

      setReplies(data || [])
    }

  const fetchReactions =
    async () => {
      const { data } =
        await supabase
          .from(
            "comment_reactions"
          )
          .select("*")

      setReactions(
        data || []
      )
    }

  const submitComment =
    async () => {
      if (
        !comment.trim() ||
        role === "admin"
      )
        return

      await supabase
        .from(
          "lesson_comments"
        )
        .insert([
          {
            lesson_id:
              lessonId,
            user_id:
              user?.id,
            user_name:
              "O‘quvchi",
            comment,
          },
        ])

      setComment("")
      fetchComments()
    }

  const submitReply =
    async (
      commentId: number
    ) => {
      const text =
        replyText[
          commentId
        ]

      if (!text?.trim())
        return

      await supabase
        .from(
          "comment_replies"
        )
        .insert([
          {
            comment_id:
              commentId,
            user_id:
              user?.id,
            user_name:
              role ===
              "admin"
                ? "Ustoz"
                : "O‘quvchi",
            reply: text,
          },
        ])

      setReplyText(
        (prev) => ({
          ...prev,
          [commentId]:
            "",
        })
      )

      setReplyTarget(null)
      fetchReplies()
    }

  const toggleReaction =
    async (
      commentId: number,
      emoji: string
    ) => {
      const existing =
        reactions.find(
          (r) =>
            r.comment_id ===
              commentId &&
            r.user_id ===
              user?.id &&
            r.emoji ===
              emoji
        )

      if (existing) {
        await supabase
          .from(
            "comment_reactions"
          )
          .delete()
          .eq(
            "id",
            existing.id
          )
      } else {
        await supabase
          .from(
            "comment_reactions"
          )
          .insert([
            {
              comment_id:
                commentId,
              user_id:
                user?.id,
              emoji,
            },
          ])
      }

      fetchReactions()
    }

  const deleteComment =
    async (
      id: number
    ) => {
      await supabase
        .from(
          "lesson_comments"
        )
        .delete()
        .eq("id", id)
        .eq(
          "user_id",
          user?.id
        )

      fetchComments()
    }

  const saveEdit =
    async () => {
      if (
        !editingId ||
        !editText.trim()
      )
        return

      await supabase
        .from(
          "lesson_comments"
        )
        .update({
          comment:
            editText,
        })
        .eq(
          "id",
          editingId
        )
        .eq(
          "user_id",
          user?.id
        )

      setEditingId(null)
      setEditText("")
      fetchComments()
    }

  const openMenu = (
    e: any,
    id: number
  ) => {
    e.preventDefault()

    setMenu({
      open: true,
      x: e.clientX,
      y: e.clientY,
      commentId: id,
    })
  }

  const startLongPress = (
    e: any,
    id: number
  ) => {
    pressTimer.current =
      setTimeout(() => {
        const t =
          e.touches?.[0]

        setMenu({
          open: true,
          x:
            t?.clientX ||
            100,
          y:
            t?.clientY ||
            100,
          commentId: id,
        })
      }, 500)
  }

  const stopLongPress =
    () => {
      clearTimeout(
        pressTimer.current
      )
    }

  const selected =
    comments.find(
      (c) =>
        c.id ===
        menu.commentId
    )

  const isOwner =
    selected?.user_id ===
    user?.id

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-foreground">
        Izohlar (
        {
          comments.length
        }
        )
      </h3>

      {/* only student can comment */}
      {role !== "admin" && (
        <div className="mt-4 flex gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              O
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Textarea
              placeholder="Izoh yozing..."
              value={
                comment
              }
              onChange={(
                e
              ) =>
                setComment(
                  e.target
                    .value
                )
              }
              className="rounded-xl"
            />

            <div className="mt-2 flex justify-end">
              <Button
                onClick={
                  submitComment
                }
              >
                Izoh qoldirish
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* comments */}
      <div className="mt-6 space-y-5">
        {comments.map(
          (c) => {
            const visibleReactions =
              [
                "👍",
                "❤️",
                "🔥",
              ].filter(
                (emo) =>
                  reactions.some(
                    (
                      r
                    ) =>
                      r.comment_id ===
                        c.id &&
                      r.emoji ===
                        emo
                  )
              )

            return (
              <div
                key={c.id}
                onContextMenu={(
                  e
                ) =>
                  openMenu(
                    e,
                    c.id
                  )
                }
                onTouchStart={(
                  e
                ) =>
                  startLongPress(
                    e,
                    c.id
                  )
                }
                onTouchEnd={
                  stopLongPress
                }
                className="rounded-2xl border p-4 shadow-sm"
              >
                <div className="flex gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {c.user_name?.[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">
                        {
                          c.user_name
                        }
                      </p>

                      <span className="text-xs text-muted-foreground">
                        {new Date(
                          c.created_at
                        ).toLocaleString()}
                      </span>
                    </div>

                    {editingId ===
                    c.id ? (
                      <div className="mt-2 flex gap-2">
                        <input
                          value={
                            editText
                          }
                          onChange={(
                            e
                          ) =>
                            setEditText(
                              e
                                .target
                                .value
                            )
                          }
                          className="w-full rounded-lg border px-3 py-2"
                        />

                        <button
                          onClick={
                            saveEdit
                          }
                          className="rounded-lg bg-green-500 px-4 text-white"
                        >
                          Saqlash
                        </button>
                      </div>
                    ) : (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {
                          c.comment
                        }
                      </p>
                    )}

                    {/* reactions */}
                    {visibleReactions.length >
                      0 && (
                      <div className="mt-2 flex gap-2">
                        {visibleReactions.map(
                          (
                            emo
                          ) => {
                            const count =
                              reactions.filter(
                                (
                                  r
                                ) =>
                                  r.comment_id ===
                                    c.id &&
                                  r.emoji ===
                                    emo
                              )
                                .length

                            return (
                              <button
                                key={
                                  emo
                                }
                                onClick={() =>
                                  toggleReaction(
                                    c.id,
                                    emo
                                  )
                                }
                                className="rounded-full border px-3 py-1 text-sm"
                              >
                                {
                                  emo
                                }{" "}
                                {
                                  count
                                }
                              </button>
                            )
                          }
                        )}
                      </div>
                    )}

                    {/* replies */}
                    {replies
                      .filter(
                        (
                          r
                        ) =>
                          r.comment_id ===
                          c.id
                      )
                      .map(
                        (
                          r
                        ) => (
                          <div
                            key={
                              r.id
                            }
                            className="ml-6 mt-2 rounded-xl bg-blue-50 px-3 py-2 text-sm"
                          >
                            💬{" "}
                            {r.user_name}
                            :{" "}
                            {
                              r.reply
                            }
                          </div>
                        )
                      )}

                    {/* reply input */}
                    {replyTarget ===
                      c.id && (
                      <div className="mt-3 flex gap-2">
                        <input
                          className="w-full rounded-lg border px-3 py-2 text-sm"
                          placeholder="Javob yozing..."
                          value={
                            replyText[
                              c.id
                            ] ||
                            ""
                          }
                          onChange={(
                            e
                          ) =>
                            setReplyText(
                              {
                                ...replyText,
                                [c.id]:
                                  e
                                    .target
                                    .value,
                              }
                            )
                          }
                        />

                        <button
                          onClick={() =>
                            submitReply(
                              c.id
                            )
                          }
                          className="rounded-lg bg-blue-500 px-4 py-2 text-white"
                        >
                          Yuborish
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          }
        )}
      </div>

      {/* menu */}
      {menu.open &&
        selected && (
          <div
            className="fixed z-50 w-52 rounded-2xl border bg-white p-2 shadow-2xl"
            style={{
              top: menu.y,
              left: menu.x,
            }}
          >
            <button
              onClick={() => {
                setReplyTarget(
                  selected.id
                )
                setMenu(
                  (
                    prev
                  ) => ({
                    ...prev,
                    open:
                      false,
                  })
                )
              }}
              className="w-full rounded-lg px-3 py-2 text-left hover:bg-muted"
            >
              💬 Reply
            </button>

            {isOwner && (
              <>
                <button
                  onClick={() => {
                    setEditingId(
                      selected.id
                    )
                    setEditText(
                      selected.comment
                    )
                    setMenu(
                      (
                        prev
                      ) => ({
                        ...prev,
                        open:
                          false,
                      })
                    )
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left hover:bg-muted"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => {
                    deleteComment(
                      selected.id
                    )
                    setMenu(
                      (
                        prev
                      ) => ({
                        ...prev,
                        open:
                          false,
                      })
                    )
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left text-red-500 hover:bg-muted"
                >
                  🗑 Delete
                </button>
              </>
            )}

            <div className="mt-2 flex gap-2 border-t pt-2">
              {[
                "👍",
                "❤️",
                "🔥",
              ].map(
                (
                  emo
                ) => (
                  <button
                    key={
                      emo
                    }
                    onClick={() => {
                      toggleReaction(
                        selected.id,
                        emo
                      )
                      setMenu(
                        (
                          prev
                        ) => ({
                          ...prev,
                          open:
                            false,
                        })
                      )
                    }}
                    className="rounded-lg px-2 py-1 hover:bg-muted"
                  >
                    {emo}
                  </button>
                )
              )}
            </div>
          </div>
        )}
    </div>
  )
}