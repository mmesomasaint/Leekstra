type HeaderProps = {
  size: 'xxl' | 'xl' | 'l' | 'm'
  children: React.ReactNode
}

export default function Header({ size, children }: HeaderProps) {
  return (
    <h1
      className={`${size === 'xxl' && 'font-extrabold text-4xl'} ${
        size === 'xl' && 'font-bold text-3xl'
      } ${size === 'l' && 'font-semibold text-2xl'} ${
        size === 'm' && 'font-medium xl'
      }`}
    >
      {children}
    </h1>
  )
}
