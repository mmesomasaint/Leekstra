'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import getHost from '@/lib/auth/host/getHost'
import Button from '@/components/button'
import Header from '@/components/header'
import { useAuthContext } from '../auth/auth-context'

export default function Profile({ params }: { params: { hid: string } }) {
  const { host } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    const validateURL = async (hid: string, uid?: string) => {
      // Get the currenct user
      const authHost = await getHost(uid)

      // Check if the current signed in user is the same with url.
      // If not redirect to a view only section of the profile.
      // If not authenticated, ask host to login
      if (!authHost) router.replace('/host/auth/login')
      else if (authHost?.uid !== hid) router.replace(`/profile/${hid}`)
    }

    validateURL(params.hid, host?.uid)
  }, [host, params.hid])

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
          <div className='flex flex-col gap-5'><span className='text-lg font-semibold text-black/75'>
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
