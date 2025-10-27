import * as React from 'react'

interface FormProps {
  title?: string
  children?: React.ReactNode
  className?: string
}

export const Form: React.FC<FormProps> = ({ title, children, className }) => {
  return (
    <div className={className}>
      {title && <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>}
      <div className="space-y-3">{children}</div>
    </div>
  )
}

export const FormRow: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={className}>{children}</div>
)

export default Form
