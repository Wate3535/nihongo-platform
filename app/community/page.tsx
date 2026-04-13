"use client"

import { Chat } from "../../components/community/chat"
export default function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col px-4 pt-4">
      <h1 className="text-3xl font-bold mb-6">Hamjamiyat 💬</h1>
      <Chat />
    </div>
  )
}