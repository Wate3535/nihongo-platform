'use client';

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface LessonInfoProps {
  title: string
  lessonNumber: number
  totalLessons: number
  onPrevious?: () => void
  onNext?: () => void
  category: string
}

// 🔥 DESCRIPTION FUNCTION
const getDescription = (category: string) => {
  const descriptions: Record<string, string> = {
    alphabet: "Ushbu darsda siz hiragana va katakana belgilarining yozilishi va talaffuzini o‘rganasiz.",
    kanji: "Ushbu darsda siz kanji belgilarining ma’nosi, o‘qilishi va yozilish tartibini o‘rganasiz.",
    grammar: "Ushbu darsda siz yapon tili grammatikasi va gap tuzish qoidalarini o‘rganasiz.",
    vocabulary: "Ushbu darsda siz yangi so‘zlar va ularning qo‘llanilishini o‘rganasiz.",
    listening: "Ushbu darsda siz tinglab tushunish ko‘nikmalaringizni rivojlantirasiz.",
    reading: "Ushbu darsda siz matnlarni o‘qish va tushunishni mashq qilasiz.",
  }

  return descriptions[category] || "Ushbu dars orqali siz bilimlaringizni yanada oshirasiz."
}

export function LessonInfo({
  title,
  lessonNumber,
  totalLessons,
  onPrevious,
  onNext,
  category
}: LessonInfoProps) {
  return (
    <div className="mt-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            {lessonNumber}-dars / {totalLessons}
          </p>

          <h2 className="mt-1 text-xl font-bold text-foreground">
            {title}
          </h2>

          <p className="mt-2 leading-relaxed text-muted-foreground">
            {getDescription(category)}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg bg-transparent"
            disabled={!onPrevious}
            onClick={onPrevious}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Oldingi
          </Button>

          <Button
            size="sm"
            className="rounded-lg"
            disabled={!onNext}
            onClick={onNext}
          >
            Keyingi
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

      </div>
    </div>
  )
}