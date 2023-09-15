import { AuthContextProvider } from '../auth/auth-context'
import LinkGrid from '@/components/host/link-grid'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthContextProvider>
      <div className='h-full flex flex-col justify-start items-stretch gap-5'>
        <LinkGrid />
        <div className='grow'>{children}</div>
      </div>
    </AuthContextProvider>
  )
}
