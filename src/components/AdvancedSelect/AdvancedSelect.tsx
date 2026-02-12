"use client"

import { Fragment, useState, useMemo } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Check, ChevronDown, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { List } from 'react-window'

export interface SelectOption {
  id: string | number
  label: string
  value: string | number
  group?: string
  disabled?: boolean
}

interface AdvancedSelectProps {
  options: SelectOption[]
  value?: SelectOption | SelectOption[]
  onChange: (value: SelectOption | SelectOption[]) => void
  placeholder?: string
  multiple?: boolean
  searchable?: boolean
  grouped?: boolean
  virtualized?: boolean
  showSelectAll?: boolean
  className?: string
}

export function AdvancedSelect({
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید...",
  multiple = false,
  searchable = true,
  grouped = false,
  virtualized = false,
  showSelectAll = false,
  className,
}: AdvancedSelectProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options
    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [options, searchQuery])
  const groupedOptions = useMemo(() => {
    if (!grouped) return { ungrouped: filteredOptions }
    
    return filteredOptions.reduce((acc, option) => {
      const group = option.group || 'سایر'
      if (!acc[group]) acc[group] = []
      acc[group].push(option)
      return acc
    }, {} as Record<string, SelectOption[]>)
  }, [filteredOptions, grouped])

  const selectedValues = useMemo(() => {
    if (!value) return []
    return Array.isArray(value) ? value : [value]
  }, [value])

  const isSelected = (option: SelectOption) => {
    return selectedValues.some(v => v.id === option.id)
  }

  const handleSelect = (option: SelectOption) => {
    if (!multiple) {
      onChange(option)
      return
    }

    const isCurrentlySelected = isSelected(option)
    const newValue = isCurrentlySelected
      ? selectedValues.filter(v => v.id !== option.id)
      : [...selectedValues, option]
    
    onChange(newValue)
  }

  const handleSelectAll = () => {
    if (selectedValues.length === filteredOptions.length) {
      onChange([])
    } else {
      onChange(filteredOptions)
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(multiple ? [] : {} as SelectOption)
    setSearchQuery('')
  }

  const renderOption = (option: SelectOption) => (
    <Listbox.Option
      key={option.id}
      value={option}
      disabled={option.disabled}
      className={({ active }) =>
        cn(
          'relative cursor-pointer select-none py-3 px-4 transition-colors',
          active ? 'bg-primary/10 text-primary' : 'text-foreground',
          option.disabled && 'opacity-50 cursor-not-allowed',
          'hover:bg-primary/5'
        )
      }
      onClick={() => handleSelect(option)}
    >
      {({ selected }) => (
        <div className="flex items-center justify-between">
          <span className={cn('block truncate', selected && 'font-semibold')}>
            {option.label}
          </span>
          {(multiple ? isSelected(option) : selected) && (
            <Check className="h-4 w-4 text-primary" />
          )}
        </div>
      )}
    </Listbox.Option>
  )

const renderVirtualizedOptions = () => {
  return (
    <div className="max-h-[300px] overflow-auto">
      {filteredOptions.map(option => renderOption(option))}
    </div>
  )
}

  const renderGroupedOptions = () => (
    <>
      {Object.entries(groupedOptions).map(([group, groupOptions]) => (
        <div key={group}>
          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground bg-muted/50 sticky top-0">
            {group}
          </div>
          {groupOptions.map(option => renderOption(option))}
        </div>
      ))}
    </>
  )

  return (
    <Listbox value={value} onChange={onChange} multiple={multiple}>
      {({ open }) => (
        <div className={cn('relative', className)}>
          <Listbox.Button className="relative w-full h-12 cursor-pointer rounded-lg border border-[#fcfcfc14] bg-[#171717] py-2 pl-10 pr-4 text-right focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
            <span className="block truncate">
              {selectedValues.length === 0
                ? placeholder
                : multiple
                ? `${selectedValues.length} مورد انتخاب شده`
                : selectedValues[0]?.label}
            </span>
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {selectedValues.length > 0 && (
                <button
                  onClick={handleClear}
                  className="pointer-events-auto p-1 hover:bg-destructive/10 rounded transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </button>
              )}
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-muted-foreground transition-transform',
                  open && 'rotate-180'
                )}
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-2 max-h-96 w-full overflow-auto rounded-lg border border-[#fcfcfc14] bg-[#171717] shadow-2xl focus:outline-none">
              {searchable && (
                <div className="sticky top-0 z-10 bg-[#171717] p-3 border-b border-[#fcfcfc14]">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="جستجو..."
                      className="w-full h-10 pr-10 pl-3 rounded-md border border-[#fcfcfc14] bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              )}

              {multiple && showSelectAll && filteredOptions.length > 0 && (
                <div
                  onClick={handleSelectAll}
                  className="cursor-pointer select-none py-3 px-4 border-b border-[#fcfcfc14] hover:bg-primary/10 transition-colors font-medium"
                >
                  <div className="flex items-center justify-between">
                    <span>
                      {selectedValues.length === filteredOptions.length
                        ? 'حذف همه'
                        : 'انتخاب همه'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({selectedValues.length}/{filteredOptions.length})
                    </span>
                  </div>
                </div>
              )}

              {/* لیست  */}
              {filteredOptions.length === 0 ? (
                <div className="py-8 px-4 text-center text-muted-foreground">
                  موردی یافت نشد
                </div>
              ) : virtualized ? (
                renderVirtualizedOptions()
              ) : grouped ? (
                renderGroupedOptions()
              ) : (
                filteredOptions.map(option => renderOption(option))
              )}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}