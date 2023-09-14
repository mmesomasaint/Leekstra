'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import getHost from '@/lib/auth/host/getHost'
import Button from '@/components/button'
import Header from '@/components/header'
import { useAuthContext } from '../auth/auth-context'

export default function Profile({ params }: { params: { hid: string } }) {
  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    const validateURL = async (urlid: string, uid?: string) => {
      // Get the currenct user
      const host = await getHost(uid)

      // Check if the current signed in user is the same with url.
      // If not redirect to a view only section of the profile.
      // If not authenticated, ask host to login
      if (!host) router.replace('/host/auth/login')
      else if (host?.urlid !== urlid) router.replace(`/profile/${urlid}`)

      return host
    }

    validateURL(params.hid, user?.uid)
  }, [user, params.hid])

  return (
    <div className='px-10'>
      <Header size='xl'>Profile</Header>
      <div className='grid grid-cols-3 place-items-stretch gap-10 p-10'>
        <div className='p-5 flex flex-col gap-5'>
          <Button primary reg>
            Edit Profile
          </Button>
          <Image
            src='/imgs/female-avatar.jpg'
            width={200}
            height={200}
            alt='avatar'
          />
          <span className='text-lg font-semibold text-black/75'>
            Name: Emeka D Stalleon
          </span>
          <span className='text-lg font-semibold text-black/75'>
            Email: {user?.email}
          </span>
          <span className='text-lg font-semibold text-black/75'>
            Location: Enugu, Nigeria
          </span>
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
