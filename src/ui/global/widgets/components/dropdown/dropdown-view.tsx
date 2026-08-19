'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/shadcn/components/select'

type DropdownOption = {
  value: string
  label: string
  disabled?: boolean
}

type Props = {
  value: string
  onValueChange: (value: string) => void
  options: DropdownOption[]
  placeholder?: string
  triggerClassName?: string
  contentClassName?: string
  disabled?: boolean
}

export function DropdownView({
  value,
  onValueChange,
  options,
  placeholder,
  triggerClassName,
  contentClassName,
  disabled,
}: Props) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={triggerClassName ?? 'w-full cursor-pointer'}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={contentClassName} position='popper'>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className='cursor-pointer'
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
