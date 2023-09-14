'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '../auth/auth-context'
import Header from '@/components/header'
import Image from 'next/image'
import getPlanner from '@/lib/auth/planner/getPlanner'

export default function Profile({ params }: { params: { pid: string } }) {
  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    const validateURL = async (urlid: string, uid?: string) => {
      // Get the currenct user
      const planner = await getPlanner(uid)

      // Check if the current signed in user is the same with url.
      // If not redirect to a view only section of the profile.
      // If not authenticated, ask planner to login
      if (!planner) router.replace('/planner/auth/login')
      else if (planner?.urlid !== urlid) router.replace(`/profile/${urlid}`)
    }

    validateURL(params.pid, user?.uid)
  }, [user, params.pid])

  return (
    <div className='px-10'>
      <Header size='xl'>Profile</Header>
      <div className='grid grid-cols-3 place-items-stretch gap-10 p-10'>
        <div className='p-5 flex flex-col gap-5'>
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
        <div className='p-5'>
          <span className='text-lg font-semibold text-black/75'>
            Ratings: 5 stars
          </span>
        </div>
      </div>
    </div>
  )
}
