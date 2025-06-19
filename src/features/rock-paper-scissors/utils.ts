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
  if (!player || !computer) return null

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
      return "You Won!"
    case "Lose":
      return "You Lost!"
    case "Draw":
      return "It's a Draw!"
    default:
      return ""
  }
}

export const getSmartComputerChoice = (history: Choice[]): Choice => {
  if (history.length === 0) {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)]
  }

  const count: Record<Choice, number> = {
    Rock: 0,
    Paper: 0,
    Scissors: 0,
  }

  for (const choice of history) {
    count[choice]++
  }

  const mostFrequent = Object.entries(count).sort(
    (a, b) => b[1] - a[1]
  )[0][0] as Choice

  switch (mostFrequent) {
    case "Rock":
      return "Paper"
    case "Paper":
      return "Scissors"
    case "Scissors":
      return "Rock"
  }
}
