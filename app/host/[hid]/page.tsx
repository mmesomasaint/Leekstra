'use client'

import Image from 'next/image'
import Button from '@/components/button'
import Header from '@/components/header'
import { useAuthContext } from '../auth/auth-context'

export default function Profile() {
  const { host } = useAuthContext()

  return (
    <div className='px-10'>
      <Header size='xl'>Profile</Header>
      <div className='grid grid-cols-3 place-items-stretch gap-10 p-10'>
        <div className='col-span-2 p-5 flex flex-col gap-5'>
          <Button primary reg>
            Edit Profile
          </Button>
          <div className='flex justify-start items-center gap-10'>
            <Image
              src='/imgs/female-avatar.jpg'
              width={200}
              height={200}
              alt='avatar'
            />
            <div className='flex flex-col gap-5'>
              <span className='text-lg font-semibold text-black/75'>
                Name: Emeka D Stalleon
              </span>
              <span className='text-lg font-semibold text-black/75'>
                Email: {host?.email}
              </span>
              <span className='text-lg font-semibold text-black/75'>
                Location: Enugu, Nigeria
              </span>
            </div>
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
