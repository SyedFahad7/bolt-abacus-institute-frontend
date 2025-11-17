import React, { useRef } from 'react'
import { Calendar, X } from 'phosphor-react'

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}

const NativeStyledDatePicker: React.FC<Props> = ({ value, onChange, placeholder, className }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const openPicker = () => {
    // Preferred: use showPicker when available (Chrome/Edge)
    if (inputRef.current && (inputRef.current as any).showPicker) {
      ;(inputRef.current as any).showPicker()
      return
    }
    // Fallback: focus the input (this opens the native picker on many browsers)
    inputRef.current?.focus()
  } 

  return (
    <div className={className}>
      <div className="relative">
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-3 py-2 pr-10 text-white"
          placeholder={placeholder}
        />

        {/* Calendar trigger (clicking it will focus/open native picker) */}
        <button
          type="button"
          onClick={openPicker}
          aria-label="Open date picker"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 flex items-center justify-center text-white"
        >
          <Calendar size={18} weight="regular" />
        </button>

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear date"
            className="absolute right-9 top-1/2 -translate-y-1/2 p-1 flex items-center justify-center text-[#adb5bd] hover:text-white"
          >
            <X size={14} weight="regular" />
          </button>
        )}
      </div>
    </div>
  )
}

export default NativeStyledDatePicker
