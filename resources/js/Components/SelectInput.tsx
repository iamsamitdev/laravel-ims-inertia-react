import React from 'react'
import { ReactNode, SelectHTMLAttributes } from 'react'
import InputLabel from './InputLabel'
import InputError from './InputError'

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  className?: string
  children: ReactNode
}

export default function SelectInput({
  label,
  error,
  className = '',
  children,
  ...props
}: SelectInputProps) {
  return (
    <>
      {label && <InputLabel value={label} htmlFor={props.id} />}
      <select
        {...props}
        className={`form-select ${error ? 'is-invalid' : ''} ${className}`}
      >
        {children}
      </select>
      {error && <InputError message={error} />}
    </>
  )
}
