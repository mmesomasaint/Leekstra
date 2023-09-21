'use client'

import { useAuthContext } from '@/app/host/auth/auth-context'
import Header from '../header'
import LinkText from '../link-text'

export default function LinkGrid() {
  const { host } = useAuthContext()

  return (
    <div className='w-full flex justify-between items-center gap-10 py-5'>
      <div className='flex gap-10'>
        <Header size='xxl'>Leekstra</Header>
        <div className='flex justify-evenly items-center gap-5'>
          <LinkText href={`/host/${host?.uid}/`}>Profile</LinkText>
          <LinkText href={`/host/${host?.uid}/find-match`}>Find Match</LinkText>
          <LinkText href={`/host/${host?.uid}/contacts`}>Contacts</LinkText>
          <LinkText href={`/host/${host?.uid}/my-jobs`}>My Jobs</LinkText>
        </div>
      </div>
      <div className='flex justify-start items-center gap-5'></div>
    </div>
  )
}
