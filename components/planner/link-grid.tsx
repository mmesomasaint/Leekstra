'use client'

import { useAuthContext } from '@/app/planner/auth/auth-context'
import Header from '../header'
import LinkText from '../link-text'

export default function LinkGrid() {
  const { planner } = useAuthContext()

  return (
    <div className='w-full flex justify-between items-center gap-10 py-5'>
      <div className='flex gap-10'>
        <Header size='xxl'>Leekstra</Header>
        <div className='flex justify-evenly items-center gap-5'>
          <LinkText href={`/planner/${planner?.uid}/`}>Profile</LinkText>
          <LinkText href={`/planner/${planner?.uid}/find-job`}>Find Job</LinkText>
          <LinkText href={`/planner/${planner?.uid}/proposals`}>
            Proposals
          </LinkText>
          <LinkText href={`/planner/${planner?.uid}/messages`}>
            Messages
          </LinkText>
          <LinkText href={`/planner/${planner?.uid}/invites`}>Invites</LinkText>
        </div>
      </div>
      <div className='flex justify-start items-center gap-5'></div>
    </div>
  )
}
