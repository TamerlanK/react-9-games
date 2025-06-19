import React from "react"

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  id?: string
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  id,
}) => {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <label className="inline-flex items-center cursor-pointer" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={handleToggle}
      />
      <div
        className="relative w-11 h-6 bg-neutral-500/50 rounded-full peer 
                      peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                      peer-checked:after:border-neutral-300 after:content-[''] after:absolute after:top-0.5 after:start-[2px] 
                      after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 
                      after:transition-all peer-checked:bg-neutral-900"
      ></div>
      {label && (
        <span className="ms-3 text-sm font-medium whitespace-nowrap dark:text-neutral-200 text-neutral-900">
          {label}
        </span>
      )}
    </label>
  )
}

export default ToggleSwitch
