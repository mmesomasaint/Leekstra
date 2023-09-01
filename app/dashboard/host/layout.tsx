import Header from '@/components/header'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full flex flex-col justify-start items-stretch gap-5'>
      <div className='w-full flex justify-between items-center gap-10 py-5'>
        <div className='flex gap-10'>
          <Header size='xxl'>Leekstra</Header>
          <div className='flex justify-evenly items-center gap-5'>
            <Link href='profile'>Profile</Link>
            <Link href='proposals'>Proposals</Link>
            <Link href='messages'>Messages</Link>
            <Link href='invites'>Invites</Link>
          </div>
        </div>
        <div className='flex justify-start items-center gap-5'></div>
      </div>
      <div className='grow'>{children}</div>
    </div>
  )
}
