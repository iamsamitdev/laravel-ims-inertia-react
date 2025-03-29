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
    <div className={`text-sm text-red-600 dark:text-red-400 ${className}`}>
      {message}
    </div>
  )
} 