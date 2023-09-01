import Link from 'next/link'

type LinkProps = {
  href: string
  className: string
  children: React.ReactNode
}

export default function LinkText({ href, className, children }: LinkProps) {
  return (
    <div
      className={`text-blue/75 text-base font-medium hover:underline hover:underline-offset-2 ${className}`}
    >
      <Link href={href}>{children}</Link>
    </div>
  )
}
