export type Lesson = {
  id: number
  title: string
  duration: string

  videoUrl?: string
  imageUrl?: string

  type?: string

  question?: string
  option_a?: string
  option_b?: string
  option_c?: string
  option_d?: string
  correct_answer?: string
  time_limit?: number

  completed: boolean
}