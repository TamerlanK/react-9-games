import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const randomItem = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)]
