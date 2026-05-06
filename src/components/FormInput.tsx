import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface FormInputProps {
  label: string
  type: 'text' | 'password'
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  placeholder = '',
  value,
  onChange,
  error,
}) => {
  return (
    <div className="w-full flex flex-col gap-[0.5vh]">
      <p className="text-[1.5vh] text-smoke-text uppercase font-bold">
        {label}
      </p>

      <div
        className={`w-full px-[2vw] portrait:px-[4vw] py-[1vh] bg-dark-bg portrait:bg-black-bg h-[5vh] flex items-center portrait:rounded-[2.5vh] border rounded-[1vh] ${
          error ? 'border-red-500' : 'border-transparent focus-within:border-pink'
        }`}
      >
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="!text-secondary-text focus:!text-smoke-text !bg-transparent !border-none !outline-none w-full text-[1.8vh]"
        />
      </div>

      {error && (
        <p className="text-red-400 text-[1.3vh]">
          {error}
        </p>
      )}
    </div>
  )
}

interface FormSelectProps {
  label: string
  options: string[]
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  options,
  placeholder = 'Select',
  value,
  onChange,
  error,
}) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col gap-[0.5vh] relative"
    >
      <p className="text-[1.5vh] text-smoke-text uppercase font-bold">
        {label}
      </p>

      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full h-[5vh] portrait:rounded-[2.5vh] relative px-[2vw] portrait:px-[4vw] py-[1vh] bg-dark-bg portrait:bg-black-bg border rounded-[1vh] flex items-center justify-between text-smoke-text cursor-pointer transition-all ${
          error
            ? 'border-red-500'
            : open
            ? 'border-pink'
            : 'border-transparent'
        }`}
      >
        <p className="text-[1.8vh]">
          {value || placeholder}
        </p>

        <FontAwesomeIcon icon={faChevronDown} />
      </div>

      {open && (
        <div className="border border-pink absolute z-10 top-[calc(100%+1vh)] left-0 w-[calc(100%+2px)] flex flex-col bg-dark-bg h-[20vh] overflow-y-auto rounded-[1vh]">
          {options.map((opt) => (
            <SelectOption
              key={opt}
              label={opt}
              active={value === opt}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
            />
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-400 text-[1.3vh]">
          {error}
        </p>
      )}
    </div>
  )
}

/* ===================== OPTION ===================== */

interface SelectOptionProps {
  label: string
  active?: boolean
  onClick: () => void
}

const SelectOption: React.FC<SelectOptionProps> = ({
  label,
  active,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center text-[1.8vh] px-[1.75vw] border-l-[0.25vw] portrait:border-l-[1vw] portrait:px-[3vw] py-[1vh] w-full h-[4vh] cursor-pointer
        ${
          active
            ? 'text-pink bg-[#342F48] border-pink'
            : 'text-smoke-text hoverable:hover:bg-[rgba(255,255,255,0.1)] border-transparent'
        }
      `}
    >
      {label}
    </div>
  )
}