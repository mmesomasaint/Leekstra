import { useState } from 'react'
import invite from '@/lib/job/invite'
import Image from 'next/image'
import { DocumentData } from 'firebase/firestore'
import { Job } from '@/lib/job/types'
import Button from '../button'

export default function Card({
  planner,
  hid,
  data,
}: {
  planner: DocumentData
  hid: string
  data: Job
}) {
  const [btnText, setBtnText] = useState('Send invite')
  const [loading, setLoading] = useState(false)
  const handleInvite = () => {
    setLoading(true)
    setBtnText('Sending...')

    console.log(`{ plannerId: ${planner.uid}, hostId: ${hid}, data: ${data} }`)

    invite(hid, planner.uid, data).then(() => {
      setLoading(false)
      setBtnText('Sent')
    })
  }
  return (
    <div className='flex justify-start items-center gap-10 shadow-md rounded-2xl bg-gray-400/10 p-10'>
      <Image
        src={planner.photoURL ?? `/imgs/male-avatar.jpg`}
        width={150}
        height={150}
        alt='avatar'
        className='shadow-md'
      />
      <div className='flex flex-col justify-start items-center gap-5'>
        <div className='flex justify-between items-center gap-10 w-full'>
          <div className='flex flex-col items-start gap-3'>
            <span>Name: {planner.displayName ?? 'John Doe'}</span>
            <span>Email: {planner.email ?? 'example@email.com'}</span>
            <span>Location: Nigeria</span>
          </div>
          <Button
            onClick={() => handleInvite()}
            reg
            disabled={loading || btnText === 'Sent'}
          >
            {btnText}
          </Button>
        </div>
        <p>
          I am a passionate and experienced event planner with over 5 years in
          the industry. I have a proven track record of planning and executing
          successful events of all sizes and types, from corporate conferences
          and trade shows to weddings and social gatherings.
        </p>
      </div>
    </div>
  )
}
