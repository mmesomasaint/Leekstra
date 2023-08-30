type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
  primary?: boolean
  disabled?: boolean
  reg?: boolean
}

export default function Button({
  type,
  onClick,
  primary,
  disabled,
  reg,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${
        primary ? 'bg-black/75 text-white' : 'bg-white text-black/75'
      } border border-black/75 shadow-md rounded-md font-medium text-base ${
        reg && 'px-4 py-2'
      } ${className}`}
    >
      {children}
    </button>
  )
}
