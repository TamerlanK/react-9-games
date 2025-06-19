import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

const GAME_DURATION = 15 // seconds
const DOT_SIZE = 50 // px

const getRandomPosition = (maxWidth: number, maxHeight: number) => {
  const x = Math.random() * (maxWidth - DOT_SIZE)
  const y = Math.random() * (maxHeight - DOT_SIZE)
  return { x, y }
}

const CatchTheDotGamePage = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 })
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Place dot at random position inside container
  const moveDotRandomly = useCallback(() => {
    if (!containerRef.current) return
    const { clientWidth, clientHeight } = containerRef.current
    setDotPosition(getRandomPosition(clientWidth, clientHeight))
  }, [])

  // Handle dot click
  const handleDotClick = () => {
    if (!isRunning) return
    setScore((prev) => prev + 1)
    moveDotRandomly()
  }

  // Start game
  const startGame = () => {
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setIsRunning(true)
    moveDotRandomly()
  }

  // End game
  const endGame = () => {
    setIsRunning(false)
    if (score > bestScore) setBestScore(score)
  }

  // Timer countdown effect
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    } else if (timeLeft === 0 && isRunning) {
      endGame()
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isRunning, timeLeft])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-4">
      <div className="max-w-md w-full bg-neutral-800/60 rounded-xl p-6 shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">🎯 Catch The Dot</h1>

        <div
          ref={containerRef}
          className="relative w-full h-64 bg-neutral-700 rounded-lg overflow-hidden select-none"
        >
          {isRunning && (
            <motion.div
              key={`${dotPosition.x}-${dotPosition.y}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              onClick={handleDotClick}
              className={cn(
                "absolute bg-emerald-400 rounded-full cursor-pointer shadow-lg",
                "w-[50px] h-[50px]"
              )}
              style={{ top: dotPosition.y, left: dotPosition.x }}
              aria-label="Catch the dot"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleDotClick()
              }}
            />
          )}
        </div>

        <div className="mt-6 w-full flex justify-between text-lg font-semibold">
          <span>Score: {score}</span>
          <span>Time Left: {timeLeft}s</span>
          <span>Best: {bestScore}</span>
        </div>

        <div className="mt-6 w-full flex gap-4">
          <button
            onClick={startGame}
            disabled={isRunning}
            className={cn(
              "flex-1 py-3 rounded-md font-semibold transition-colors",
              isRunning
                ? "bg-neutral-600 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-400"
            )}
          >
            Start Game
          </button>
          <button
            onClick={() => {
              setScore(0)
              setTimeLeft(GAME_DURATION)
              setIsRunning(false)
            }}
            className="flex-1 py-3 rounded-md bg-neutral-700 hover:bg-neutral-600 transition-colors font-semibold"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default CatchTheDotGamePage
