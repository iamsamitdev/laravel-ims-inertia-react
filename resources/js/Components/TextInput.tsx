import React from 'react'
import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className = '', error, ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      className={`form-control ${error ? 'is-invalid' : ''} ${className}`}
    />
  )
)

TextInput.displayName = 'TextInput'

export default TextInput 