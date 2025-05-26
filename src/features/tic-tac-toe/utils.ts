import {
  WINNING_COMBOS,
  type Board,
  type Winner,
  type WinningCombo,
} from "./config"

export const checkWinner = (
  board: Board
): { winner: Winner; combo: WinningCombo } => {
  for (const [a, b, c] of WINNING_COMBOS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo: [a, b, c] }
    }
  }
  return {
    winner: board.every((cell) => cell !== null) ? "Draw" : null,
    combo: null,
  }
}

type CacheKey = string
const cache = new Map<CacheKey, number>()

const serializeBoard = (board: Board): string =>
  board.map((cell) => cell ?? "-").join("")

export const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number
): number => {
  const { winner } = checkWinner(board)
  if (winner === "O") return 10 - depth
  if (winner === "X") return depth - 10
  if (winner === "Draw") return 0

  const key = `${serializeBoard(board)}_${isMaximizing}`
  if (cache.has(key)) return cache.get(key)!

  const available = board
    .map((cell, i) => (cell === null ? i : null))
    .filter((i): i is number => i !== null)

  let bestScore = isMaximizing ? -Infinity : Infinity

  for (const idx of available) {
    board[idx] = isMaximizing ? "O" : "X"
    const score = minimax(board, depth + 1, !isMaximizing, alpha, beta)
    board[idx] = null

    if (isMaximizing) {
      bestScore = Math.max(bestScore, score)
      alpha = Math.max(alpha, score)
    } else {
      bestScore = Math.min(bestScore, score)
      beta = Math.min(beta, score)
    }

    if (beta <= alpha) break
  }

  cache.set(key, bestScore)
  return bestScore
}

export const getBestMove = (board: Board): number => {
  let bestScore = -Infinity
  let move = -1

  const available = board
    .map((cell, i) => (cell === null ? i : null))
    .filter((i): i is number => i !== null)

  for (const idx of available) {
    board[idx] = "O"
    const score = minimax(board, 0, false, -Infinity, Infinity)
    board[idx] = null

    if (score > bestScore) {
      bestScore = score
      move = idx
    }
  }

  return move
}

export const getRandomMove = (board: Board): number => {
  const available = board
    .map((cell, i) => (cell === null ? i : null))
    .filter((i): i is number => i !== null)

  return available[Math.floor(Math.random() * available.length)]
}
