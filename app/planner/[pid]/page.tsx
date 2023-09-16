'use client'

import { useAuthContext } from '../auth/auth-context'
import Header from '@/components/header'
import Image from 'next/image'
import Button from '@/components/button'

export default function Profile() {
  const { planner } = useAuthContext()

  return (
    <div className='px-10'>
      <Header size='xl'>Profile</Header>
      <div className='grid grid-cols-3 place-items-stretch gap-10 p-10'>
        <div className='col-span-2 p-5 flex flex-col gap-5'>
          <div className='flex justify-between items-center gap-10'>
            <div className='grow'>
          <Image
            src='/imgs/male-avatar.jpg'
            width={200}
            height={200}
            alt='avatar'
          />
          <span className='text-lg font-semibold text-black/75'>
            Name: Emeka D Stalleon
          </span>
          <span className='text-lg font-semibold text-black/75'>
            Location: Enugu, Nigeria
          </span>
          </div>
          <Button primary reg>
            Edit Profile
          </Button>
          </div>
        </div>
        <div className='p-5'>
          <span className='text-lg font-semibold text-black/75'>
            Ratings: 5 stars
          </span>
        </div>
      </div>
    </div>
  )
}
