'use client'

import { useRouter } from 'next/navigation'
import Button from '@/components/button'
import Header from '@/components/header'

export default function Home() {
  const router = useRouter()

  return (
    <main className='w-full min-h-screen flex flex-col justify-start items-stretch px-5'>
      <div className='w-full flex justify-between items-center gap-10 py-5'>
        <Header size='xxl'>Leekstra</Header>
        <div className='flex justify-start items-center gap-5'>
          <Button onClick={() => router.push('/auth/login')} reg>
            Log In
          </Button>
          <Button onClick={() => router.push('/auth/register')} reg primary>
            Register
          </Button>
        </div>
      </div>
    </main>
  )
}
