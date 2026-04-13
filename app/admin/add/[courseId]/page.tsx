export const dynamic = "force-dynamic"

"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Trash2, PlusCircle } from "lucide-react"

type Lesson = {
  id: string
  title: string
  video_url: string | null
  image_url?: string | null
  type?: string
}

export default function AddLessonPage() {
  const { courseId } = useParams()

  const [title, setTitle] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [type, setType] = useState("video")

  // 🔥 DOKKAI STATES
  const [question, setQuestion] = useState("")
  const [optionA, setOptionA] = useState("")
  const [optionB, setOptionB] = useState("")
  const [optionC, setOptionC] = useState("")
  const [optionD, setOptionD] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [timeLimit, setTimeLimit] = useState(300)

  const [lessons, setLessons] = useState<Lesson[]>([])

  const fetchLessons = async () => {
    const { data } = await supabase
      .from("lessons")
      .select("*")
      .eq("course_id", courseId)
      .order("id", { ascending: false })

    setLessons(data || [])
  }

  useEffect(() => {
    fetchLessons()
  }, [])

  const addLesson = async () => {
    if (!title) return alert("Title kiriting")

    if (type === "video" && !videoUrl)
      return alert("Video URL kiriting")

    if (type === "dokkai") {
      if (!imageUrl || !question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
        return alert("Dokkai uchun hamma maydonni to‘ldiring")
      }
    }

    const { error } = await supabase.from("lessons").insert({
      title,
      type,
      course_id: courseId,

      video_url: type === "video" ? videoUrl : null,

      image_url: type === "dokkai" ? imageUrl : null,
      question,
      option_a: optionA,
      option_b: optionB,
      option_c: optionC,
      option_d: optionD,
      correct_answer: correctAnswer,
      time_limit: timeLimit,
    })

    if (error) {
      alert(error.message)
      return
    }

    // reset
    setTitle("")
    setVideoUrl("")
    setImageUrl("")
    setQuestion("")
    setOptionA("")
    setOptionB("")
    setOptionC("")
    setOptionD("")
    setCorrectAnswer("")
    setType("video")

    fetchLessons()
  }

  const deleteLesson = async (id: string) => {
    await supabase.from("lessons").delete().eq("id", id)
    fetchLessons()
  }

  return (
    <div className="p-6 space-y-10 min-h-screen bg-background text-foreground">

      <h1 className="text-3xl font-bold">Dars qo‘shish</h1>

      <div className="bg-card border border-border p-6 rounded-2xl space-y-4">

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="video">Video</option>
          <option value="dokkai">Dokkai</option>
        </select>

        {type === "video" && (
          <input
            placeholder="Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        )}

        {/* 🔥 DOKKAI FORM */}
        {type === "dokkai" && (
          <>
            <input placeholder="Rasm URL" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} className="w-full p-3 border rounded-lg"/>

            <input placeholder="Savol" value={question} onChange={(e)=>setQuestion(e.target.value)} className="w-full p-3 border rounded-lg"/>

            <input placeholder="A" value={optionA} onChange={(e)=>setOptionA(e.target.value)} className="w-full p-3 border rounded-lg"/>
            <input placeholder="B" value={optionB} onChange={(e)=>setOptionB(e.target.value)} className="w-full p-3 border rounded-lg"/>
            <input placeholder="C" value={optionC} onChange={(e)=>setOptionC(e.target.value)} className="w-full p-3 border rounded-lg"/>
            <input placeholder="D" value={optionD} onChange={(e)=>setOptionD(e.target.value)} className="w-full p-3 border rounded-lg"/>

            <input placeholder="Correct (A/B/C/D)" value={correctAnswer} onChange={(e)=>setCorrectAnswer(e.target.value)} className="w-full p-3 border rounded-lg"/>

            <input type="number" placeholder="Time (sekund)" value={timeLimit} onChange={(e)=>setTimeLimit(Number(e.target.value))} className="w-full p-3 border rounded-lg"/>
          </>
        )}

        <button onClick={addLesson} className="bg-primary text-white px-6 py-3 rounded-xl">
          Qo‘shish
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">
        {lessons.map((l) => (
          <div key={l.id} className="flex justify-between border p-3 rounded-lg">
            <p>{l.title}</p>
            <button onClick={() => deleteLesson(l.id)}>❌</button>
          </div>
        ))}
      </div>

      <Link href="/admin/add">← Orqaga</Link>
    </div>
  )
}