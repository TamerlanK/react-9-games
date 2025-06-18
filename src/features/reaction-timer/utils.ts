import { randomItem } from "@/lib/utils"
import { messageGroups, REACTION_TIMER_DELAY, type Status } from "./config"

export const getRandomDelay = (): number => {
  const { MIN, MAX } = REACTION_TIMER_DELAY
  return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN
}

export const getReactionTime = (start: number, end: number): number => {
  return end - start
}

export const getMessage = (status: Status): string => {
  switch (status) {
    case "waiting":
      return "Click to Start"
    case "ready":
      return "Wait for Green..."
    case "go":
      return "CLICK!"
    case "tooSoon":
      return "Too Soon! Click to try again."
  }
}

export const getStatusStyle = (status: Status): string => {
  switch (status) {
    case "waiting":
      return ""
    case "ready":
      return "bg-yellow-400"
    case "go":
      return "bg-green-600"
    case "tooSoon":
      return "bg-red-600"
  }
}

export const getReactionMessage = (time: number): string => {
  for (const group of messageGroups) {
    if (time >= group.threshold) {
      return randomItem(group.messages)
    }
  }
  return "Nice try, though."
}
