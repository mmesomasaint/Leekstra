'use client'

import Button from '@/components/button'
import { useState, FormEvent } from 'react'
import { useRouter, useParams } from 'next/navigation'
import send from '@/lib/job/proposal/send'
import { useAuthContext } from '@/app/planner/auth/auth-context'

export default function SendProposal() {
  const { planner } = useAuthContext()
  const [proposal, setProposal] = useState<string>('')
  const { jid } = useParams()
  const router = useRouter()

  const sendProposal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Create the proposal in db and send to host's job.
    await send(`${jid}`, `${planner?.uid}`, proposal)
    router.replace(`/planner/${planner?.uid}/find-job`)
  }

  return (
    <form
      onSubmit={sendProposal}
      className='flex flex-col gap-7 justify-start items-start w-full px-10'
    >
      <label htmlFor='proposal' className='w-full flex flex-col gap-3'>
        <p>Proposal:</p>
        <textarea
          required
          onChange={(e) => setProposal(e.target.value)}
          name='proposal'
          id='proposal'
          value={proposal}
          rows={20}
          placeholder='Write your proposal...'
          className='w-full border border-zinc-600/50 rounded-xl p-3 focus:outline-blue-500/50'
        />
      </label>
      <Button type='submit' primary reg>
        Send
      </Button>
    </form>
  )
}
