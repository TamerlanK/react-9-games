export const BOARD_SIZE = 9

export const DIFFICULTY = {
  Easy: "easy",
  Medium: "medium",
  Hard: "hard",
  Impossible: "impossible",
} as const

export const WINNING_COMBOS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export const MEDIUM_RANDOM_CHANCE = 0.7
export const HARD_RANDOM_CHANCE = 0.3

export type Difficulty = (typeof DIFFICULTY)[keyof typeof DIFFICULTY]

export type Player = "X" | "O" | null
export type RequiredPlayer = Exclude<Player, null>
export type Board = Player[]
export type Winner = Player | "Draw" | null
export type WinningCombo = number[] | null
