import React from 'react'
import { TextareaHTMLAttributes } from 'react'
import InputLabel from './InputLabel'
import InputError from './InputError'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  className?: string
}

export default function TextArea({
  label,
  error,
  className = '',
  ...props
}: TextAreaProps) {
  return (
    <>
      {label && <InputLabel value={label} htmlFor={props.id} />}
      <textarea
        {...props}
        className={`form-control ${error ? 'is-invalid' : ''} ${className}`}
      ></textarea>
      {error && <InputError message={error} />}
    </>
  )
} 