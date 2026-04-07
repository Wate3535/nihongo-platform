"use client"

import { useState } from "react"
import { X, Play } from "lucide-react"

export function DemoVideoModal() {
  const [open, setOpen] = useState(false)
  const [play, setPlay] = useState(false)

  return (
    <>
    
      <button
        onClick={() => setOpen(true)}
       className="
  relative overflow-hidden
  px-8 py-3 rounded-full
  bg-white/10 backdrop-blur-md
  border border-white/30
  text-white text-lg font-bold
  transition-all duration-300

  hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500
  hover:border-transparent
  hover:scale-105
"
      >
        <span className="relative z-10 flex items-center gap-2">
          ▶ Demo darsni ko‘rish
        </span>

       
        <span
          className="
            absolute inset-0
            bg-gradient-to-r from-transparent via-white/20 to-transparent
            opacity-0 hover:opacity-100
            transition duration-300
          "
        />

       
        <span
          className="
            absolute inset-0
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
            opacity-0 hover:opacity-20
            transition duration-300
          "
        />
      </button>

      
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">

          <div className="relative w-[95%] max-w-4xl rounded-2xl overflow-hidden shadow-2xl">

           
            <button
              onClick={() => {
                setOpen(false)
                setPlay(false)
              }}
              className="absolute top-4 right-4 z-20 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
            >
              <X />
            </button>

           
            <div className="relative aspect-video bg-black">

              {!play ? (
                <>
                  
                  <img
                    src="https://img.youtube.com/vi/OlMYdT9VZH8/maxresdefault.jpg"
                    alt="demo"
                    className="w-full h-full object-cover"
                  />

                  <button
                    onClick={() => setPlay(true)}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-white/90 p-6 rounded-full shadow-lg hover:scale-110 transition">
                      <Play className="w-8 h-8 text-black" />
                    </div>
                  </button>
                </>
              ) : (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/OlMYdT9VZH8?autoplay=1"
                  title="Demo video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
            </div>

          </div>
        </div>
      )}
    </>
  )
}