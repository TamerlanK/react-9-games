export const CHOICES = ["Rock", "Paper", "Scissors"] as const
export type Choice = (typeof CHOICES)[number]
export type Result = "Win" | "Lose" | "Draw" | null

export const shakeVariant = {
  rest: { y: 0 },
  shake: {
    y: [0, 20, 0, 20, 0, 20, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
}

export const getResult = (player: Choice, computer: Choice): Result => {
  if (player === computer) return "Draw"
  if (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Paper" && computer === "Rock") ||
    (player === "Scissors" && computer === "Paper")
  )
    return "Win"
  return "Lose"
}

export const getStyle = (result: Result) => {
  switch (result) {
    case "Win":
      return "text-green-400"
    case "Lose":
      return "text-red-400"
    case "Draw":
      return "text-yellow-400"
    default:
      return ""
  }
}

export const getText = (result: Result) => {
  switch (result) {
    case "Win":
      return "You Win!"
    case "Lose":
      return "You Lose!"
    case "Draw":
      return "It's a Draw!"
    default:
      return ""
  }
}
