"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { ReviewCard } from "../../components/reviews/review-card"
import { ReviewFormModal } from "../../components/reviews/review-form-modal"
import { ArrowLeft } from "lucide-react"

type Review = {
  id: string
  user_name: string
  user_avatar: string
  level: string
  rating: number
  comment: string
  lessons_completed: number
  is_verified: boolean
  created_at: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching reviews:", error)
      return
    }

    setReviews(data || [])
  }

  const average =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0"

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      
      
      <div className="absolute inset-0 -z-20">
        <img
          src="/japan3.jpg"
          alt="Japan background"
          className="w-full h-full object-cover opacity-50 blur-[2px]"
        />
      </div>

      
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-[#020617]/70 to-black/80 -z-10" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/20 blur-[120px] -z-10" />

      <div className="relative p-10">

       
        <div className="max-w-7xl mx-auto mb-16">

         
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition"
          >
            <ArrowLeft size={18} />
            Orqaga
          </button>

          
          <div className="text-center">
            <h1
              className="
                text-5xl md:text-6xl font-extrabold mb-4 tracking-tight
                bg-gradient-to-r from-white via-gray-200 to-white
                bg-clip-text text-transparent
                animate-fade-in-up
                hover:scale-105 transition duration-300
              "
            >
              O‘quvchilar fikrlari
            </h1>

            <p
              className="
                text-lg md:text-xl text-gray-300
                mb-6 transition-all duration-300
                hover:text-white hover:scale-105
                animate-fade-in-up delay-200
              "
            >
              NihonGoo bilan o‘rganganlar tajribasi
            </p>

            
            <div className="text-yellow-400 text-3xl font-bold">
              ⭐ {average} / 5
            </div>

            <p className="text-white">
              {reviews.length} ta fikr
            </p>

          </div>

        </div>

        
        {reviews.length === 0 && (
          <div className="text-center text-white/50 mt-20">
            Hali fikrlar yo‘q 😢 <br />
            Birinchi bo‘lib yozing!
          </div>
        )}

       
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <div key={review.id} className={index % 2 === 0 ? "mt-10" : ""}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

      </div>

   
      {open && (
        <ReviewFormModal
          onClose={() => {
            setOpen(false)
            fetchReviews()
          }}
        />
      )}
    </div>
  )
}