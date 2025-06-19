import React, { type ReactNode } from "react"

interface TooltipProps {
  content: string
  children: ReactNode
  position?: "top" | "bottom" | "left" | "right"
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case "bottom":
        return "top-full mt-1 left-1/2 -translate-x-1/2"
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2"
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2"
      case "top":
      default:
        return "bottom-full mb-1 left-1/2 -translate-x-1/2"
    }
  }

  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`absolute z-10 text-xs w-[220px] text-white bg-neutral-700 p-2 m-2 rounded shadow-lg
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
                    ${getPositionClasses()}`}
      >
        {content}
      </div>
    </div>
  )
}

export default Tooltip
