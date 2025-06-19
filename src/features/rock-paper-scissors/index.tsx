import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useMemo, useState } from "react"
import { FaHandPaper, FaHandRock, FaHandScissors } from "react-icons/fa"
import {
  CHOICES,
  type Choice,
  type Result,
  getResult,
  getSmartComputerChoice,
  getStyle,
  getText,
  shakeVariant,
} from "./utils"
import ToggleSwitch from "@/components/ui/ToggleSwitch"
import { FiInfo } from "react-icons/fi"
import Tooltip from "@/components/ui/Tooltip"

const RockPaperScissorsPage = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null)
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null)
  const [result, setResult] = useState<Result>(null)
  const [score, setScore] = useState({ player: 0, computer: 0 })
  const [isShaking, setIsShaking] = useState(false)
  const [aiMode, setAiMode] = useState<"random" | "smart">("random")
  const [playerHistory, setPlayerHistory] = useState<Choice[]>([])

  const playRound = useCallback(
    (choice: Choice) => {
      if (isShaking) return
      setPlayerChoice(choice)
      setPlayerHistory((prev) => [...prev, choice])

      const compChoice =
        aiMode === "smart"
          ? getSmartComputerChoice([...playerHistory, choice])
          : CHOICES[Math.floor(Math.random() * CHOICES.length)]

      setComputerChoice(compChoice)
      setResult(null)
      setIsShaking(true)
    },
    [isShaking, playerHistory, aiMode]
  )

  const resetGame = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
    setIsShaking(false)
    setScore({ player: 0, computer: 0 })
    setPlayerHistory([])
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
    <div className="flex flex-col text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-neutral-700/30 rounded-lg p-4 flex justify-between items-center mb-8"
          >
            <span className="text-xl font-semibold">You: {score.player}</span>
            <span className="text-xl font-semibold">
              Computer: {score.computer}
            </span>
          </motion.div>

          <div className="w-full flex items-center justify-center min-h-[200px]">
            <AnimatePresence>
              {(isShaking || result) && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex flex-col items-center justify-center"
                >
                  <div className="flex justify-between w-full mb-6">
                    <div className="flex flex-col items-center w-1/2">
                      <p className="text-lg mb-4">You</p>
                      <div className="h-16 flex items-center">
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
                    </div>
                    <div className="flex flex-col items-center w-1/2">
                      <p className="text-lg mb-4">Computer</p>
                      <div className="h-16 flex items-center">
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
                  </div>
                  <div className="h-12 flex items-center">
                    {result && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className={cn(`text-2xl font-bold`, getStyle(result))}
                      >
                        {getText(result)}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full flex justify-center gap-8 mb-8"
          >
            {CHOICES.map((choice) => {
              const Icon = choiceIcons[choice]
              return (
                <motion.button
                  key={choice}
                  {...(!isShaking && {
                    whileHover: {
                      scale: 1.1,
                    },
                    whileTap: { scale: 0.95 },
                  })}
                  className={cn(
                    "bg-neutral-900 hover:bg-neutral-700/50 text-white p-6 rounded-full shadow-md cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-neutral-900 disabled:opacity-50 transition-colors duration-200",
                    "w-20 h-20 flex items-center justify-center"
                  )}
                  onClick={() => playRound(choice)}
                  aria-label={`Choose ${choice}`}
                  disabled={isShaking}
                >
                  <Icon
                    size={36}
                    className={cn(
                      choice === "Scissors"
                        ? "transform -scale-x-100"
                        : "rotate-90"
                    )}
                  />
                </motion.button>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full flex justify-between items-center gap-6"
          >
            <button
              onClick={resetGame}
              className="px-6 py-3 w-full bg-neutral-700/50 text-neutral-100 rounded hover:bg-neutral-600/50 cursor-pointer"
            >
              Reset
            </button>
            <div className="flex items-center gap-3">
              <ToggleSwitch
                checked={aiMode === "smart"}
                onChange={(checked) => setAiMode(checked ? "smart" : "random")}
                label="Smart Mode"
                id="ai-mode-toggle"
              />
              <Tooltip content="In Smart Mode, the computer analyzes your previous choices and selects a move designed to counter them.">
                <FiInfo className="w-4 h-4 text-neutral-400 hover:text-neutral-200 cursor-pointer" />
              </Tooltip>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default RockPaperScissorsPage
