import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useMemo, useState } from "react"
import { FaHandPaper, FaHandRock, FaHandScissors } from "react-icons/fa"
import {
  CHOICES,
  type Choice,
  type Result,
  getResult,
  getStyle,
  getText,
  shakeVariant,
} from "./utils"

const RockPaperScissorsPage = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null)
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null)
  const [result, setResult] = useState<Result>(null)
  const [score, setScore] = useState({ player: 0, computer: 0 })
  const [isShaking, setIsShaking] = useState(false)

  const playRound = useCallback(
    (choice: Choice) => {
      if (isShaking) return
      setPlayerChoice(choice)
      const compChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)]
      setComputerChoice(compChoice)
      setResult(null)
      setIsShaking(true)
    },
    [isShaking]
  )

  const resetGame = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
    setIsShaking(false)
    setScore({ player: 0, computer: 0 })
  }

  const choiceIcons = useMemo(
    () => ({
      Rock: FaHandRock,
      Paper: FaHandPaper,
      Scissors: FaHandScissors,
    }),
    []
  )

  useEffect(() => {
    if (!isShaking && playerChoice && computerChoice && result === null) {
      const outcome = getResult(playerChoice, computerChoice)
      setResult(outcome)
      if (outcome === "Win") {
        setScore((prev) => ({ ...prev, player: prev.player + 1 }))
      } else if (outcome === "Lose") {
        setScore((prev) => ({ ...prev, computer: prev.computer + 1 }))
      }
    }
  }, [isShaking, playerChoice, computerChoice, result])

  return (
    <div className="min-h-1/2 bg-neutral-800 flex flex-col items-center justify-between p-4 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md bg-neutral-700/30 rounded-lg p-4 flex justify-between items-center mb-6"
      >
        <span className="text-lg font-semibold">You: {score.player}</span>
        <span className="text-lg font-semibold">
          Computer: {score.computer}
        </span>
      </motion.div>

      <AnimatePresence>
        {(isShaking || result) && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col items-center justify-center w-full max-w-md"
          >
            <div className="flex justify-between w-full mb-4">
              <div className="flex flex-col items-center">
                <p className="text-lg mb-3">You</p>
                <AnimatePresence mode="wait">
                  {isShaking ? (
                    <motion.div
                      key="shaking-player"
                      variants={shakeVariant}
                      initial="rest"
                      animate="shake"
                      exit={{ opacity: 0 }}
                      onAnimationComplete={() => {
                        if (isShaking) {
                          setIsShaking(false)
                        }
                      }}
                    >
                      <FaHandRock size={48} className="rotate-90" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="choice-player"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {playerChoice &&
                        choiceIcons[playerChoice]({
                          size: 48,
                          className:
                            playerChoice === "Scissors"
                              ? "transform -scale-x-100"
                              : "rotate-90",
                        })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg mb-3">Computer</p>
                <AnimatePresence mode="wait">
                  {isShaking ? (
                    <motion.div
                      key="shaking-computer"
                      variants={shakeVariant}
                      initial="rest"
                      animate="shake"
                      exit={{ opacity: 0 }}
                    >
                      <FaHandRock
                        size={48}
                        className="transform -scale-x-100 -rotate-90"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="choice-computer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {computerChoice &&
                        choiceIcons[computerChoice]({
                          size: 48,
                          className:
                            computerChoice === "Scissors"
                              ? ""
                              : "transform -scale-x-100 -rotate-90",
                        })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            {result && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={cn(`text-2xl font-bold mb-6`, getStyle(result))}
              >
                {getText(result)}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md flex justify-center gap-6 mb-6"
      >
        {CHOICES.map((choice) => {
          const Icon = choiceIcons[choice]
          return (
            <motion.button
              key={choice}
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className={
                "bg-neutral-900 hover:bg-neutral-700/50 text-white p-4 rounded-full shadow-md cursor-pointer disabled:cursor-not-allowed"
              }
              onClick={() => playRound(choice)}
              aria-label={`Choose ${choice}`}
              disabled={isShaking}
            >
              <Icon
                size={32}
                className={cn(
                  choice === "Scissors" ? "transform -scale-x-100" : "rotate-90"
                )}
              />
            </motion.button>
          )
        })}
      </motion.div>
      {result ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md flex justify-center mb-6"
        >
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-neutral-700/50 text-neutral-100 rounded hover:bg-neutral-600/50 cursor-pointer"
          >
            Reset
          </button>
        </motion.div>
      ) : null}
    </div>
  )
}

export default RockPaperScissorsPage
