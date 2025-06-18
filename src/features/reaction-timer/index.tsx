import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useCallback, useState } from "react"
import { MAX_RECORDS, type Status } from "./config"
import {
  getMessage,
  getRandomDelay,
  getReactionMessage,
  getReactionTime,
  getStatusStyle,
} from "./utils"

const ReactionTimerPage = () => {
  const [status, setStatus] = useState<Status>("waiting")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [reactionTimes, setReactionTimes] = useState<number[]>([])
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const startGame = useCallback(() => {
    setStatus("ready")
    setReactionTime(null)

    const delay = getRandomDelay()
    const timeout = setTimeout(() => {
      setStartTime(Date.now())
      setStatus("go")
    }, delay)

    setTimeoutId(timeout)
  }, [])

  const handleClick = () => {
    switch (status) {
      case "waiting":
        startGame()
        break
      case "ready":
        if (timeoutId) clearTimeout(timeoutId)
        setStatus("tooSoon")
        break
      case "go":
        if (startTime !== null) {
          const endTime = Date.now()
          const newTime = getReactionTime(startTime, endTime)
          setReactionTime(newTime)
          setReactionTimes((prev) => [newTime, ...prev].slice(0, MAX_RECORDS))
        }
        setStatus("waiting")
        break
      default:
        setStatus("waiting")
    }
  }

  const bestTime = reactionTimes.length ? Math.min(...reactionTimes) : null
  const averageTime = reactionTimes.length
    ? Math.round(
        reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length
      )
    : null

  return (
    <div className="min-h-screen w-full bg-neutral-800 text-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={handleClick}
        className={cn(
          "fixed top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer select-none",
          getStatusStyle(status)
        )}
      >
        <span
          className={cn(
            "text-center text-2xl uppercase font-bold tracking-wider",
            status === "ready" && "animate-pulse"
          )}
        >
          {getMessage(status)}
        </span>
      </motion.div>

      {reactionTime !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md px-4"
        >
          <div className="bg-neutral-900/80 rounded-2xl shadow-xl p-6 space-y-4 backdrop-blur-md">
            {reactionTimes.length > 0 && (
              <div className="flex gap-6">
                <div className="grow space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-green-400 font-mono">
                      {reactionTime}ms
                    </div>
                    <div className="text-sm text-neutral-400">
                      {getReactionMessage(reactionTime)}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 text-sm text-neutral-300 font-medium">
                    <div>
                      <div className="text-neutral-400">Average</div>
                      <div className="text-white font-mono text-base">
                        {averageTime}ms
                      </div>
                    </div>
                    <div>
                      <div className="text-neutral-400">Best</div>
                      <div className="text-white font-mono text-base">
                        {bestTime}ms
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grow">
                  <div className="text-neutral-400 text-sm font-medium mb-2">
                    History (latest first)
                  </div>
                  <div className="flex flex-col gap-1 font-mono text-xs text-neutral-300">
                    {reactionTimes.map((time, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-neutral-800/70 px-3 py-2 rounded-lg shadow-inner"
                      >
                        <span className="text-neutral-500 w-4">{idx + 1}.</span>
                        <span className="text-white">{time}ms</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ReactionTimerPage
