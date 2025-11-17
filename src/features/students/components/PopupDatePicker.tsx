import React, { useEffect, useRef, useState } from 'react'
import { Calendar, CaretLeft, CaretRight, X } from 'phosphor-react'

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}

function pad(n: number) { return n < 10 ? `0${n}` : `${n}` }

function formatISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
}

function monthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const PopupDatePicker: React.FC<Props> = ({ value, onChange, placeholder, className }) => {
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => value ? new Date(value) : new Date())
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    if (value) setViewDate(new Date(value))
  }, [value])

  const weeks: (number | null)[][] = []
  const start = monthStart(viewDate)
  const firstDay = start.getDay() // 0-6 Sun-Sat
  const total = daysInMonth(viewDate)
  let day = 1 - firstDay
  for (let w = 0; w < 6; w++) {
    const week: (number | null)[] = []
    for (let i = 0; i < 7; i++, day++) {
      if (day < 1 || day > total) week.push(null)
      else week.push(day)
    }
    weeks.push(week)
    if (day > total) break
  }

  const selectDay = (d: number) => {
    const dt = new Date(viewDate.getFullYear(), viewDate.getMonth(), d)
    onChange(formatISO(dt))
    setOpen(false)
  }

  const today = new Date()

  return (
    <div className={className} ref={ref}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="w-full text-left bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-3 py-2 pr-10 text-white flex items-center gap-2"
        >
          <div className="flex-1 text-sm">{value ? new Date(value).toLocaleDateString() : (placeholder ?? 'Pick a date')}</div>
          {value && (<button type="button" onClick={(e)=>{ e.stopPropagation(); onChange('') }} className="p-1 text-[#adb5bd] hover:text-white mr-2"><X size={14} /></button>)}
          <div className="p-1 text-white"><Calendar size={18} weight="regular" /></div>
        </button>

        {open && (
          <div className="absolute left-0 mt-2 z-50 w-80 bg-[#0f0f10] border border-[#2a2a2d] rounded shadow-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <button onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))} className="p-1 hover:bg-white/5 rounded"><CaretLeft size={16} /></button>
                <div className="font-medium text-white">{viewDate.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
                <button onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))} className="p-1 hover:bg-white/5 rounded"><CaretRight size={16} /></button>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 text-[#adb5bd] hover:text-white"><X size={16} /></button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-xs text-[#9aa0a6] mb-1">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=> <div key={d} className="text-center">{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {weeks.map((week, wi) => week.map((d, i) => {
                const key = `${wi}-${i}`
                if (!d) return <div key={key} />
                const isSelected = value && new Date(value).getFullYear() === viewDate.getFullYear() && new Date(value).getMonth() === viewDate.getMonth() && new Date(value).getDate() === d
                const todayDate = new Date()
                const isToday = !value && todayDate.getFullYear() === viewDate.getFullYear() && todayDate.getMonth() === viewDate.getMonth() && todayDate.getDate() === d
                const cls = isSelected
                  ? 'bg-[#facb25] text-black'
                  : isToday
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-white/5 text-white'
                return (
                  <button key={key} onClick={() => selectDay(d)} className={`w-9 h-9 flex items-center justify-center rounded ${cls}`}>
                    {d}
                  </button>
                )
              }))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PopupDatePicker
