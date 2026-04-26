"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

type Coin = {
  id: number
  startX: number
  startY: number
  delay: number
}

export default function CoinReward() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [showText, setShowText] = useState(false)
  const [showSticker, setShowSticker] = useState(false)
  const [amount, setAmount] = useState(0)
  const [flyNow, setFlyNow] = useState(false)

  useEffect(() => {
  const runAnimation = (e: any) => {
    // reset old animation
    setCoins([])
    setShowText(false)
    setShowSticker(false)
    setFlyNow(false)

    const coinAmount = e.detail?.amount || 3

    setAmount(coinAmount)
    setShowText(true)

    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

      // MARKAZDA YARIM OY SHAKLI
      const radius = 130
      const startAngle = -160
      const endAngle = -20

      const newCoins = Array.from(
        { length: coinAmount },
        (_, i) => {
          const angle =
            startAngle +
            (i * (endAngle - startAngle)) /
              Math.max(coinAmount - 1, 1)

          const rad = (angle * Math.PI) / 180

          return {
            id: Date.now() + i,
            startX:
              centerX + Math.cos(rad) * radius,
            startY:
              centerY + Math.sin(rad) * radius,
            delay: i * 0.12,
          }
        }
      )

      setCoins(newCoins)

      // SOUND
      const audio = new Audio("/tanga.mp3")
      audio.volume = 0.8
      audio.play().catch(() => {})

      // 3 sekund markazda turadi
      setTimeout(() => {
        setFlyNow(true)
      }, 3000)

      // text yo‘qoladi
      setTimeout(() => {
        setShowText(false)
      }, 3400)

      // qo‘l sticker chiqadi
      setTimeout(() => {
        setShowSticker(true)
      }, 4300)

      // sticker yopiladi
      setTimeout(() => {
        setShowSticker(false)
      }, 6800)

      // coins clear
      setTimeout(() => {
        setCoins([])
      }, 5200)
    }

    window.addEventListener(
      "showCoinReward",
      runAnimation
    )

    return () => {
      window.removeEventListener(
        "showCoinReward",
        runAnimation
      )
    }
  }, [])

  const target =
    typeof window !== "undefined"
      ? document
          .getElementById("coin-target")
          ?.getBoundingClientRect()
      : null

  return (
    <>
      {/* REWARD TEXT */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{
              scale: 0.4,
              opacity: 0,
              y: 40,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
              scale: 0.8,
            }}
            transition={{
              duration: 0.45,
            }}
            className="
              fixed left-1/2 top-1/2 z-[9999]
              -translate-x-1/2 -translate-y-[180px]
              rounded-3xl
              bg-gradient-to-r from-yellow-400 to-yellow-500
              px-8 py-4
              text-2xl font-bold text-white
              shadow-2xl
              pointer-events-none
            "
          >
            🪙 +{amount} Tangalar!
          </motion.div>
        )}
      </AnimatePresence>

      {/* COINS */}
      <AnimatePresence>
        {coins.map((coin, index) => (
          <motion.div
            key={coin.id}
            initial={{
              x: coin.startX,
              y: coin.startY,
              scale: 0,
              opacity: 0,
            }}
            animate={
              flyNow
                ? {
                    x: target
                      ? target.left + 18
                      : coin.startX,
                    y: target
                      ? target.top + 8
                      : coin.startY,
                    scale: [1, 1.15, 0.7],
                    opacity: [1, 1, 0],
                    rotate: 720,
                  }
                : {
                    scale: [0, 1.2, 1],
                    opacity: [0, 1, 1],
                    y: [
                      coin.startY,
                      coin.startY - 12,
                      coin.startY + 8,
                      coin.startY,
                    ],
                    rotate: [0, -6, 6, 0],
                  }
            }
            exit={{ opacity: 0 }}
            transition={
              flyNow
                ? {
                    duration: 1.5,
                    delay: coin.delay,
                    ease: "easeInOut",
                  }
                : {
                    duration: 1.2,
                    repeat: 2,
                    repeatType: "mirror",
                    delay: index * 0.05,
                  }
            }
            className="
              fixed z-[9998]
              w-16 h-16
              pointer-events-none
            "
          >
            <Image
              src="/coin.png"
              alt="coin"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* STICKER / QO‘L */}
      <AnimatePresence>
        {showSticker && (
          <motion.div
            initial={{
  scale: 0.2,
  opacity: 0,
  y: 40,
  rotate: -15,
}}
animate={{
  scale: 1,
  opacity: 1,
  y: -250,
  rotate: 0,
}}
exit={{
  scale: 0.7,
  opacity: 0,
  y: -320,
}}
className="
  fixed left-[34%] top-1/2 z-[9999]
  -translate-x-1/2 -translate-y-[180%]
  w-[45vw] max-w-[430px]
  h-[45vw] max-h-[430px]
  pointer-events-none
"
          >
            <Image
              src="/coin-toss.png"
              alt="reward"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}