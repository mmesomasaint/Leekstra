'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import { useAuthContext } from '../../auth/auth-context'
import { DocumentData } from 'firebase/firestore'
import getByPlanner from '@/lib/job/invite/getByPlanner'
import getById from '@/lib/job/invite/getById'

export default function Invites() {
  const { planner } = useAuthContext()
  const [invites, setInvites] = useState<DocumentData[]>([])
  const [selectedInvite, setSelectedInvite] = useState<DocumentData>({})
  const [selectedInviteId, setSelectedInviteId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchInvites = async () => {
      if (planner) {
        setInvites([])

        const { inviteDocs } = await getByPlanner(planner.uid)
        setInvites(inviteDocs?.map((doc) => doc.data()) ?? [])
      }
    }

    fetchInvites()
  }, [])

  useEffect(() => {
    const getSelectedInvite = () => {
      setLoading(true)

      getById(selectedInviteId).then(({ invite }) => {
        if (invite) setSelectedInvite(invite)
        setLoading(false)
      })
    }

    getSelectedInvite()
  }, [selectedInviteId])

  return (
    <div className='px-10'>
      <Header size='xl'>Invites</Header>
      <div className='grid grid-cols-3 gap-10'>
        <div className='flex flex-col justify-start items-start gap-7 px-10'>
          {invites.map((invite) => (
            <div
              key={invite.id}
              className='border-y border-y-black/75 shadow-md py-5 flex justify-around items-center'
              onClick={() => setSelectedInviteId(invite.id)}
            >
              {invite.hostId} &rarr; {invite.jobId}
            </div>
          ))}
        </div>
        <div className='col-span-2 px-10'>
          {loading ? (
            <div className='flex justify-center items-center'>Loading...</div>
          ) : (
            <div className='flex flex-col justify-start items-stretch gap-4'>
              <span>Job: {selectedInvite.jobId}</span>
              <span>From: {selectedInvite.hostId}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
