import React from 'react'
import { MagnifyingGlass } from 'phosphor-react'
import { Input } from './index'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onReset?: () => void
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Search...', 
  onReset 
}) => {
  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e: any) => {
          onChange(e.target.value)
          onReset?.()
        }}
        className="pl-10"
      />
      <div className="absolute inset-y-0 left-0 flex items-center ps-3 text-white/70 pointer-events-none">
        <MagnifyingGlass size={16} weight="bold" />
      </div>
    </div>
  )
}

export default SearchInput
