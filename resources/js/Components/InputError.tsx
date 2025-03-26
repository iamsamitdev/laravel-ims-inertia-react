import React from 'react'

interface InputErrorProps {
  message?: string
  className?: string
}

export default function InputError({ message, className = '' }: InputErrorProps) {
  if (!message) {
    return null
  }

  return (
    <div className={`invalid-feedback ${className}`}>
      {message}
    </div>
  )
} 