'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import { useAuthContext } from '../../auth/auth-context'
import { DocumentData } from 'firebase/firestore'
import getByHost from '@/lib/job/proposal/getByHost'
import getById from '@/lib/job/proposal/getById'
import CenterText from '@/components/center-text'
import Accept from '@/components/host/accept'

export default function Proposals() {
  const { host } = useAuthContext()
  const [proposals, setProposals] = useState<DocumentData[]>([])
  const [selectedProposal, setSelectedProposal] = useState<DocumentData>({})
  const [selectedProposalId, setSelectedProposalId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchproposals = async () => {
      if (host) {
        setProposals([])

        const { proposalDocs } = await getByHost(host.uid)
        setProposals(proposalDocs?.map((doc) => doc.data()) ?? [])
      }
    }

    fetchproposals()
  }, [])

  useEffect(() => {
    const getSelectedProposal = () => {
      setLoading(true)

      getById(selectedProposalId).then(({ proposal }) => {
        if (proposal) setSelectedProposal(proposal)
        setLoading(false)
      })
    }

    getSelectedProposal()
  }, [selectedProposalId])

  return (
    <div className='px-10'>
      <Header size='xl'>Proposals</Header>
      <div className='grid grid-cols-3 gap-10'>
        <div className='flex flex-col justify-start items-start gap-7 px-10'>
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              className='border-y border-y-black/75 shadow-md py-5 flex justify-around items-center'
              onClick={() => setSelectedProposalId(proposal.id)}
            >
              {proposal.plannerId} &rarr; {proposal.jobId}
            </div>
          ))}
        </div>
        <div className='col-span-2 px-10'>
          {loading ? (
            <CenterText>Loading...</CenterText>
          ) : (
            <div className='flex flex-col justify-start items-stretch gap-4'>
              <span>For: {selectedProposal.jobId}</span>
              <span>From: {selectedProposal.plannerId}</span>
              <Accept from={host?.uid ?? ''} to={selectedProposal.plannerId} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
