import Header from '@/components/header'
import LinkText from '@/components/link-text'
import { AuthContextProvider } from '../auth/auth-context'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <AuthContextProvider>
    <div className='h-full flex flex-col justify-start items-stretch gap-5'>
      <div className='w-full flex justify-between items-center gap-10 py-5'>
        <div className='flex gap-10'>
          <Header size='xxl'>Leekstra</Header>
          <div className='flex justify-evenly items-center gap-5'>
            <LinkText href='profile'>Profile</LinkText>
            <LinkText href='find-match'>Find Match</LinkText>
            <LinkText href='messages'>Messages</LinkText>
            <LinkText href='invites'>Jobs</LinkText>
          </div>
        </div>
        <div className='flex justify-start items-center gap-5'></div>
      </div>
      <div className='grow'>{children}</div>
    </div>
    </AuthContextProvider>
  )
}
