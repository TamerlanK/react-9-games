import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"
import {
  BOARD_SIZE,
  DIFFICULTY,
  HARD_RANDOM_CHANCE,
  MEDIUM_RANDOM_CHANCE,
  type Board,
  type Difficulty,
  type RequiredPlayer,
  type Winner,
  type WinningCombo,
} from "./config"
import { checkWinner, clearCache, getBestMove, getRandomMove } from "./utils"
import { OIcon, XIcon } from "@/components/Icons"

const TicTacToePage = () => {
  const [board, setBoard] = useState<Board>(Array(BOARD_SIZE).fill(null))
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const [winner, setWinner] = useState<Winner>(null)
  const [winningCombo, setWinningCombo] = useState<WinningCombo>(null)
  const [isComputerMode, setIsComputerMode] = useState<boolean>(false)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [score, setScore] = useState<{ X: number; O: number }>({ X: 0, O: 0 })
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTY.Easy)

  const handleCellClick = useCallback(
    (index: number, isComputer: boolean = false): void => {
      if (
        board[index] ||
        winner ||
        !gameStarted ||
        (!isComputer && isComputerMode && !isXNext)
      )
        return

      const newBoard = [...board]
      newBoard[index] = isXNext ? "X" : "O"
      setBoard(newBoard)
      setIsXNext(!isXNext)

      const { winner: gameWinner, combo } = checkWinner(newBoard)
      setWinner(gameWinner)
      setWinningCombo(combo)

      if (gameWinner === "X" || gameWinner === "O") {
        setScore((prev) => ({
          ...prev,
          [gameWinner as RequiredPlayer]:
            prev[gameWinner as RequiredPlayer] + 1,
        }))
      }
    },
    [board, isXNext, winner, gameStarted, isComputerMode]
  )

  const handleDifficultyChange = useCallback(
    (newDifficulty: Difficulty): void => {
      setDifficulty(newDifficulty)
      resetGame()
    },
    []
  )

  const makeComputerMove = useCallback(
    (currentBoard: Board) => {
      if (!gameStarted) return

      const movePicker = {
        [DIFFICULTY.Easy]: () => getRandomMove(currentBoard),
        [DIFFICULTY.Medium]: () =>
          Math.random() < MEDIUM_RANDOM_CHANCE
            ? getRandomMove(currentBoard)
            : getBestMove(currentBoard),
        [DIFFICULTY.Hard]: () =>
          Math.random() < HARD_RANDOM_CHANCE
            ? getRandomMove(currentBoard)
            : getBestMove(currentBoard),
        [DIFFICULTY.Impossible]: () => getBestMove(currentBoard),
      }

      const chosenIndex = movePicker[difficulty]()
      handleCellClick(chosenIndex, true)
    },
    [difficulty, gameStarted, handleCellClick]
  )

  const handleModeSelect = (computerMode: boolean): void => {
    setIsComputerMode(computerMode)
    setGameStarted(true)
    resetGame()
    setScore({ X: 0, O: 0 })
  }

  const resetGame = (): void => {
    clearCache()
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
    setWinningCombo(null)
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isComputerMode && !isXNext && !winner && gameStarted) {
      timeoutId = setTimeout(() => makeComputerMove(board), 500)
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isXNext, board, isComputerMode, winner, gameStarted, makeComputerMove])

  const cursorClass =
    winner || !gameStarted
      ? "cursor-default"
      : isComputerMode
      ? "cursor-x"
      : isXNext
      ? "cursor-x"
      : "cursor-o"

  const renderCell = useCallback(
    (index: number) => (
      <motion.button
        key={index}
        aria-label={`Cell ${index}, ${board[index] || "empty"}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={cn(
          "w-20 h-20 text-3xl font-bold text-white flex items-center justify-center rounded-md shadow-md",
          winningCombo && winningCombo.includes(index)
            ? "bg-green-600 hover:bg-green-600"
            : "bg-neutral-900 hover:bg-neutral-900/50",
          cursorClass
        )}
        onClick={() => handleCellClick(index)}
        disabled={board[index] !== null || winner !== null || !gameStarted}
        whileHover={{ scale: board[index] || winner ? 1 : 1.05 }}
      >
        <motion.span
          key={board[index]}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {board[index] === "X" && <XIcon />}
          {board[index] === "O" && <OIcon />}
        </motion.span>
      </motion.button>
    ),
    [board, winningCombo, handleCellClick, winner, gameStarted, cursorClass]
  )

  return (
    <div className="min-h-screen bg-neutral-800 flex flex-col items-center justify-center p-4">
      <AnimatePresence>
        {!gameStarted ? (
          <motion.div
            className="text-center flex flex-col gap-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <button
              className="px-4 py-2 bg-neutral-700/50 text-neutral-100 rounded hover:bg-neutral-600/50 cursor-pointer"
              onClick={() => handleModeSelect(false)}
            >
              Two Players
            </button>
            <button
              className="px-4 py-2 bg-neutral-700/50 text-neutral-100 rounded hover:bg-neutral-600/50 cursor-pointer"
              onClick={() => handleModeSelect(true)}
            >
              Player vs Computer
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-4 text-white font-semibold text-xl">
              {winner
                ? winner === "Draw"
                  ? "It's a Draw!"
                  : `Winner: ${winner}`
                : `${isXNext ? "X" : "O"}'s Turn`}
            </div>
            <div className="mb-4 text-neutral-300 text-lg flex items-center justify-between font-bold">
              <span className="px-4 py-2 bg-neutral-700 rounded">
                X - {score.X}
              </span>
              <span className="px-4 py-2 bg-neutral-700 rounded ml-2">
                O - {score.O}
              </span>
            </div>
            <div className={cn("grid grid-cols-3 gap-2 mb-6", cursorClass)}>
              {board.map((_, index) => renderCell(index))}
            </div>

            <div className="space-x-4">
              <button
                className="px-4 py-2 bg-neutral-700/50 text-neutral-100 rounded hover:bg-neutral-600/50 cursor-pointer"
                onClick={resetGame}
              >
                Reset Game
              </button>
              <button
                className="px-4 py-2 bg-neutral-700/50 text-neutral-100 rounded hover:bg-neutral-600/50 cursor-pointer"
                onClick={() => {
                  setGameStarted(false)
                  resetGame()
                }}
              >
                Change Mode
              </button>
            </div>
            {isComputerMode && (
              <div className="relative w-full">
                <select
                  className="appearance-none mt-4 p-2 bg-neutral-700/50 text-neutral-100 rounded hover:bg-neutral-600/50 cursor-pointer w-full pr-10"
                  value={difficulty}
                  onChange={(e) =>
                    handleDifficultyChange(e.target.value as Difficulty)
                  }
                >
                  {Object.values(DIFFICULTY).map((value) => (
                    <option key={value} value={value}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 text-neutral-300">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TicTacToePage
