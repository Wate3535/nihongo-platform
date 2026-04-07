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

type ReviewCardProps = {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:scale-105 hover:border-blue-500/40 transition duration-300 shadow-lg">

      <div className="flex items-center gap-4">
        <img
          src={review.user_avatar || "/avatar.png"}
          className="w-12 h-12 rounded-full border border-white/20"
        />

        <div>
          <p className="font-semibold text-white">
            {review.user_name}
          </p>

          <p className="text-xs text-white/50">
            {review.level}
          </p>

          {review.is_verified && (
            <span className="text-xs text-green-400">
              ✔ Verified
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 text-yellow-400 text-lg">
        {"⭐".repeat(review.rating)}
      </div>

      <p className="mt-4 text-white/80 leading-relaxed">
        {review.comment}
      </p>

      <p className="mt-3 text-xs text-white/40">
        {review.lessons_completed} ta lesson
      </p>
    </div>
  )
}