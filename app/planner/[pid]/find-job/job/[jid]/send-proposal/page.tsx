'use client'

import Button from '@/components/button'
import { useState, FormEvent } from 'react'

export default function SendProposal() {
  const [proposal, setProposal] = useState<string>('')

  const sendProposal = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Create the proposal in db and send to host's job.
  }

  return (
    <form
      onSubmit={sendProposal}
      className='flex flex-col gap-7 justify-start items-start'
    >
      <label htmlFor='proposal'>
        <p>Proposal:</p>
        <textarea
          required
          onChange={(e) => setProposal(e.target.value)}
          name='proposal'
          id='proposal'
          value={proposal}
          rows={30}
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
