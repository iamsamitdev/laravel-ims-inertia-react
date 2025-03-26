import React from 'react'
import { ReactNode } from 'react'

interface InputLabelProps {
  value?: ReactNode
  htmlFor?: string
  children?: ReactNode
  className?: string
  required?: boolean
}

export default function InputLabel({ value, htmlFor, className = '', children, required = false }: InputLabelProps) {
  return (
    <label htmlFor={htmlFor} className={`form-label ${className}`}>
      {value || children}
      {required && <span className="text-danger">*</span>}
    </label>
  )
}
