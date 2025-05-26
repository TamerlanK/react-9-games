import { cn } from "@/lib/utils"
import { useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MdKeyboardArrowDown } from "react-icons/md"

const DIFFICULTY = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard",
  Impossible: "impossible",
} as const

const DIFFICULTY_OPTIONS: Record<Difficulty, string> = {
  [DIFFICULTY.Easy]: "Easy",
  [DIFFICULTY.Medium]: "Medium",
  [DIFFICULTY.Hard]: "Hard",
  [DIFFICULTY.Impossible]: "Impossible",
}

type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY]

type Player = "X" | "O" | null
type Board = Player[]
type Winner = Player | "Draw" | null
type WinningCombo = number[] | null

const WINNING_COMBOS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const TicTacToePage = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const [winner, setWinner] = useState<Winner>(null)
  const [winningCombo, setWinningCombo] = useState<WinningCombo>(null)
  const [isComputerMode, setIsComputerMode] = useState<boolean>(false)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [score, setScore] = useState<{ X: number; O: number }>({ X: 0, O: 0 })
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTY.Easy)

  const checkWinner = useCallback(
    (currentBoard: Board): { winner: Winner; combo: WinningCombo } => {
      for (const combo of WINNING_COMBOS) {
        const [a, b, c] = combo
        if (
          currentBoard[a] &&
          currentBoard[a] === currentBoard[b] &&
          currentBoard[a] === currentBoard[c]
        ) {
          return { winner: currentBoard[a], combo }
        }
      }
      return {
        winner: currentBoard.every((cell) => cell !== null) ? "Draw" : null,
        combo: null,
      }
    },
    []
  )

  const handleCellClick = useCallback(
    (index: number, isComputer: boolean = false): void => {
      if (board[index] || winner || (!isComputer && !gameStarted)) return

      const newBoard = [...board]
      newBoard[index] = isXNext ? "X" : "O"
      setBoard(newBoard)
      setIsXNext(!isXNext)

      const { winner: gameWinner, combo } = checkWinner(newBoard)
      setWinner(gameWinner)
      setWinningCombo(combo)

      if (gameWinner === "X" || gameWinner === "O") {
        setScore((prev) => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }))
      }
    },
    [board, isXNext, winner, gameStarted, checkWinner]
  )

  const handleDifficultyChange = useCallback(
    (newDifficulty: Difficulty): void => {
      setDifficulty(newDifficulty)
      resetGame()
    },
    []
  )

  const minimax = useCallback(
    (currentBoard: Board, depth: number, isMaximizing: boolean): number => {
      const { winner: boardWinner } = checkWinner(currentBoard)
      if (boardWinner === "O") return 10 - depth
      if (boardWinner === "X") return depth - 10
      if (boardWinner === "Draw") return 0

      const scores: number[] = []
      const availableIndices = currentBoard
        .map((cell, idx) => (cell === null ? idx : null))
        .filter((idx): idx is number => idx !== null)

      for (const idx of availableIndices) {
        currentBoard[idx] = isMaximizing ? "O" : "X"
        const score = minimax(currentBoard, depth + 1, !isMaximizing)
        scores.push(score)
        currentBoard[idx] = null
      }

      return isMaximizing ? Math.max(...scores) : Math.min(...scores)
    },
    [checkWinner]
  )

  const getBestMove = useCallback(
    (currentBoard: Board): number => {
      let bestScore = -Infinity
      let move = -1
      const availableIndices = currentBoard
        .map((cell, idx) => (cell === null ? idx : null))
        .filter((idx): idx is number => idx !== null)

      for (const idx of availableIndices) {
        currentBoard[idx] = "O"
        const score = minimax(currentBoard, 0, false)
        currentBoard[idx] = null
        if (score > bestScore) {
          bestScore = score
          move = idx
        }
      }

      return move
    },
    [minimax]
  )

  const getRandomMove = (currentBoard: Board): number => {
    const available = currentBoard
      .map((cell, idx) => (cell === null ? idx : null))
      .filter((idx): idx is number => idx !== null)
    return available[Math.floor(Math.random() * available.length)]
  }

  const makeComputerMove = useCallback(
    (currentBoard: Board): void => {
      if (!gameStarted) return
      let chosenIndex: number
      switch (difficulty) {
        case DIFFICULTY.Easy:
          chosenIndex = getRandomMove(currentBoard)
          break
        case DIFFICULTY.Medium:
          chosenIndex =
            Math.random() < 0.7
              ? getRandomMove(currentBoard)
              : getBestMove(currentBoard)
          break
        case DIFFICULTY.Hard:
          chosenIndex =
            Math.random() < 0.3
              ? getRandomMove(currentBoard)
              : getBestMove(currentBoard)
          break
        case DIFFICULTY.Impossible:
        default:
          chosenIndex = getBestMove(currentBoard)
      }
      handleCellClick(chosenIndex, true)
    },
    [handleCellClick, difficulty, gameStarted, getBestMove]
  )

  const handleModeSelect = (computerMode: boolean): void => {
    setIsComputerMode(computerMode)
    setGameStarted(true)
    resetGame()
    setScore({ X: 0, O: 0 })
  }

  const resetGame = (): void => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setWinner(null)
    setWinningCombo(null)
  }

  useEffect(() => {
    if (isComputerMode && !isXNext && !winner && gameStarted) {
      const timer = setTimeout(() => makeComputerMove(board), 500)
      return () => clearTimeout(timer)
    }
  }, [isXNext, board, isComputerMode, winner, gameStarted, makeComputerMove])

  const renderCell = (index: number) => (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn(
        "w-20 h-20 text-3xl font-bold text-white flex items-center justify-center rounded-md shadow-md cursor-pointer",
        winningCombo && winningCombo.includes(index)
          ? "bg-green-600 hover:bg-green-600"
          : "bg-neutral-900 hover:bg-neutral-900/50"
      )}
      onClick={() => handleCellClick(index)}
      disabled={board[index] !== null || winner !== null || !gameStarted}
    >
      <motion.span
        key={board[index]}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {board[index]}
      </motion.span>
    </motion.button>
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
            <div className="grid grid-cols-3 gap-2 mb-6">
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
                  {Object.entries(DIFFICULTY_OPTIONS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
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
